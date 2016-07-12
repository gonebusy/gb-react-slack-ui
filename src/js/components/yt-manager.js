module.exports = function(){



	function loadVideo(container, videoId, callback) {

		if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

			window.onYouTubeIframeAPIReady = function() {
				loadPlayer(container, videoId, callback);
			};

			$.getScript('//www.youtube.com/iframe_api');
		
		} else {

			loadPlayer(container, videoId, callback);
		}
	}

	function loadPlayer(container, videoId, callback) {
		var player = new YT.Player(container, {
			videoId: videoId,
			width: 356,
			height: 200,
			playerVars: {
				autoplay: !$('html').hasClass('no-video-autoplay'),
				controls: 1,
				modestbranding: 1,
				rel: 0,
				showInfo: 0
			}
		});

		callback.apply(this, [player])
	}

	return {
		loadVideo:loadVideo
	}
}();