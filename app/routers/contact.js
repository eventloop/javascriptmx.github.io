var express = require('express'),
	BadRequestError = require('errors').BadRequestError,
	mailer = require('lib/mailer')

var router = new express.Router();

router.route('/').post(function(req, res){
	if( !req.body.name || !req.body.email || !req.body.subject || !req.body.message ){
		return next(new BadRequestError('Invalid data'));
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