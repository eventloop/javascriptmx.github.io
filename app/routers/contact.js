var express = require('express'),
	BadRequestError = require('errors').BadRequestError,
	mailer = require('lib/mailer')

var router = new express.Router()

router.route('/contact').post(function(req, res){
	console.log(req.body)
	if( !req.body.name || !req.body.email || !req.body.subject || !req.body.message ){
		return res.send({error:'Invalid data'});
	}

	mailer.sendContactMessage(req.body, function (err) {
		res.send('success');
	});
});

module.exports = router