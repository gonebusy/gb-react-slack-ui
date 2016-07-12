var YTManager = require('./components/yt-manager');
var Bootstrap = require('bootstrap');
var Validator = require("bootstrap-validator")
var Waypoints = require('waypoints');
var CSSPlugin = require('gsap-css-plugin');
var EasePack = require('gsap-ease-pack');
var ScrollToPlugin = require('gsap-scroll-to-plugin');
var SplitText = require('gsap-split-text');
var Header = require('./components/header');


global.Main = function(){

	var viewWidth;
	var viewHeight;

	function init(){
		viewWidth = window.innerWidth;
		viewHeight = window.innerHeight;

		addEvents();

	}

	function resize(){
		viewWidth = window.innerWidth;
		viewHeight = window.innerHeight;


		if(viewWidth > 768 ){
			//Header.init();
		}
	}

	function stickyNav() {
		if ($(window).scrollTop() > 0) {
			$('.navbar').addClass('stuck');
		} else {
			$('.navbar').removeClass('stuck');
		}
	}

	function checkHash(e){
		/*var name = window.location.hash.substr(1);
		switch(name){
			case "pricing":
				TweenLite.delayedCall(.25, scrollToElement, ['section.pricing']);
				break
			case "tour":
				TweenLite.delayedCall(.25, scrollToElement, ['section.phases']);
				break
			case "contact":
				TweenLite.delayedCall(.25, showContactForm);
				break;
		}*/
	}

	function scrollToElement(el){
		TweenLite.to(window, 1, {scrollTo:{y:$(el).offset().top - $('.navbar').innerHeight()}, ease:Power2.easeOut});
	}

	
	function centerModal() {
        var $modal = $(this);
        var $dialog = $modal.find('.modal-dialog');
        $modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        $dialog.css("margin-top", Math.max(0, (viewHeight - $dialog.height()) / 2));
    }

	function addEvents(e){
		$(document).on("click", 'a[href="#"]', function(e){
			e.preventDefault();
		});

		var waypoint = new Waypoint({
			element: $('header')[0],
			handler:stickyNav
		});
		
	
		$(document).on("click", '*[data-toggle="collapse"]', function(e){
			var id =  $(this).attr('href') || $(this).data('target');
			if(!$(this).hasClass('collapsed')) scrollToElement(id);
		});

		$('.modal').on('show.bs.modal', centerModal);

		$(window).on('resize orientationchange', resize).trigger('resize');

		$(window).on("hashchange", checkHash).trigger("hashchange");
	}

	return {
		init:init,
		getViewWidth:function(){return viewWidth},
		getViewHeight:function(){return viewHeight}
	}
}();

$(Main.init);