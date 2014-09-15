var express = require('express'),
	Newsletters = require('models/newsletters')

var router = new express.Router();

router.get('/', function(req, res) {res.render('index')})

router.get('/newsletters', function(req, res, next) {
	Newsletters.find({status:'publish'}, {data:0}).sort('-sendAt').exec()
	.then(function (newsletters) {
		res.render('newsletters', {newsletters:newsletters})
	}, next);
})

module.exports = router