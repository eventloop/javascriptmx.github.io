var _ = require('lodash')
var mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
var db = mongoose.connection
mongoose.set('debug', !!process.env.MONGO_DEBUG)
db.on('error', function () {
	return console.error.bind(console, '[mongo]: ')
})
db.once('open', function () {
	console.log('Mongo connected to ' + process.env.MONGO_URL)
})

var models = {},
loadedModels = []

exports.loadModels = function () {
	_.each(_.toArray(arguments), function (modelName) {
		if (! _.include(loadedModels, modelName)) {
			var Model,
			exported = require('../models/' + modelName)
			if (typeof exported === 'function') {
				Model = exported
			} else if (exported.model) {
				Model = exported.model
			}

			if (Model) {
				models[Model.modelName] = Model
				exports[Model.modelName] = Model
				loadedModels.push(modelName)
			}
		}
	})
}

exports.model = function (name) {
	return models[name]
}

