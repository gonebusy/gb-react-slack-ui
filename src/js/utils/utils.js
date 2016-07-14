

module.exports = function(){


	function radiansToDegrees(radians) {
		return radians * 180 / Math.PI
	}


	function degreesToRadians(deg) {
		return deg * Math.PI/180;
	}

	function random(min, max) {
		if(max){
			return Math.random() * (max - min) + min;
		} else {
			return Math.random() * min;
		}
	}


	function rect(x, y, w, h) {
		return [{x: x, y: y},
				{x: x + w, y: y},
				{x: x + w, y: y + h},
				{x: x, y: y + h}];
	}

	function getDeviceType(){
		var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
		return deviceType;
	}

	function hasTouchEvents(){
		return(typeof(window.ontouchstart) !== 'undefined');
	}

	function serializeObject($el){
		var o = {};
		var a = $el.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};



	return {
		radiansToDegrees:radiansToDegrees,
		degreesToRadians:degreesToRadians,
		random:random,
		rect:rect,
		getDeviceType:getDeviceType,
		hasTouchEvents:hasTouchEvents,
		serializeObject:serializeObject
	}

}();

