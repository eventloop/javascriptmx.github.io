var swig = require('swig')
var _ = require('underscore')

swig.setDefaults({
	root: '../views',
	cache : false
});

// helpers

swig.setFilter('isEmpty', function (obj) {
	return _.isEmpty(obj);
});

swig.setFilter('prettyDate', function(obj, format) {
	return obj.format(format);
});


module.exports = swig