var express = require('express')
var BadRequestError = require('errors').BadRequestError
var Busboy = require('busboy')
var uuid = require('uuid')
var inspect = require('util').inspect
var path = require('path')
var Uploader = require('s3-upload-stream').Uploader
var _ = require('underscore')

var router = new express.Router()

var mimetypes = 'application/pdf image/png image/jpeg'.split(' ')
router.route('/new')
.get(function(req, res) {
	res.render('order/form')
}).post(function(req, res, next) {
	var busboy = new Busboy({headers: req.headers})
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		if (! _.contains(mimetypes, mimetype)) {
			return next(new BadRequestError('File type '+mimetype+' not recognized'))
		}

		new Uploader({
			region: 'us-east-1',
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
		}, {
			Bucket: 'jeduan',
			Key: uuid.v1() + path.extname(filename)
		}, function(err, uploadStream) {
			if (err) {
				console.log(err, uploadStream)
				return
			}

			uploadStream.on('chunk', function(data) {
				console.log('upload chunk', data)
			})
			uploadStream.on('uploaded', function(data) {
				console.log('uploaded', data)
			})

			file.pipe(uploadStream)
		})
	})

	busboy.on('field', function(fieldname, val) {
		console.log('Field [%s]: value: ', fieldname, inspect(val));
	});

	busboy.on('finish', function() {
		console.log('Done parsing form!');
		res.writeHead(303, { Connection: 'close', Location: '/' });
		res.end();
	});

	req.pipe(busboy)
})

module.exports = router
