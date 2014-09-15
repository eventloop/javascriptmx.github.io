// https://bitbucket.org/mailchimp/mailchimp-api-node/src/e00628df7ee8d91ab91b9f5c603a3ce473ea9c89/mailchimp.js
var mcapi = require('mailchimp-api')
var Bluebird = require('bluebird')

var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY)

mc.getListData = function (callback) {
	return new Bluebird(function(resolve, reject) {
		mc.lists.members({id: process.env.MAILCHIMP_LIST_ID}, resolve, reject)
	}).nodeify(callback)
}

mc.getCampaigns = function(query, callback) {
	query = query || {}
	return new Bluebird(function(resolve, reject) {
		mc.campaigns.list(query, resolve, reject)
	}).nodeify(callback)
}

module.exports = mc;
