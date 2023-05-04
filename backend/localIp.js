'use strict';

const getSelfIps = () => {
	const { networkInterfaces } = require('os');

	const nets = networkInterfaces();
	const results = {}; 

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
			if (net.family === 'IPv4' && net.internal === false) {
				if (results[name] !== '') {
					results[name] = [];
				}
				results[name].push(net.address);
			}
		}
	}
	
	return results;
}

const printSelfIps = () => {
	const IPs = Object.entries(getSelfIps());
	for (const [adapter, ip] of IPs) {
		console.log( `${adapter} : ${ip}` );
	}
}

module.exports = printSelfIps;