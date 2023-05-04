'use strict';

const startStreamIcon = '../imgs/playIcon2.png';
const stopStreamIcon = '../imgs/framesIcon.png';
const pauseStreamIcon = '../imgs/playIcon.png';
let myVideoStream = null;
let myVideoStreamVideoTrack = null; 
let streamingStatus = 'stop';
let streamFrameRate = 15;
let streamHeight = 720;
let streamWidth = 1280;

// play/stop video
const stopStreamHandler = ()=> {
	if (streamingStatus === 'stop') { return; }
	
	pageIconElem.href = stopStreamIcon;
	
	myVideoStreamVideoTrack.stop();
	myVideoStream = null;
	myVideoStreamVideoTrack = null;
	videoPreviewElem.srcObject = null;
	
	resetStreamData();
	
	socket.emit('stream_stop');
	
	closeAllCalls();
	
	if (streamingStatus === 'pause') {
		pauseBtn.textContent = 'Pause Video';
	}
	
	streamingStatus = 'stop'; 
};

const getStreamHandler = () => {
	if (streamingStatus !== 'stop') {
		closeAllCalls();
	}

	navigator.mediaDevices
		.getDisplayMedia({
			video: {
				frameRate: {
					max: streamFrameRate,
				},
				height: { ideal: streamHeight },
				width: { ideal: streamWidth },
			},
			audio: false,
		 })
		.then((stream) => {
			pageIconElem.href = startStreamIcon;
			streamingStatus = 'start';
			myVideoStream = stream;
			myVideoStreamVideoTrack  = stream.getVideoTracks()[0];
			// setVideStream(myVideoStream);
				
			printStreamData(streamFrameRate, streamHeight, streamWidth);
				
			socket.emit('stream_start');
					
			if (connectedToPeerServer === true) {
				socket.emit('host_ask_viewers');
			} else {
				console.error('host is not connected to peerServer');
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

const setVideStream = (stream) => {
	videoPreviewElem.srcObject = stream;
	videoPreviewElem.addEventListener('loadedmetadata', () => {
		videoPreviewElem.play();
	});
};

stopStream.addEventListener('click', stopStreamHandler);
getStream.addEventListener('click', getStreamHandler);

//-------ui

// pause/unpause video
const onPause = () => {
	if (streamingStatus === 'stop') {
		return;
	} else if (streamingStatus === 'pause') {
		unpause();
	} else {
		pause();
	}
};
const pause = () => {
	pageIconElem.href = pauseStreamIcon;
	socket.emit('stream_pause');
	streamingStatus = 'pause';
	pauseBtn.textContent = 'Resume Video';
	myVideoStreamVideoTrack.enabled = false;
};
const unpause = () => {
	pageIconElem.href = startStreamIcon;
	socket.emit('stream_unpause');
	streamingStatus = 'start';
	pauseBtn.textContent = 'Pause Video';
	myVideoStreamVideoTrack.enabled = true;
};

pauseBtn.addEventListener('click', onPause);

const togglePreview = () => {
	videoPreviewElem.classList.toggle('show');
	togglePreviewBtn.classList.toggle('lightBtn');
}

togglePreviewBtn.addEventListener('click', togglePreview);

document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
});

const printStreamData = (frameRate, height, width) => {
	stream_frameRateElem.textContent = frameRate;
	stream_heightElem.textContent = height;
	stream_widthElem.textContent = width;
}
const resetStreamData = () => {
	stream_frameRateElem.textContent = 'null';
	stream_heightElem.textContent = 'null';
	stream_widthElem.textContent = 'null';
}

//----test

const switchTest = () => {
	textSection.classList.toggle('d_n');
}

testBtn.addEventListener('click', switchTest);

//----framerate + quality

const updateStreamQuality = (e) => {
	if (streamingStatus === 'stop') {
		return;
	}
	
	const rate = Number(e.target.textContent);
	
	myVideoStreamVideoTrack.applyConstraints({
		frameRate: {
			max: rate,
		},
	});
}

stream_frameRateElem.addEventListener('input', updateStreamQuality);