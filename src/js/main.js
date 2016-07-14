var YTManager = require('./components/yt-manager');
var Bootstrap = require('bootstrap');
var Validator = require("bootstrap-validator")
var Waypoints = require('waypoints');
var Prism = require('prismjs');
var CSSPlugin = require('gsap-css-plugin');
var EasePack = require('gsap-ease-pack');
var ScrollToPlugin = require('gsap-scroll-to-plugin');
var SplitText = require('gsap-split-text');
var Header = require('./components/header');

Prism.languages.ruby = {
	'comment': /#[^\r\n]*(\r?\n|$)/g,
	'string': /("|')(\\?.)*?\1/g,
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
		lookbehind: true
	},
	'keyword': /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
  'builtin': /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
	'boolean': /\b(true|false)\b/g,
	'number': /\b-?(0x)?\d*\.?\d+\b/g,
	'operator': /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
  'inst-var': /[@&]\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  'symbol': /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  'const': /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[{}[\];(),.:]/g
};

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