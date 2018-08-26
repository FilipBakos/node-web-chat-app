

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
	let formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template,{
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	
	// console.log('Message ', message);
	// let li = jQuery('<li></li>');
	// li.text(`${message.from} -${formattedTime}- : ${message.text}`);

	// jQuery('#messages').append(li);
});

socket.on('welcomeMessage', function(message){
		let formattedTime = moment(message.createdAt).format('h:mm a');

	var template = jQuery('#message-template').html();
	var html = Mustache.render(template,{
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);


	// console.log('Message welcome: ',message);
	// let li = jQuery('<li></li>');
	// li.text(`${message.from}: ${message.text}`);

	// jQuery('#messages').append(li);

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

socket.on('newLocationMessage', function(message) {
	let formattedTime = moment(message.createdAt).format('h:mm a');

	var template = jQuery("#message-template-location").html();
	var html = Mustache.render(template,{
		text: 'My current location',
		from: message.from,
		createdAt: formattedTime,
		link: message.url
	});


	jQuery('#messages').append(html);
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);

	// li.append(a);
	//jQuery('#messages').append(li);
});


// jQuery('#message-form').on('submit', function(e) {
// 	e.preventDefault();

// 	socket.emit('createMessage', {
// 		from:'User',
// 		text: jQuery('[name=message]').val()
// 	}, function() {

// 	});
// });

// let locationButton = jQuery('#send-location');
// locationButton.on('click', function() {
// 	if (!navigator.geolocation) {
// 		return alert('Geolocation not supported by your browser.');
// 	}

// 	navigator.geolocation.getCurrentPosition(function(position) {
// 		socket.emit('createLocationMessage',{
// 			latitude: position.coords.latitude,
// 			longitude: position.coords.longitude
// 		});
// 	}, function() {
// 		alert('Unable ro fetch location');
// 	})
// })
// 

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	let messageTextBox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from:'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('');
	});
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled','disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable ro fetch location');
	})
})