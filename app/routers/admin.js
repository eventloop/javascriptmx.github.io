var express = require('express'),
	// BadRequestError = require('errors').BadRequestError,
	canAccessAdmin = require('app/middleware/canAccessAdmin'),
	mailchimp = require('app/lib/mailchimp')

var router = new express.Router()

router.use(canAccessAdmin)

var newslettersRouter = require('app/routers/campaigns')
router.use('/campaigns', newslettersRouter)

router.route('/').get(function(req, res){
	mailchimp.getListData(function (err, data) {
		res.render('admin/main',{
			subscribers : data.total
		});
	})
})

module.exports = router