'use strict';

const socket = io('/', { 'transports' : ['polling'] });

const initSocketListeners = () => {
	socket.on('stream_stop', () => {
		// onStreamStop();
		// screensManager.toggle(userState.getStateElem('stop'));
		streamState.set('stop');
	});
	
	socket.on('stream_start', ()=>{ 
		// onStreamStart();
		// screensManager.toggle(userState.getStateElem('stream'));
		streamState.set('stream');
	});
	 
	socket.on('stream_pause', ()=>{ 
		// onStreamPause();
		// screensManager.toggle(userState.getStateElem('pause'));
		streamState.set('pause');
	});
	
	socket.on('stream_unpause', ()=>{ 
		// onStreamUnpause();
		// screensManager.toggle(userState.getStateElem('stream'));
		streamState.set('unpause');
	});
	
	socket.on('redirect_to_duplicate_page', ()=>{ 
		location.href = '/duplicates';
	});
}
const emitUserJoin = (id) => {
	socket.emit('join_user', id);
};