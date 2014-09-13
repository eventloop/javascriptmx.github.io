var mongoose = require('lib/mongoose')
var findOrCreate = require('mongoose-findorcreate')
var async = require('async')
var mailchimp = require('lib/mailchimp')
var _ = require('underscore')

var schema = new mongoose.Schema({
	status : {type: String, default: 'draft'},
	cid    : {type: String, required: true, unique: true},
	url    : {type: String, required: true},
	title  : {type: String, required: true},
	sendAt : {type: Date, required: true},
	data   : mongoose.Schema.Types.Mixed,
	description: {type: String},
	content: {type: String}
})
schema.plugin(findOrCreate)

var Newsletter = mongoose.model('Newsletter', schema)

Newsletter.fetch = function (cb) {
	mailchimp.campaigns.list({}, function (campaigns) {
		async.series(campaigns.data.filter(function (campaign) {
			return campaign.status === 'sent' && campaign.send_time;
		}).map(function(campaign){
			return function(done){
				Newsletter.findOrCreate({cid: campaign.id}, {
					cid : campaign.id,
					url : campaign.archive_url,
					title : campaign.title,
					sendAt : new Date(campaign.send_time),
					data: campaign
				}, function(err, newsletter){
					done(null, newsletter);
				})
			}
		}), function (err, results) {
			if(results){
				results = _.sortBy(results, function(newsletter){ return newsletter.sendAt; }).reverse();
			}

			cb(err, results)
		});
	},function (err) {
		cb(err)
	})
}

module.exports = Newsletter
