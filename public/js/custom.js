/*jshint quotmark:false, maxlen:false, browser:true */
/* global WOW:1 */
/* =================================
===  MAILCHIMP                 ====
=================================== */
$('.mailchimp').ajaxChimp({
	callback: function mailchimpCallback(resp) {
		if (resp.result === 'success') {
			$('.subscription-success')
			.html('<i class="icon_check_alt2"></i> Checa tu correo y confirma la subscripción').fadeIn(1000);
			$('.subscription-error').fadeOut(500);
			$('.subscription-form input, .subscription-form button').hide()

			ga('send', 'event', 'mailchimp', 'subscription', 'main form', 1);
		} else if(resp.result === 'error') {
			$('.subscription-error')
			.html('<i class="icon_close_alt2"></i><br/>' + resp.msg).fadeIn(1000);
		}
	},
	lang: 'es',
	url: "//javascriptmx.us2.list-manage.com/subscribe/post?u=d7fe6986f079260108045fa95&amp;id=7e070c02cd"
});

$('document').ready(function() {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	$('#subscribe-button').on('click', function(e){
		var $this = $(this);

		if(!re.test($('#subscriber-email').val())){
			e.preventDefault();

			$this.parent().find('.error').show();
		}else{
			$this.parent().find('.error').hide();
		}
	});

	$('#name').blur(function () {
		if(!$('#name').val()){
			$('#name').parent().find('.error').show();
		}else{
			$('#name').parent().find('.error').hide();
		}
	});

	$('#email').blur(function () {
		if(!$('#email').val()){
			$('#email').parent().find('.error').show();
			$('#email').parent().find('.invalid-email').hide();
		}else if(!re.test($('#email').val())){
			$('#email').parent().find('.invalid-email').show();
			$('#email').parent().find('.error').hide();
		}else{
			$('#email').parent().find('.invalid-email').hide();
			$('#email').parent().find('.error').hide();
		}
	});

	$('#subject').blur(function () {
		if(!$('#subject').val()){
			$('#subject').parent().find('.error').show();
		}else{
			$('#subject').parent().find('.error').hide();
		}
	});

	$('#message').blur(function () {
		if(!$('#message').val()){
			$('#message').parent().find('.error').show();
		}else{
			$('#message').parent().find('.error').hide();
		}
	});

	$('.contact-form').on('submit', function (e) {
		var error;

		if(!$('#name').val()){
			$('#name').parent().find('.error').show();
			error = true;
		}else{
			$('#name').parent().find('.error').hide();
		}

		if(!$('#email').val()){
			$('#email').parent().find('.error').show();
			$('#email').parent().find('.invalid-email').hide();
			error = true;
		}else if(!re.test($('#email').val())){
			$('#email').parent().find('.invalid-email').show();
			$('#email').parent().find('.error').hide();
			error = true;
		}else{
			$('#email').parent().find('.invalid-email').hide();
			$('#email').parent().find('.error').hide();
		}

		if(!$('#subject').val()){
			$('#subject').parent().find('.error').show();
			error = true;
		}else{
			$('#subject').parent().find('.error').hide();
		}

		if(!$('#message').val()){
			$('#message').parent().find('.error').show();
			error = true;
		}else{
			$('#message').parent().find('.error').hide();
		}

		if(error){
			e.preventDefault();
		}
	});
});


/* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK - ADDED ON V1.5*/
if (matchMedia('(max-width: 480px)').matches) {
	$('.main-navigation a').on('click', function () {
		$(".navbar-toggle").click();
	});
}


/* NAVIGATION VISIBLE ON SCROLL */
var mainNav
$(document).ready(function () {
	mainNav();
});

$(window).scroll(function () {
	mainNav();
});

if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
	mainNav = function mainNav() {
		var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

		else $('.sticky-navigation').stop().animate({"top": '-60'});
	}
}

if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
	mainNav = function mainNav() {
		var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if (top > 40) $('.sticky-navigation').stop().animate({"top": '0'});

		else $('.sticky-navigation').stop().animate({"top": '-120'});
	}
}