/* jshint unused:false */
var accepts = require('accepts')

module.exports = function() {
	return function errorHandler(err, req, res, next) {
		var status = err.status || 500
		var data = {
			error: err.name || 'Error',
			message: err.message
		}

		// Do not log user error
		if (Math.floor(status) === 5) {
			console.error(err)
		}

		var accept = accepts(req)
		var type = accept.types('html', 'json', 'text')
		// Security header for content sniffing
		res.setHeader('X-Content-Type-Options', 'nosniff')
		res.status(status);
		console.log('rendering error', type)

		if (type === 'html') {
			return res.render('error', data);
		} else if (type === 'json'){
			return res.json(data)
		} else {
			res.setHeader('content-type', 'text/plain')
			res.send(err.message)
		}
	}
}
