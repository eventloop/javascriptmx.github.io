/*jshint quotmark:false, maxlen:false, browser:true */

var headerSizer = function () {
	$('header, .color-overlay').css('min-height', window.innerHeight);
}

$(window).on('load', headerSizer);
$(window).on('resize', headerSizer);

if (matchMedia('(max-width: 480px)').matches) {
	$('.main-navigation a').on('click', function () {
		$(".navbar-toggle").click();
	});
}


if(window.home){
	var mainNav
	$(document).ready(function () {
		mainNav();
	});

	$(window).scroll(function () {
		mainNav();
	});
}

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