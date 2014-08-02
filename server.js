var express = require('express')
var db = require('lib/db')
db.loadModels('user', 'order')

var logger = require('morgan')
var passport = require('lib/passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var swig = require('lib/swig')

var RedisStore = require('connect-redis')(session)
var env = process.env.NODE_ENV || 'development'

var app = express()
if (env === 'development') {
	app.use(logger('dev'))
} else if (env === 'production') {
	app.use(logger())
}
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.set('view cache', false);

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

app.use(require('middleware/flash')())
app.use(function templateEnvironment(req, res, next) {
	res.locals.siteName = 'tarjeta.me'
	res.locals.dev = (env === 'development')
	res.locals.user = req.user
	next()
})

app.get('/', function(req, res) {res.render('index')})
app.use(require('routers/sessionRouter'))
app.use('/order', require('routers/orderRouter'))

app.use(require('middleware/error-handler')())

var server = app.listen(process.env.PORT || 3000, function () {
	if (env !== 'test') {
		console.log('Server listening on port ' + server.address().port)
	}
})
module.exports = app
