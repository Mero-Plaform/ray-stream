'use strict';

const fs = require('fs');
const path = require('path');
const rootDirectoryPath = path.dirname(require.main.filename);
const express = require('express');
const app = express();
const expressServer = require('http').Server(app);
const publicDirectory = 'frontend';

const initRouter = (peerServer) => {
	app.use(express.static(publicDirectory));
	
	app.use('/peerjs', peerServer);

	app.get('/', (req, res) => {
		res.redirect('/user');
	});

	app.get('/:dir', (req, res, next) => { 
		const { dir } = req.params;
		res.sendFile(path.join(rootDirectoryPath,publicDirectory,dir,`/${dir}.html`), (err) => {
			if (err) {
				next(); 
			}
		});		
	});

	// app.get('/check_host', (req, res) => { console.log(host_socket)
		// const answer = host_socket === null ? 'granted' : 'denied';
		// res.end(answer);
	// });
	
	app.use((req, res) => { 
		res.redirect('/404'); 
		
	});
};

const startServer = (port, callback = () => {}) => {
	expressServer.listen(port, ()=>{
		callback();
		console.log(`rdy at : ${port}`);
	});
};

const getServer = () => expressServer;

module.exports = {
	init: initRouter,
	start: startServer,
	getServer,
};