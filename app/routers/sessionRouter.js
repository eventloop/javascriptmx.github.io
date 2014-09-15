var express = require('express')
var createError = require('http-errors')
var passport = require('passport')
var _ = require('lodash')
var ValidationError = require('mongoose/lib/error/validation')

var User = require('lib/db').User
var defaultRedirection = '/'

var router = new express.Router()

router.route('/login')
.get(function(req, res) {
	res.render('session/login', {
		user: req.user,
		messages: req.session.messages
	})

}).post(function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) return next(err)

		if (!user) {
			req.flash('error', info.message)
			return res.redirect('/login')
		}

		req.logIn(user, function(err) {
			if (err) return next(err)

			return res.redirect(req.session.redirectTo || defaultRedirection)
		})
	})(req, res, next)
})

router.get('/logout', function(req, res) {
	req.logout()
	res.redirect('/')
})

router.route('/signup')
.get(function(req, res) {
	res.render('session/signup')
}).post(function(req, res, next) {
	if (!req.body.email || !req.body.password) {
		return next(new createError.BadRequest('Expected email'))
	}

	var userAttributes = _.pick(req.body, 'email', 'password')
	User.createAsync(userAttributes)
	.then(function(user) {
		if (req.is('json')) {
			res.send(user.toJSON())
		} else {
			req.logIn(user, function(err) {
				if (err) return next(err)

				return res.redirect(defaultRedirection)
			})
		}
	}).catch(ValidationError, function(err) {
		//TODO send better errors and stuff
		throw new createError.BadRequest(err.toString())
	})
	.catch(next)
})

module.exports = router
