/*jshint quotmark:false, maxlen:false, browser:true */
/* global WOW:1 */
/* =================================
===  MAILCHIMP                 ====
=================================== */
$('.mailchimp').ajaxChimp({
	callback: function mailchimpCallback(resp) {
		if (resp.result === 'success') {
			$('.subscription-success')
			.html('<i class="icon_check_alt2"></i><br/>' + resp.msg).fadeIn(1000);
			$('.subscription-error').fadeOut(500);

			ga('send', 'event', 'mailchimp', 'subscription', 'main form', 1);
		} else if(resp.result === 'error') {
			$('.subscription-error')
			.html('<i class="icon_close_alt2"></i><br/>' + resp.msg).fadeIn(1000);
		}
	},
	lang: 'es',
	url: "//jsmexico.us2.list-manage.com/subscribe/post?u=d7fe6986f079260108045fa95&amp;id=7e070c02cd"
});


/* =================================
===  STICKY NAV                 ====
=================================== */
$('document').ready(function() {
	$('.contact-form').bootstrapValidator({
		message: 'This value is not valid',
		fields: {
			name :{
				validators : {
					notEmpty : {
						message: 'Agrega tu nombre'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'Agrega tu email'
					},
					emailAddress: {
						message: 'Ingresa un email valido'
					}
				}
			},
			subject :{
				validators : {
					notEmpty : {
						message: 'Agrega un título a tu mensaje'
					}
				}
			},
			message :{
				validators : {
					notEmpty : {
						message: 'Agrega tu mensaje'
					}
				}
			}
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



/* =================================
===  DOWNLOAD BUTTON CLICK SCROLL ==
=================================== */
jQuery(function( $ ){
			$('#download-button').localScroll({
				duration:1000
			});
		});


/* =================================
===  FULL SCREEN HEADER         ====
=================================== */
function alturaMaxima() {
  var altura = $(window).height();
  $(".full-screen").css('min-height',altura); 
  
}

$(document).ready(function() {
  alturaMaxima();
  $(window).bind('resize', alturaMaxima);
});


/* =================================
===  SMOOTH SCROLL             ====
=================================== */
var scrollAnimationTime = 1200,
	scrollAnimation = 'easeInOutExpo';
$('a.scrollto').bind('click.smoothscroll', function (event) {
	event.preventDefault();
	var target = this.hash;
	$('html, body').stop().animate({
		'scrollTop': $(target).offset().top
	}, scrollAnimationTime, scrollAnimation, function () {
		window.location.hash = target;
	});
});


/* =================================
===  WOW ANIMATION             ====
=================================== */
window.wow = new WOW(
  {
	mobile: false
  });
window.wow.init();


/* =================================
===  OWL CROUSEL               ====
=================================== */
$(document).ready(function () {

	$("#feedbacks").owlCarousel({

		navigation: false, // Show next and prev buttons
		slideSpeed: 800,
		paginationSpeed: 400,
		autoPlay: 5000,
		singleItem: true
	});

	var owl = $("#screenshots");

	owl.owlCarousel({
		items: 4, //10 items above 1000px browser width
		itemsDesktop: [1000, 4], //5 items between 1000px and 901px
		itemsDesktopSmall: [900, 2], // betweem 900px and 601px
		itemsTablet: [600, 1], //2 items between 600 and 0
		itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
	});


});


/* =================================
===  Nivo Lightbox              ====
=================================== */
$(document).ready(function () {

	$('#screenshots a').nivoLightbox({
		effect: 'fadeScale',
	});

});


/* =================================
===  SUBSCRIPTION FORM          ====
=================================== */
$("#subscribe").submit(function (e) {
    e.preventDefault();
    var email = $("#subscriber-email").val();
    var dataString = 'email=' + email;

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    if (isValidEmail(email)) {
        $.ajax({
            type: "POST",
            url: "subscribe/subscribe.php",
            data: dataString,
            success: function () {
                $('.subscription-success').fadeIn(1000);
                $('.subscription-error').fadeOut(500);
                $('.hide-after').fadeOut(500);
            }
        });
    } else {
        $('.subscription-error').fadeIn(1000);
    }

    return false;
});


/* =================================
===  STELLAR                    ====
=================================== */
$(window).stellar({ 
horizontalScrolling: false 
});


/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
	document.createTextNode(
	  '@-ms-viewport{width:auto!important}'
	)
  )
  document.querySelector('head').appendChild(msViewportStyle)
}
