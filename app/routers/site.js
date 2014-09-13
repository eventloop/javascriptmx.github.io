var express = require('express'),
	BadRequestError = require('errors').BadRequestError,
	Newsletters = require('models/newsletters')

var router = new express.Router();

router.get('/', function(req, res) {res.render('index')})

router.get('/newsletters', function(req, res) {
	Newsletters.find({status:'publish'}, {data:0}).sort('-sendAt').exec(function (err, data) {
		if(err){
			return res.status(500).send(err);
		}

		res.send(data);
	});
})

module.exports = router