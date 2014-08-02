module.exports = function() {
	var classMap = {
		error: 'danger',
		warn: 'warning'
	}
	return function flashMessages(req, res, next) {
		var flash = req.flash()
		var messages = []
		Object.keys(flash).forEach(function(key) {
			flash[key].forEach(function(message) {
				messages.push({
					type: classMap[key] || key,
					message: message
				})
			})
		})
		res.locals.flash = messages.length && messages
		next()
	}
}
