'use strict';

const printSelfIps = require('./localIp');
const express = require('./expressServer');
const peer = require('./peerServer');
const io = require('./ioServer');

const initServers = () => {
	peer.init(express.getServer());
	express.init(peer.getServer());
	io.init(express.getServer());
};

const listen = (port) => { console.log('port', port)
	express.start(port, printSelfIps);
}

const start = (port) => {
	initServers();
	listen(port);
};

module.exports = {
	start,
};
