var mongoose = require('lib/mongoose')
var findOrCreate = require('mongoose-findorcreate')
var mailchimp = require('lib/mailchimp')
var Bluebird = require('bluebird')

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

var Newsletter = Bluebird.promisifyAll(mongoose.model('Newsletter', schema))

/*jshint camelcase:false */
Newsletter.fetch = function (cb) {
	return mailchimp.getCampaigns().then(function (campaigns) {
		var promises = campaigns.data.filter(function (campaign) {
			return campaign.status === 'sent' && campaign.send_time;
		}).map(function(campaign) {
			return Newsletter.findOrCreateAsync({cid: campaign.id}, {
				cid : campaign.id,
				url : campaign.archive_url,
				title : campaign.title,
				sendAt : new Date(campaign.send_time),
				data: campaign
			}).get(0)
		})
		return Bluebird.all(promises)
	}).nodeify(cb)
}
/*jshint camelcase:true */

module.exports = Newsletter
