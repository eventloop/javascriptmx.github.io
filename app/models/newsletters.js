var mongoose = require('lib/mongoose')
var Promise = require('bluebird')

var schema = new mongoose.Schema({
	status: {type: String, required: true},
	cid: {type: String, required: true, unique: true},
	url: {type: String, required: true},
	description: {type: String}
})

var Newsletter = mongoose.model('Newsletter', schema)

module.exports = Newsletter
