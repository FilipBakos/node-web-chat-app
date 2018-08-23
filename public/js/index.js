var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');

	//EMAIL
	// socket.emit('createEmail',{
	// 	to: 'filip@gogl.com',
	// 	text: 'TOTO JE CO'
	// });

	/*socket.emit('createMessage',{
		to: 'filipbakos@gmail.com',
		text: 'TOTO JE OBSAH SPRAVY'
	});*/
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

//EMAIL
// socket.on('newEmail', function(email) {
// 	console.log('New email', email);
// });

socket.on('newMessage', function(message){
	console.log('Message ', message);
});