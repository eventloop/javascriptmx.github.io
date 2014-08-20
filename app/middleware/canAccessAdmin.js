var User = require('lib/db').User

module.exports = function(req, res, next) {
	if( !(req.session && req.session.passport && req.session.passport.user) ){
		return res.status(403).send('Forbidden')
	}

	User.findById(req.session.passport.user, function (err, user) {
		if(err){
			return res.status(500).send(err)
		}

		if(!user){
			return res.status(403).send('Forbidden')
		}
		
		if(!user.isAdmin){
			return res.status(403).send('Forbidden')
		}

		res.locals.user = user;
		res.user = user;

		next();
	})
}
