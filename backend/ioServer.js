'use strict';

let ioServer = null;
let users_ips = [];
let usersIds = [];
let hostSocket = null;
let streamingStatus = 'stop';

const init = (server) => {
	ioServer = require('socket.io')(server);
	ioServer.on('connection', connectionHandler);
};

const addUserIp = (userIp) => {
	users_ips.push(userIp);
};

const removeUserIp = (userIp) => {
	users_ips = users_ips.filter((ip) => (ip !== userIp));
};

const checkUserIp = (userIp) => users_ips.includes(userIp);

const setHostListeners = (hostSocket) => {
	hostSocket.on( 'stream_start', ()=>{
		streamingStatus = 'start';
		hostSocket.broadcast.emit('stream_start');
	});

	hostSocket.on( 'stream_stop', ()=>{
		streamingStatus = 'stop';
		hostSocket.broadcast.emit('stream_stop');
	});

	hostSocket.on( 'stream_pause', ()=>{
		streamingStatus = 'pause';
		hostSocket.broadcast.emit('stream_pause');
	});
  
	hostSocket.on( 'stream_unpause', ()=>{
		streamingStatus = 'start';
		hostSocket.broadcast.emit('stream_unpause');
	});
}

const processingNewConnection = (socket) => {
	// const userAlreadyOnStream = checkUserIp(socket.handshake.address);
	const userAlreadyOnStream = false;
	if (userAlreadyOnStream) {
		socket.emit( 'redirect_to_duplicate_page' );
		return true;
	} 
	addUserIp(socket.handshake.address);
	return false;
};

const connectionHandler = (socket) => {
	const duplicateConnection = processingNewConnection(socket);
	if(duplicateConnection){ return; }
	
	socket.on('disconnect', ()=>{
		if (socket === hostSocket) {
			streamingStatus = 'stop';
			hostSocket = null;
			ioServer.emit('stream_stop');
		} else {
			usersIds = usersIds.filter((id) => (id !== socket.id));
			
			if (hostSocket !== null) {
				hostSocket.emit('set_users_count', usersIds.length);
			}
		}
		
		removeUserIp(socket.handshake.address);
	});
	
	socket.on('join_user',  (userId) => {
		socket.id = userId;
		usersIds.push( userId );
		
		if (hostSocket !== null) {
			hostSocket.emit('set_users_count', usersIds.length);
		
			if (streamingStatus !== 'stop') {
				hostSocket.emit('user-connected', userId);
				socket.emit(`stream_${ streamingStatus }`);
			}
		}
	}); 
	
	socket.on('join_host', () => {
		hostSocket = socket;
		hostSocket.emit('set_users_count', usersIds.length);
		setHostListeners(hostSocket);
	}); 
	
	socket.on( 'host_ask_viewers', () => {
		usersIds.forEach( userId => {
			socket.emit('user-connected', userId);
		});
	}); 
};

module.exports = {
	init: init,
};
