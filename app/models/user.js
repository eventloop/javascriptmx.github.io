var mongoose = require('lib/mongoose')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')

var WORK_FACTOR = 10

var schema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	isAdmin: {type: Boolean, default: false}
})

schema.methods.comparePassword = function(candidatePassword, next) {
	var compare = Promise.promisify(bcrypt.compare)

	return compare(candidatePassword, this.password)
	.nodeify(next)
}

schema.pre('save', function(next) {
	var user = this
	if (!user.isModified('password')) {
		return next()
	}

	bcrypt.genSalt(WORK_FACTOR, function(err, salt) {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err)

			user.password = hash
			next()
		})
	})
})

var User = mongoose.model('User', schema)

module.exports = User
