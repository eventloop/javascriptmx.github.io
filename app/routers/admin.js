var express = require('express'),
	// BadRequestError = require('errors').BadRequestError,
	canAccessAdmin = require('app/middleware/canAccessAdmin')
	mailchimp = require('app/lib/mailchimp')

var router = new express.Router()

router.use(canAccessAdmin)

router.route('/').get(function(req, res){
	mailchimp.getListData(function (err, data) {
		res.render('admin/main',{
			subscribers : data.total
		});
	})
})

module.exports = router