var User = require('lib/db').User

module.exports = function(req, res, next) {
	if( !(req.session && req.session.passport && req.session.passport.user) ){
		return res.sendStatus(403)
	}

	User.findById(req.session.passport.user, function (err, user) {
		if(err){
			return res.status(500).send(err)
		}

		if(! (user && user.isAdmin)){
			return res.sendStatus(403)
		}

		res.locals.user = user;

		next();
	})
}
