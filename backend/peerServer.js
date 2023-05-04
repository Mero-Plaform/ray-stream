'use strict';

const { ExpressPeerServer } = require('peer');
let peerServer = null;
 
const initServer = (expressServer) => {
	peerServer = ExpressPeerServer(expressServer, {
		debug: true,
	});
  
	peerServer.on('disconnect', (client) => {
		if (streamingStatus !== 'stop') {
			hostSocket.emit('user-disconnected', client.id);
		}
	});
}

const getServer = () => peerServer;

module.exports = {
	getServer,
	init: initServer,
};
