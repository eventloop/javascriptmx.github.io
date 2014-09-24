var express = require('express'),
	Newsletters = require('models/newsletters')

var router = new express.Router();

router.get('/', function(req, res) {
	Newsletters.findOne({status:'publish'}, {data:0}).sort('-sendAt').exec(function (err, newsletter) {
		if(err){
			return res.status(500).send(err);
		}
		
		res.render('index', {newsletter:newsletter})
	});
});

router.get('/newsletters', function(req, res, next) {
	Newsletters.find({status:'publish'}, {data:0}).sort('-sendAt').exec()
	.then(function (newsletters) {
		res.render('newsletters', {newsletters:newsletters})
	}, next);
})

module.exports = router