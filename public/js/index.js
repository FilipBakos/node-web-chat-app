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
	let li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('welcomeMessage', function(message){
	console.log('Message welcome: ',message);
});

socket.on('newUserWelcome', function(message){
	console.log('Message: ', message);
});

socket.emit('createMessage', {
	from: 'Frank',
	text: 'Hi'
}, function(data) {
	console.log('Got it, ',data);
});

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from:'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});