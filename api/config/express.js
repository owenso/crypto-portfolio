const express = require('express');
const morgan = require('morgan');
const socketio = require('socket.io');
const http = require('http');
const compress = require('compression');

module.exports = function() {
	const app = express();
	const server = http.createServer(app);
	const io = socketio.listen(server);

	if (process.env.NODE_ENV === 'local') {
		//for local server
		console.log('Running in local mode.');
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		//for production server
		console.log('Running in production mode!');
		app.use(compress());
	} else {
		console.error('Environement Error');
	}


	//Routes
	// require('../app/routes/index.server.routes.js')(app);

/**************************************/
/* SOCKETS */
/**************************************/


	io.on('connection', function(socket) {
		console.log('a user connected to the api server');
	});


	return server;
};