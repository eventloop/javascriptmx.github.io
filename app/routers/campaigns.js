var express = require('express'),
	BadRequestError = require('errors').BadRequestError,
	mailchimp = require('lib/mailchimp'),
	Newsletters = require('models/newsletters')

var router = new express.Router()

router.route('/list').get(function(req, res){
	mailchimp.campaigns.list({}, function (campaigns) {
		Newsletters.find({}, function (err, newsletters) {
			if(err){
				return res.status(500).send(err)
			}

			res.send({
				newsletters:newsletters,
				campaigns:campaigns
			});
		})
	},function (err) {
		console.log(err)
		res.send('Error')
	})
})

router.route('/show/:cid').get(function(req, res){
	if(!req.params.cid){
		return res.status(404).send('Need a cid')
	}

	mailchimp.campaigns.templateContent({cid:req.params.cid}, function (data) {
		res.send(data)
	},function (err) {
		console.log(err)
		res.status(500).send(err)
	})
})

module.exports = router