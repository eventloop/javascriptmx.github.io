var mongoose = require('lib/mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId
var statuses = 'partial created ordered accepted'.split(' ')

var attachmentSchema = new mongoose.Schema({
	url: String
})

var logSchema = new mongoose.Schema({
	statusFrom: {type: String, enum: statuses},
	statusTo: {type: String, enum: statuses}
})

var schema = new mongoose.Schema({
	status: {type: String, enum: statuses},
	user: {type: ObjectId, ref: 'User'},
	attachments: [attachmentSchema],
	log: [logSchema]
})

var Order = mongoose.model('Order', schema)

module.exports = Order
