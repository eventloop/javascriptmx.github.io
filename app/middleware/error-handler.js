/* jshint unused:false */

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

		// Security header for content sniffing
		res.setHeader('X-Content-Type-Options', 'nosniff')
		res.status(status);

		if (req.is('json')) {
			if (err.noData) {
				res.end()
			} else {
				res.json({error: data})
			}
		} else if (req.is('html')) {
			res.render('error', data)
		} else {
			res.send(err.message)
		}
	}
}
