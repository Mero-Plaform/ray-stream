'use strict';

const socket = io('/', { 'transports': ['polling'] });

//
socket.on('user-connected', (userId) => {
	connectUser(userId, myVideoStream);
});

socket.on('user-disconnected', (userId) => {
	disconnectUser(userId);
});

socket.on('set_users_count', (usersCount) => {
	usersCountSpan.textContent = usersCount;
});

socket.on('redirect_to_duplicate_page', () => { 
	location.href = '/duplicates';
});

// сообщаем о своем подключении
socket.emit('join_host');