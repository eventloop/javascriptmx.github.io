var express = require('express'),
	// BadRequestError = require('errors').BadRequestError,
	canAccessAdmin = require('middleware/canAccessAdmin'),
	mailchimp = require('lib/mailchimp')

var router = new express.Router()

router.use(canAccessAdmin)

var newslettersRouter = require('routers/campaigns')
router.use('/campaigns', newslettersRouter)

router.route('/').get(function(req, res, next){
	mailchimp.getListData.then(function (data) {
		res.render('admin/main',{
			subscribers : data.total
		});
	}).catch(next)
})

module.exports = router