'use strict';

let peer = null;
let myCall = null;

const initPeerConnection = () => {
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
	
	const config = {'iceServers': [
		{ url: 'stun:stun.l.google.com:19302' },
		{ url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
	]};
	
	peer = new Peer(config, {
	// peer = new Peer({
	  path: '/peerjs',
	  host: '/',
	  port: '3030',
	});
	
	// 
    peer.on('call', (call) => {
		console.log('peer.on call');
		
		myCall = call;
		
		call.on('error', (err) => {
			console.log(err);
		});
		
		call.on('close', () => {
			console.log('call.on close');
		});
		
		call.on('stream', (userVideoStream) => {
			console.log('call.on stream ');
		
			//addVideoStream(video, userVideoStream);
			video.setStream(userVideoStream);
		});
		
		call.answer();
    },
	(err) => {
		console.log('call erro');
		console.log(err);
	});

	// joning room ( when connected to peer server )
	peer.on('open', emitUserJoin);
}
const closePeerCall = () => {
	if (myCall !== null) {
		myCall.close();
	}
};