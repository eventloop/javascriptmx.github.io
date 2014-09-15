module.exports = function(req, res, next) {
	if (!req.user) {
		return res.redirect('/login')
	}

	if (!req.user.isAdmin) {
		return res.sendStatus(403)
	}

	res.locals.user = req.user;

	next();
}
