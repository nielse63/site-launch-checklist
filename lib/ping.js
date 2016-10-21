
const curl = require('curlrequest');
// const _ = require('lodash');
// const fs = require('fs');
const utils = require( './utils' );
const LZUTF8 = require('lzutf8');
const pako = require('pako');
const zlib = require('zlib');

class Ping {

	setConfig(options) {
		this.config = options;
	}

	postWithData(url, data) {
		var string = JSON.stringify(data);
		// console.log(string);
		// var compressed = LZUTF8.compress(string);
		// var output = pako.deflate(string);
		// console.log(compressed);
		// console.log(output);
		// var binaryString = pako.deflate(string, { to: 'string' });
		// console.log(binaryString);
		// zlib.deflate(binaryString, (err, buffer) => {
		// 	if (!err) {
		// 		var bString = buffer.toString('base64');
		// 		// console.log('Buffer length: ' + bString.length);
		// 		console.log(bString);

		// 		curl.request({
		// 			url : url,
		// 			method : 'POST',
		// 			data : {
		// 				data : bString
		// 			},
		// 		}, function(err, stdout, stderr) {
		// 			if( err ) {
		// 				utils.fail(err);
		// 			}
		// 			// if( stderr ) {
		// 			// 	console.log(stderr);
		// 			// }
		// 			// utils.success(stdout);
		// 		});

		// 		return;
		// 	}
		// 	console.log(err);
		// });
		curl.request({
			url : url,
			method : 'POST',
			data : {
				data : string
			},
		}, function(err, stdout, stderr) {
			if( err ) {
				utils.fail(err);
			}
			// if( stderr ) {
			// 	console.log(stderr);
			// }
			// utils.success(stdout);
		});
	}

	post(url, data) {
		if( data ) {
			return this.postWithData(url, data);
		}

		curl.request({
			url : url,
			method : 'POST',
		}, function(err, stdout, stderr) {
			if( err ) {
				utils.fail(err);
			}
			// if( stderr ) {
			// 	console.log(stderr);
			// }
			// utils.success(stdout);
		});
	}

	notify(what, data = null) {
		// utils.success('Notifying server that we started');
		const url = 'http://localhost:8080/ping/' + what + '/' + encodeURIComponent(this.config.url);
		this.post(url, data);
	}

	submit(data) {
		// utils.success('Submitting data to server');
		// const data = require('../test/results/data.json');
		const url = 'http://localhost:8080/submit/' + encodeURIComponent(this.config.url) + '/' + Date.now();
		// console.log(JSONC);
		// console.log(JSONC.pack);
		// var lzwString = JSONC.pack(data);
		// console.log(lzwString);
		// console.log(lzwString);
		this.post(url, data);
	}
}

module.exports = new Ping();
