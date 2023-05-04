'use strict';

const pageStreamingIcon = '../imgs/playIcon2.png';
const pageNostreamIcon = '../imgs/framesIcon.png';
const pagePauseIcon = '../imgs/playIcon.png';

// const onKeyboardEntry = (e) => {
	// if (e.key === 'Enter') {
		// onEntry();
	// }
// }

// const onEntry = () => {
	// entry_screen.removeEventListener('click', onEntry);
	// document.removeEventListener('keydown', onKeyboardEntry);
	
	// hide_entryScreen();
	// initPeerConnection();
// }


// const hide_entryScreen = () => {
	// entry_screen.style.display = 'none';
// }

// const onStreamStart = () => {
	// pageIconElem.href = pageStreamingIcon;
	// if( myCall !== null ){
		// myCall.close();
	// }
// }
// const onStreamStop = () => {
	// pageIconElem.href = pageNostreamIcon;
	// streamingVideoElem.srcObject = null;
	// myCall.close();
// }	

const video = {
	wrapper: videoWrapper,
	elem: streamingVideoElem,
	
	setStream : function( stream ){
		this.elem.srcObject = stream;
		this.elem.addEventListener('loadedmetadata', () => {
			this.elem.play();
		});
	},
};

// entry_screen.addEventListener('click', onEntry);
// document.addEventListener('keydown', onKeyboardEntry);



//----------

// const userState = {
	// state: null,
	// states: new Map([
		// ['stream', stream_screen],
		// ['stop', stop_screen],
		// ['pause', pause_screen],
	// ]),
	// getStateElem(state){
		// return this.states.get(state);
	// },
// };

// stream_controlsOpenBtn.addEventListener('click', ()=>{
	// toggleStreamControls();
// });

// document.addEventListener('keydown', (e) => { // console.log( e.key );
	// if (screensManager.opened_screen === stream_screen) {
		// switch(e.key) {
			// case 'Tab': 
				// e.preventDefault();
				// toggleStreamControls();
				// break;
			// case '+': 
				// on_incViewBtn();
				// break;
			// case '-': 
				// on_decViewBtn();
				// break;
			// case 'Escape': 
				// on_resViewBtn();
				// break;
		// }
	// }
// });

// const toggleStreamControls = () => {
	// stream_controlsOpenBtn.classList.toggle('rotate');
	// stream_controlsLine.classList.toggle('open');
// }

//-------screens manager

// const screensManager = {
	// opened_screen: null,
	// open(screen){
		// this.opened_screen = screen;
		// screen.classList.add('show');
	// },
	// close(){
		// this.opened_screen.classList.remove('show');
		// this.opened_screen = null;
	// },
	// toggle(screen) {
		// if (this.opened_screen !== null) {
			// this.close(this.opened_screen);
		// }
		// this.open(screen);
	// },
// }

// screensManager.open(userState.getStateElem('stop'));

/* ---- new ---- */

const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//---- rnd plate img
const splashScreenImageElem = document.getElementsByClassName('splashScreenImage')[0];
const imgsCount = 16;
const catImgsPath = './imgs/waitingGifs/'; 
const catImgsType = 'gif';
let imgNamesArr = null;
let prevImgName = null;

const initBgNamesArray = () => {
	imgNamesArr = [...Object.keys(new Array(imgsCount).fill())];
};
const getRndCatImgPath = () => {
	const freeCatImgNames = imgNamesArr.filter((imgName) => (imgName !== prevImgName));
	const rndImgIndex = random(0, freeCatImgNames.length - 1);
	const rndImgName = freeCatImgNames[rndImgIndex];
	
	prevImgName = String(rndImgName);
	return catImgsPath + `${rndImgName}.${catImgsType}`;
};
const updateSplashScreenImage = () => {
	const rndCatBg = getRndCatImgPath();  
	splashScreenImageElem.style.backgroundImage = `url(${rndCatBg})`;
};



/*--------------*/


//---- rnd bg img
const bgsCount = 2;
const catBgsPath = './imgs/bg/'; 
const catBgType = 'jpg';
let bgNamesArr = null;
let prevBgName = null;

