const path = require('path'); //netreba instalovat
const http = require('http'); //netreba instalovat
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.on('disconnect',() => {
		console.log('User disconnected');
	});


	socket.emit('welcomeMessage', generateMessage('admin','Welcome to chat app'));

	socket.broadcast.emit('newUserWelcome', generateMessage('admin','New user joined'));

	//EMAIL
	// socket.on('createEmail',(newEmail) => {
	// 	console.log('Create email ', newEmail);
	// });

	socket.on('createMessage',(newMessage, callback) => {
		console.log('MEssage: ',newMessage);
		io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
 		callback('This is from the server');
 		// socket.broadcast.emit('newMessage', {
			// from: newMessage.from,
			// text: newMessage.text,
			// createdAt: new Date().getTime()
 		// });
	});

	/*socket.emit('newMessage',{
		from:'niekto@gmail.com',
		text: 'TOTO JE OBSAH SPRAVY',
		createdAt: Date.now()
	})*/

	//EMAIL
	// socket.emit('newEmail',{
	// 	from: 'meno@googl.com',
	// 	text: 'TOTO JE CO'
	// });
});



server.listen(port, () => {
	console.log(`App je na porte ${port}`);
});




