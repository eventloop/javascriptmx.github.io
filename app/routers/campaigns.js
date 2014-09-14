var express = require('express'),
	Newsletters = require('models/newsletters'),
	marked = require('marked')

marked.setOptions({});

var router = new express.Router()

router.route('/').get(function(req, res){
	Newsletters.fetch(function (err, newsletters) {
		if(err){return res.status(500).send(err)}

		res.render('admin/campaigns/list', {
			newsletters : newsletters,
		})
	})
})

router.route('/:cid').get(function(req, res){
	if(!req.params.cid){
		return res.status(404).send('Need a cid')
	}

	Newsletters.findOne({cid:req.params.cid}, function (err, newsletter) {
		if(err){return res.status(500).send(err)}
		if(!newsletter){return res.status(404).send('not found')}

		console.log(req.flash('message'));
		res.render('admin/campaigns/single', {
			newsletter : newsletter,
		})
	})
}).post(function(req, res){
	if(!req.params.cid){
		return res.status(404).send('Need a cid')
	}

	Newsletters.findOne({cid:req.params.cid}, function (err, newsletter) {
		if(req.body.action === 'publish'){
			newsletter.status = 'publish';
		}

		if(req.body.action === 'unpublish'){
			newsletter.status = 'draft';
		}

		newsletter.title = req.body.title
		newsletter.description = req.body.description
		newsletter.content = marked(req.body.description)

		newsletter.save(function (err) {
			if(err){return res.status(500).send(err)}
			req.flash('message', 'edited sucessfully');
			res.redirect('/admin/campaigns/' + newsletter.cid );
		})
	})
})

module.exports = router