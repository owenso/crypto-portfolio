const express = require('express');
const morgan = require('morgan');
const socketio = require('socket.io');
const http = require('http');
const passport = require('passport');
const compress = require('compression');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
global.io = socketio.listen(server);

module.exports = function() {

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


	app.use(passport.initialize());
	app.use(passport.session());


	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())




	//Routes
	require('../routes/index')(app);

/**************************************/
/* SOCKETS */
/**************************************/


	io.on('connection', function(socket) {
		console.log('a user connected to the api server');
	});


	return server;
};