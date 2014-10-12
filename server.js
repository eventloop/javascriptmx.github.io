var express = require('express')
var Paperpress = require('paperpress').Paperpress;
var db = require('lib/db')
db.loadModels('user','newsletters')

var logger = require('morgan')
var passport = require('lib/passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var swig = require('lib/swig')

var RedisStore = require('connect-redis')(session)
var env = process.env.NODE_ENV || 'development'

var app = express()
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);

swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cookie-parser')(process.env.SECRET))
app.use(require('method-override')())
app.use(session({
	store: new RedisStore(),
	secret: process.env.SECRET,
	saveUninitialized: true,
	resave: true
}))
app.use(require('connect-flash')())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))
app.use('/bower', express.static(__dirname + '/bower_components'))
if (env === 'development') {
	app.use(logger('dev'));
} else if (env === 'production') {
	app.use(logger(':status :req[x-real-ip] :method :response-time ms :url'));
}

app.use(require('middleware/flash')())
app.use(function templateEnvironment(req, res, next) {
	res.locals.siteName = 'javacriptmx'
	res.locals.dev = (env === 'development')
	res.locals.user = req.user
	next()
})

var blog = new Paperpress({
  directory : 'static',
  themePath : '/static/themes/base',
  basePath  : '/blog',
  articlesPerPage : 20,
  pagesPath : ''
});

blog.attach(app);

app.use(require('routers/sessionRouter'))
app.use(require('routers/site'))

app.use('/admin', require('routers/admin'))
app.use('/contacto', require('routers/contact'))
app.use('/utils/campaigns', require('routers/campaigns'))

if (env === 'production') {
	app.use(require('middleware/error-handler')())
} else {
	app.use(require('errorhandler')())
}


var server = app.listen(process.env.PORT || 3000, function () {
	if (env !== 'test') {
		console.log('Server listening on port ' + server.address().port)
	}
})
module.exports = app
