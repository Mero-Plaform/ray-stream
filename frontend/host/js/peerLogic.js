'use strict';

const calls = new Map();
let connectedToPeerServer = false;
let peer = null;

// peer server connection
/*
peer = new Peer({
  path: "/peerjs",
  host: "/",
  port: "3030",
});
*/
/*
peer = new Peer({
  config: {'iceServers': [
	{ url: 'stun:stun.l.google.com:19302' },
	{ url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  ]} 
});
*/
	
const config = { 'iceServers': [
	{ url: 'stun:stun.l.google.com:19302' },
	{ url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
]};

peer = new Peer(config, {
	// peer = new Peer({
	path: '/peerjs',
	host: '/',
	port: '030',
});

peer.on('open', () => {
	console.log('connectedToPeerServer');
	connectedToPeerServer = true; 
	peerServerStatusIcon.style.color = '#00c78f';
});

peer.on('close', () => {
	console.log('disconnected_to_peerServer');
	connectedToPeerServer = false;
	peerServerStatusIcon.style.color = 'orange';
});

// make call, send out id and stream
// on recieving his stream - displaying video
const connectUser = (userId, stream) => {
	console.log('connectUser');
	let call = peer.call(userId, stream);
  
	call.on('error', (err) => {
		console.log(err);
	});
		
	call.on('close', () => {
		console.log('call.on close');
	});
  
	calls.set(userId, call);
};
const disconnectUser = (userId) => {
	calls.get(userId).close();
	calls.delete(userId);
}
const closeAllCalls = () => {
	calls.forEach((call) => {
		call.close() ;
	});
	calls.clear();
}