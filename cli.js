var argv = require('optimist').argv
var db = require('lib/db')
db.loadModels('user','newsletters')

var taskName = argv._[0]
var User = db.User

if(!taskName){
	console.log('FAIL!!! Action is require');
	process.exit();
}

if(argv.v){
	console.log('Arguments',argv);
}

if(taskName === 'makeAdmin'){
	if( !(argv.u) ){
		console.log('FAIL!!! makeAdmin requires a User Name');
		console.log('SAMPLE: node cli.js makeAdmin -u "siedrix@gmail.com"');
		process.exit();
	}

	User.findOne({email:argv.u}, function (err, user) {
		if( err ){
			console.log('FAIL!!! Error 1', err);
			process.exit();
		}

		if( !user ){
			console.log('FAIL!!! No user found');
			process.exit();
		}

		user.isAdmin = true;
		user.save(function (err) {
			if( err ){
				console.log('FAIL!!! Error 2', err);
				process.exit();
			}
			
			console.log('Success!!! User is now an admin');
			process.exit();
		})
	})
}else{
	console.log('FAIL!!! invalid action, check cli.js to verify what you are doing')
	process.exit()
}