'use strict';

const on_wheel = (e) => {
	if (e.deltaY > 0) {
		onDecViewBtn();
	} else if (e.deltaY < 0) {
		onIncViewBtn();
	}
}

video.elem.addEventListener('wheel', on_wheel);

let curViewX = 0;
let curViewY = 0;



const onVewBoxMouseDown = (e) => {
	const onViewBoxMove = (e) => {
		getMousePos(e);
		setViewPos();
	}
	const getMousePos = (e) => {
		curViewX = e.x - startX;
		curViewY = e.y - startY;
	}
	const onViewBoxMouseUp = () => {
		document.removeEventListener('mousemove', onViewBoxMove);
		reset_mouseDrag();
	}
	const setMouseDrag = () => {
		video.wrapper.classList.add('moving');
	}
	const reset_mouseDrag = () => {
		video.wrapper.classList.remove('moving');
	}
	
	const { startX, startY } = getViewPos(e);
	
	setMouseDrag();
	
	document.addEventListener('mousemove', onViewBoxMove);
	document.addEventListener('mouseup', onViewBoxMouseUp, { once: true });
}
const getViewPos = (e) => {
	return {
		startX: e.x - curViewX,
		startY: e.y - curViewY,
	}
}
const resetViewPos = () => {
	curViewX = curViewY = 0;
}
const setViewPos = () => {
	video.wrapper.style.transform = `translate(${curViewX}px,${curViewY}px)`;
}

video.wrapper.addEventListener('mousedown', onVewBoxMouseDown);

//--------

let curViewScale = 1;
const viewScaleStep = 0.15;

const onIncViewBtn = () => { 
	increaseViewScale();
	setViewScale();
}
const onDecViewBtn = () => {
	decreaseViewScale();
	setViewScale();
}
const resetViewScale = () => {
	curViewScale = 1;
}
const increaseViewScale = (scaleStep = viewScaleStep) => {
	curViewScale += scaleStep;
}
const decreaseViewScale = () => {
	curViewScale -= viewScaleStep;
}
const setViewScale = () => {
	video.elem.style.transform = `scale(${curViewScale})`;
}
const onResViewBtn = () => {
	resetViewScale();
	resetViewPos();
	setViewScale();
	setViewPos();
}

incViewBtn.addEventListener('click', onIncViewBtn);
decViewBtn.addEventListener('click', onDecViewBtn);
resViewBtn.addEventListener('click', onResViewBtn);