const initImgNamesArray = () => {
	bgNamesArr = [...Object.keys(new Array(bgsCount).fill())];
};
const getRndCatBgPath = () => { 
	const freeCatImgNames = bgNamesArr.filter((imgName) => (imgName !== prevBgName));
	const rndImgIndex = random(0, freeCatImgNames.length - 1);
	const rndImgName = freeCatImgNames[rndImgIndex];
	
	prevBgName = String(rndImgName);
	return catBgsPath + `${rndImgName}.${catBgType}`;
};
const updateBgImage = () => {
	const rndCatBg = getRndCatBgPath(); 
	document.body.style.backgroundImage = `url(${rndCatBg})`;
};
const setBg = () => {
  document.body.style.backgroundImage = 'url(./imgs/bg/2.jpg)';
};



/*--------------*/

class StreamState extends Observer {
	constructor() {
		super();
		this.state = null;
	}
	set(newState) {
		this.state = newState;
		this.broadcast(this.state);
	}
}

const onStreamStateUpdate = (newState) => {
	switch (newState) {
		case 'stream': {
			onStream();
			break;
		}
		case 'pause': {
			onPause();
			break;
		}
		case 'unpause': {
			onUnpause();
			break;
		}
		case 'stop': {
			onStop();
			break;
		}
	}
};	

const openNoStreamScreen = (text = '') => {
	splashScreenTextElem.textContent = text;
	noStreamScreenElem.classList.add('show');
};
const closeNoStreamScreen = () => {
	noStreamScreenElem.classList.remove('show');
};
const openStreamScreen = () => {
	streamScreenElem.classList.add('show');
};
const closeStreamScreen = () => {
	streamScreenElem.classList.remove('show');
};

const setVideo = (source) => {
	streamingVideoElem.srcObject = source;
};
const resetVideo = () => {
	streamingVideoElem.srcObject = null;
};
const playVideo = () => {
	streamingVideoElem.play();
};
const pauseVideo = () => {
	streamingVideoElem.pause();
};

const setNostreamPageIcon = () => {
	pageIconElem.href = pageNostreamIcon;
}
const setPausePageIcon = () => {
	pageIconElem.href = pagePauseIcon; 
}
const setStreamPageIcon = () => {
	pageIconElem.href = pageStreamingIcon;
}


// разбей действия на подфункции 
const onStop = () => {
	setNostreamPageIcon();
	resetVideo();
	closePeerCall();
	closeStreamScreen();
	openNoStreamScreen('no stream');
};
const onPause = () => {
	setPausePageIcon();
	closeStreamScreen();
	pauseVideo();
	// closePeerCall();
	
	openNoStreamScreen('stream pause');
};
const onUnpause = () => {
	setStreamPageIcon();
	playVideo();
	closeNoStreamScreen();
	openStreamScreen();
};
const onStream = () => {
	setStreamPageIcon();
	closePeerCall();
	closeNoStreamScreen();
	openStreamScreen();
	// playVideo
};
const showScreen = (screenElem) => {
	screenElem.classList.remove('show');
};
const onEntry = () => {
	initImgNamesArray();
	initBgNamesArray();
	// updateBgImage();
  setBg();
	updateSplashScreenImage();
	initSocketListeners();
	initPeerConnection();
	onStreamStateUpdate('stop');
	showScreen(entryScreenElem);
};

const splashScreenImageWrapElem = document.getElementsByClassName('splashScreenImageWrap')[0];
const entryScreenElem = document.getElementsByClassName('entryScreen')[0];
const noStreamScreenElem = document.getElementsByClassName('noStreamScreen')[0];
const streamScreenElem = document.getElementsByClassName('streamScreen')[0];
const splashScreenTextElem = document.getElementsByClassName('splashScreenText')[0];
const entryBtnElem = document.getElementsByClassName('entryBtn')[0];
const streamState = new StreamState();

streamState.subscribe(onStreamStateUpdate);

entryScreenElem.addEventListener('click', onEntry, { once: true });
document.addEventListener('beforeunload', closePeerCall);
splashScreenImageWrapElem.addEventListener('click', updateSplashScreenImage);
// document.body.addEventListener('click', updateBgImage);