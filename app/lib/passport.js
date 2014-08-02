var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var NotFoundError = require('errors').NotFoundError
var User = require('./db').User

passport.serializeUser(function(user, done) {
	done(null, user.id)
})

passport.deserializeUser(function(id, done) {
	User.findById(id, done)
})

passport.use(new LocalStrategy(function localLogin(email, password, done) {
	User.findOneAsync({email: email})
	.then(function(user) {
		console.log(user)
		if (!user) {
			throw new NotFoundError()
		}
		return user.comparePassword(password).then(function(isMatch){
			if (!isMatch) throw new NotFoundError()
			done(null, user)
		})
	}).catch(NotFoundError, function() {
		done(null, false, {message: 'Usuario o contraseña incorrecto'})
	}).catch(done)
}))

module.exports = passport
