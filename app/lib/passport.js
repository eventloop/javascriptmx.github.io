var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var createError = require('http-errors')
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
			throw new createError.NotFound()
		}
		return user.comparePassword(password).then(function(isMatch){
			if (!isMatch) throw new createError.NotFound()
			done(null, user)
		})
	}).catch(createError.NotFound, function() {
		done(null, false, {message: 'Usuario o contraseña incorrecto'})
	}).catch(done)
}))

module.exports = passport
