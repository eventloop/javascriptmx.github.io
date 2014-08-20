// https://bitbucket.org/mailchimp/mailchimp-api-node/src/e00628df7ee8d91ab91b9f5c603a3ce473ea9c89/mailchimp.js
var mcapi = require('mailchimp-api')

var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY)

mc.getListData = function (callback) {
	mc.lists.members({id: process.env.MAILCHIMP_LIST_ID},
	function(res) {
		callback(null, res);
	},
	function(err) {
		callback(err);
	});
}

module.exports = mc;