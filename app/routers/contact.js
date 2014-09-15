var express = require('express'),
	createError = require('http-errors'),
	mailer = require('lib/mailer')

var router = new express.Router();

router.route('/').post(function(req, res, next){
	if( !req.body.name || !req.body.email ||
		!req.body.subject || !req.body.message ){
		return next(new createError.BadRequest('Invalid data'));
	}

	mailer.sendContactMessage(req.body, function (err) {
		if(err){
			console.log('Error: mail coudn\'t')
		}

		res.redirect('/contacto/gracias');
	});
});

router.route('/gracias').get(function (req, res) {
	res.render('contact/thx');
});

module.exports = router