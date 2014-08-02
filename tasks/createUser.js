var db = require('lib/db')
var Faker = require('faker')

db.loadModels('User')

module.exports = function(grunt) {

	function addAccount(email) {
		var done = this.async()

		var attributes = {
			email: email || Faker.Internet.email(),
			password: grunt.option('password') || Faker.Lorem.words(3).join('-'),
			isAdmin: grunt.option('admin') || false,
		}

		if (grunt.option('dryrun')) {
			grunt.log.writeln('Attributes', JSON.stringify(attributes))
			return done()
		}

		db.User.createAsync(attributes)
		.then(function(user) {
			grunt.log.writeln('Created user %s with password %s',
				user.email, attributes.password)
			done()
		}).catch(done)
	}

	grunt.registerTask('createuser', 'Creates a new user', addAccount)
}

