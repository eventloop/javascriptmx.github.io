// Documentation
// https://mandrillapp.com/api/docs/index.nodejs.html
// https://mandrillapp.com/api/docs/messages.nodejs.html
// https://mandrillapp.com/api/docs/templates.nodejs.html
var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(process.env.MANDRIL_API_KEY);

mandrillClient.sendContactMessage = function (data, callback) {
	var content = '<p>Message from '+data.name+' ('+data.email+')</p>' +
		'<p>subject: '+data.subject +'</p>' +
		'<p>'+data.message +'</p>';

	var message = {
		'html': content,
		'subject': 'JS contact request',
		'from_email': 'siedrix+jsmx@gmail.com',
		'from_name': 'JS Server Contact form',
		'to': [{
			'email': 'siedrix@gmail.com',
			'name': 'Daniel Zavala',
			'type': 'to'
		},{
			'email': 'siedrix+2@gmail.com',
			'name': 'Daniel Zavala',
			'type': 'to'
		}]
	};

	var async = false;
	var ip_pool = 'Main Pool';

	mandrillClient.messages.send({
		'message': message,
		'async': async,
		'ip_pool': ip_pool
	}, function(result) {
		callback(null, result);
	}, function(e) {
		callback(e);
	});
};

module.exports = mandrillClient