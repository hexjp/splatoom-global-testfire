var isIE6 = (navigator.userAgent.indexOf('MSIE 6.0') > -1) && (navigator.userAgent.indexOf('Opera') == -1),
	isIE = (navigator.userAgent.indexOf('MSIE') > -1) && (navigator.userAgent.indexOf('Opera') == -1),
	isMobile = (navigator.userAgent.indexOf('Mobile') > -1) && (navigator.userAgent.indexOf('iPad') == -1 ),
	isWiiU = (navigator.userAgent.indexOf('WiiU') > -1),
	isWii = (navigator.userAgent.indexOf('Wii') > -1) && (navigator.userAgent.indexOf('WiiU') == -1),
	isDS = (navigator.userAgent.indexOf('Nintendo DS') > -1),
	is3DS = (navigator.userAgent.indexOf('Nintendo 3DS') > -1),
	isAndroid = (navigator.userAgent.indexOf('Android') > -1),
	isiPhone = (navigator.userAgent.indexOf('iPhone') > -1 ),
	isiPad = (navigator.userAgent.indexOf('iPad') > -1 );

var ieVersion = 0;
if(isIE){
    var ver = navigator.appVersion.match(/msie ([0-9]+)/i);
    if(ver){
        ieVersion = ver[1]-0;
    }
}
var underIE8 = (ieVersion == 8) || (ieVersion == 7) || (ieVersion == 6);
var underIE7 = (ieVersion == 7) || (ieVersion == 6);
var tb = (isWiiU || isAndroid || isiPhone || isiPad);
$(function () {

	if(!isiPad && !isiPhone && !isAndroid && !is3DS && !isWiiU){
		$(document).on('mouseenter', 'img[src *= "_off"]', function() {
			$(this).attr('src', this.src.replace('_off','_on'));
		});
		$(document).on('mouseleave', 'img[src *= "_on"]', function() {
			$(this).attr('src', this.src.replace('_on','_off'));
		});

		for (var i = 1; i < 6; i++) {
			if($('#gnink0' + i).length) {
				if(!underIE8) {
					inkInit('#gnink0' + i, '');
				} else {
					gnavInkInit2('#gnink0' + i, '');
				}
			}
		};
		$(document).on('mouseenter', '#header li a', function() {
			var tgtInd = $(this).parent().index();
			gnavInkAnime2('#gnink0' + (tgtInd + 1));
		});
		$(document).on('mouseleave', '#header li a', function() {
			var tgtInd2 = $(this).parent().index();
			gnavInkInit2('#gnink0' + (tgtInd2 + 1));
		});
	} else {
		$('.gnav-ink').hide();
		$('.gnink').hide();
	}

	// JSフラグをON
//    $('body.no-js').addClass('js').removeClass('no-js');

	//ページ内リンク
	$('a[href^=#]:not(.scroll-no)').click(function(){
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, 550, "swing");
		return false;
	});



});


function newWindow(url,n,w,h){
	if( isWii || isDS || is3DS){
		location.href = url;
	} else {
		if(ieVersion == 8){
			(window.open(url,n,"width=" + w + ", height=" + h + ", menubar=yes, toolbar=no, scrollbars=yes, resizable=yes"));
			return false;
		} else {
			(window.open(url,n,"width=" + w + ", height=" + h + ", menubar=yes, toolbar=no, scrollbars=yes, resizable=yes")).focus();
			return false;
		}
	}
}

function closeLink(href) {
	if( isWii || isDS || is3DS){
		location.href = href;
	} else 	if(!window.opener || window.opener.closed){
		return false;
	} else {
		self.window.close();
		return false;
	}
}


function popLink(href) {
	if( isWii || isDS || is3DS){
		location.href = href;
	} else 	if(!window.opener || window.opener.closed){
		location.href = href;
	} else {
		self.window.close();
		window.opener.location.href = href;
	}
}


// --------------------------------------------------------------------------
// ie7-8 透過png対応
// --------------------------------------------------------------------------
$(function () {

	var pngTarget = '.footer-top img';
	if(ieVersion==7 || ieVersion==8){
		$(pngTarget).each(function(){
			$(this).css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.src+'", sizingMethod="scale")'});
		});
	}
});


// --------------------------------------------------------------------------
// アニメーション関連
// --------------------------------------------------------------------------
(function($) {
	$.fn.nanimate = function(options) {

		var elements = this;
		var defaults = {
			type: 'magnifyMove',
			point: elements.offset().top + elements.find('img').height(),
			ratio: 1,
			moveX: 0,
			moveY: 0,
			speed: 500,
			fadeSpeed: 300,
			delay: 0,
			direction: 'left',
			easing: 'swing',
			callback: ''
		};
		var setting = $.extend(defaults, options);

		if(!(underIE8 || tb)) {
			if(setting.type == 'magnifyMove') {
				elements.addClass('nanimate');
				elements.children().show();
				var posTop = parseFloat(elements.css('top'));
				var posLeft = parseFloat(elements.css('left'));
				var imgWidth = elements.find('img').width();
				var imgHeight = elements.find('img').height();
				elements.css({
					top: posTop + setting.moveY,
					left: posLeft + setting.moveX,
					width: imgWidth,
					height: imgHeight
				}).children().hide().children().css({
					position: 'absolute',
					top: (imgHeight - imgHeight * setting.ratio) * 0.5,
					left: (imgWidth - imgWidth * setting.ratio) * 0.5,
					width: imgWidth * setting.ratio,
					height: imgHeight * setting.ratio
				});

				$(window).on('load resize scroll',function() {
					var winHeight = $(window).height();
					var scrollTop = $(window).scrollTop();
					var windowEnd = winHeight + scrollTop;
					if(windowEnd > setting.point && elements.hasClass('nanimate')) {
						elements.removeClass('nanimate');
						elements.delay(setting.delay).animate({
							top: posTop,
							left: posLeft
						}, setting.speed, setting.easing);
						elements.children().delay(setting.delay).fadeIn(setting.fadeSpeed);
						elements.find('img').delay(setting.delay).animate({
							top: 0,
							left: 0,
							width: imgWidth,
							height: imgHeight
						}, setting.speed, setting.easing, setting.callback);
					}
				});
			}

			if(setting.type == 'sprangOut') {
				elements.addClass('nanimate');
				var imgWidth = elements.find('img').width();
				var imgHeight = elements.find('img').height();
				elements.css({
					width: imgWidth,
					height: imgHeight,
					overflow: 'hidden'
				}).children().hide().children().css({
					position: 'absolute',
					top: setting.moveY,
					left: setting.moveX
				});

				$(window).on('load resize scroll',function() {
					var winHeight = $(window).height();
					var scrollTop = $(window).scrollTop();
					var windowEnd = winHeight + scrollTop;
					if(windowEnd > setting.point && elements.hasClass('nanimate')) {
						elements.removeClass('nanimate');
						elements.children().delay(setting.delay).fadeIn(setting.fadeSpeed);
						elements.find('img').delay(setting.delay).animate({
							top: 0,
							left: 0
						}, setting.speed, setting.easing, setting.callback);
					}
				});
			}

			if(setting.type == 'turnUp') {
				elements.addClass('nanimate');
				var imgWidth = elements.find('img').width();
				var imgHeight = elements.find('img').height();
				elements.css({
					width: imgWidth,
					height: imgHeight
				}).children().css({
					position: 'absolute',
					overflow: 'hidden'
				});
				var direction = setting.direction;
				switch(direction){
					case 'top':
						elements.children().css({
							width: imgWidth,
							height: 0,
							top: 0
						});
					break;
					case 'right':
						elements.children().css({
							width: 0,
							height: imgHeight,
							right: 0
						}).children('img').css({
							position: 'absolute',
							right: 0
						});
					break;
					case 'bottom':
						elements.children().css({
							width: imgWidth,
							height: 0,
							bottom: 0
						}).children('img').css({
							position: 'absolute',
							bottom: 0
						});
					break;
					case 'left':
						elements.children().css({
							width: 0,
							height: imgHeight,
							left: 0
						});
					break;
					default:
					break;
				}

				$(window).on('load resize scroll',function() {
					var winHeight = $(window).height();
					var scrollTop = $(window).scrollTop();
					var windowEnd = winHeight + scrollTop;
					if(windowEnd > setting.point && elements.hasClass('nanimate')) {
						elements.removeClass('nanimate');
						var imgWidth = elements.find('img').width();
						var imgHeight = elements.find('img').height();
						var direction = setting.direction;
						switch(direction){
							case 'top':
								elements.children().delay(setting.delay).animate({
									height: imgHeight
								}, setting.speed, setting.easing, setting.callback);
							break;
							case 'right':
								elements.children().delay(setting.delay).animate({
									width: imgWidth
								}, setting.speed, setting.easing, setting.callback);
							break;
							case 'bottom':
								elements.children().delay(setting.delay).animate({
									height: imgHeight
								}, setting.speed, setting.easing, setting.callback);
							break;
							case 'left':
								elements.children().delay(setting.delay).animate({
									width: imgWidth
								}, setting.speed, setting.easing, setting.callback);
							break;
							default:
							break;
						}
					}
				});
			}
		}
	}
})(jQuery);

(function($) {
	$.fn.ink = function(options) {
		var elements = this;
		var defaults = {
			point: elements.offset().top + elements.find('img').height(),
//			ratio: 1.4,
			ratio: 2,
			speed: 170,
			delay: 0,
			easing: 'easeOutBack'
		};
		var setting = $.extend(defaults, options);

		if(!(underIE8 || tb)) {
			elements.addClass('ani-ink');
			elements.children().show();
			var imgWidth = elements.find('img').width();
			var imgHeight = elements.find('img').height();
			elements.css({
				width: imgWidth,
				height: imgHeight
			}).children().hide().children().css({
				position: 'absolute',
				top: (imgHeight - imgHeight * setting.ratio) * 0.5,
				left: (imgWidth - imgWidth * setting.ratio) * 0.5,
				width: imgWidth * setting.ratio,
				height: imgHeight * setting.ratio
			});

			$(window).on('load scroll',function() {
				var winHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var windowEnd = winHeight + scrollTop;
				if(windowEnd > setting.point && elements.hasClass('ani-ink')) {
					elements.removeClass('ani-ink');
					setTimeout(function() {
						elements.children().show();
					}, setting.delay);
					elements.find('img').delay(setting.delay).animate({
						top: 0,
						left: 0,
						width: imgWidth,
						height: imgHeight
					}, setting.speed, setting.easing);
				}
			});
		}
	}
})(jQuery);

(function($) {
	$.fn.grText = function(options) {
		var elements = this;
		var defaults = {
			point: elements.offset().top + elements.find('img').height(),
//			ratio: 1.6,
			ratio: 2,
			ratio2: 0.9,
			speed: 140,
			speed2: 70,
			delay: 0,
			easing: 'easeOutQuad',
			easing2: 'easeInQuad'
		};
		var setting = $.extend(defaults, options);

		if(!(underIE8 || tb)) {
			elements.addClass('ani-grText');
			elements.children().show();
			var imgWidth = elements.find('img').width();
			var imgHeight = elements.find('img').height();
			elements.css({
				width: imgWidth,
				height: imgHeight
			}).children().hide().children().css({
				position: 'absolute',
				top: (imgHeight - imgHeight * setting.ratio) * 0.5,
				left: (imgWidth - imgWidth * setting.ratio) * 0.5,
				width: imgWidth * setting.ratio,
				height: imgHeight * setting.ratio
			});

			$(window).on('load scroll',function() {
				var winHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var windowEnd = winHeight + scrollTop;
				if(windowEnd > setting.point && elements.hasClass('ani-grText')) {
					elements.removeClass('ani-grText');
					setTimeout(function() {
						elements.children().show();
					}, setting.delay);
					elements.find('img').delay(setting.delay).animate({
						top: (imgHeight - imgHeight * setting.ratio2) * 0.5,
						left: (imgWidth - imgWidth * setting.ratio2) * 0.5,
						width: imgWidth * setting.ratio2,
						height: imgHeight * setting.ratio2
					}, setting.speed, setting.easing, function() {
						elements.find('img').animate({
							top: 0,
							left: 0,
							width: imgWidth,
							height: imgHeight
						}, setting.speed2, setting.easing2);
					});
				}
			});
		}
	}
})(jQuery);



(function($) {
	$.fn.solo = function(options) {

		var elements = this;
		var defaults = {
			point: elements.offset().top + elements.find('img').height(),
			ratio: 1.4,
			ratio2: 0.8,
			speed: 100,
			speed2: 60,
			fadeSpeed: 30,
			delay: 0,
			direction: 'left',
			easing: 'easeOutQuad',
			easing2: 'easeInQuad'
		};
		var setting = $.extend(defaults, options);

		if(!(underIE8 || tb)) {
			elements.addClass('ani-solo');
			elements.children().show();
			var imgWidth = elements.find('img').width();
			var imgHeight = elements.find('img').height();
			elements.css({
				width: imgWidth,
				height: imgHeight
			}).children().hide().children().css({
				position: 'absolute',
				top: (imgHeight - imgHeight * setting.ratio) * 0.5,
				left: (imgWidth - imgWidth * setting.ratio) * 0.5,
				width: imgWidth * setting.ratio,
				height: imgHeight * setting.ratio
			});

			$(window).on('load scroll',function() {
				var winHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var windowEnd = winHeight + scrollTop;
				if(windowEnd > setting.point && elements.hasClass('ani-solo')) {
					elements.removeClass('ani-solo');
					setTimeout(function() {
						elements.children().show();
					}, setting.delay);
					elements.find('img').delay(setting.delay).animate({
						top: (imgHeight - imgHeight * setting.ratio2) * 0.5,
						left: (imgWidth - imgWidth * setting.ratio2) * 0.5,
						width: imgWidth * setting.ratio2,
						height: imgHeight * setting.ratio2
					}, setting.speed, setting.easing, function() {
						elements.find('img').animate({
							top: 0,
							left: 0,
							width: imgWidth,
							height: imgHeight
						}, setting.speed2, setting.easing2);
					});
				}
			});
		}
	}
})(jQuery);


function inkInit(target, ratio) {
	if(!(underIE8 || tb)) {
		var inkTarget = $(target);
		var inkRatio;
		if(ratio == '') {
//			inkRatio = 1.4;
			inkRatio = 2;
		} else {
			inkRatio = ratio;
		}
		inkTarget.children().show();
		var imgWidth = inkTarget.find('img').width();
		var imgHeight = inkTarget.find('img').height();
		inkTarget.css({
			width: imgWidth,
			height: imgHeight
		}).children().hide().children().css({
			position: 'absolute',
			top: (imgHeight - imgHeight * inkRatio) * 0.5,
			left: (imgWidth - imgWidth * inkRatio) * 0.5,
			width: imgWidth * inkRatio,
			height: imgHeight * inkRatio
		});
	}
}

function inkAnime(target, speed, delay, easing) {
	if(!(underIE8 || tb)) {
		var inkTarget = $(target);
		var inkSpeed, inkDelay, inkEasing;
		if(speed == '') {
			inkSpeed = 170;
		} else {
			inkSpeed = speed;
		}
		if(delay == '') {
			inkDelay = 0;
		} else {
			inkDelay = delay;
		}
		if(easing == '') {
			inkEasing = 'easeOutBack';
		} else {
			inkEasing = easing;
		}
		var imgWidth = inkTarget.width();
		var imgHeight = inkTarget.height();

		setTimeout(function() {
			inkTarget.children().show();
		}, inkDelay);
		inkTarget.find('img').delay(inkDelay).animate({
			top: 0,
			left: 0,
			width: imgWidth,
			height: imgHeight
		}, inkSpeed, inkEasing);
	}
}


function gnavInkInit(target) {
	var inkTarget = $(target);
	if(!(underIE8 || tb)) {
		var inkRatio = 2;
		var imgWidth = 175;
		var imgHeight = 51;
		inkTarget.stop(true, true).animate({
			width: imgWidth,
			height: imgHeight
		}, 20);
		inkTarget.children().hide();
		inkTarget.children().children().stop(true, true).animate({
			position: 'absolute',
			top: (imgHeight - imgHeight * inkRatio) * 0.5,
			left: (imgWidth - imgWidth * inkRatio) * 0.5,
			width: imgWidth * inkRatio,
			height: imgHeight * inkRatio
		}, 20);
	} else {
		inkTarget.children().hide();
	}
}

function gnavInkAnime(target) {
	var inkTarget = $(target);
	if(!(underIE8 || tb)) {
		var inkSpeed = 170;
		var inkDelay = 0;
		var inkEasing = 'easeOutBack';
		var imgWidth = 175;
		var imgHeight = 51;

		inkTarget.children().show();
		inkTarget.find('img').stop(true, true).animate({
			top: 0,
			left: 0,
			width: imgWidth,
			height: imgHeight
		}, inkSpeed, inkEasing);
	} else {
		inkTarget.children().show();
	}
}


function gnavInkInit2(target) {
	var inkTarget = $(target);
	if(!(underIE8 || tb)) {
		var inkRatio = 2;
		var imgWidth = 150;
		var imgHeight = 85;
		inkTarget.stop(true, true).animate({
			width: imgWidth,
			height: imgHeight
		}, 20);
		inkTarget.children().hide();
		inkTarget.children().children().stop(true, true).animate({
			position: 'absolute',
			top: (imgHeight - imgHeight * inkRatio) * 0.5,
			left: (imgWidth - imgWidth * inkRatio) * 0.5,
			width: imgWidth * inkRatio,
			height: imgHeight * inkRatio
		}, 20);
	} else {
		inkTarget.children().hide();
	}
}

function gnavInkAnime2(target) {
	var inkTarget = $(target);
	if(!(underIE8 || tb)) {
		var inkSpeed = 170;
		var inkDelay = 0;
		var inkEasing = 'easeOutBack';
		var imgWidth = 150;
		var imgHeight = 85;

		inkTarget.children().show();
		inkTarget.find('img').stop(true, true).animate({
			top: 0,
			left: 0,
			width: imgWidth,
			height: imgHeight
		}, inkSpeed, inkEasing);
	} else {
		inkTarget.children().show();
	}
}


function grTextInit(target, ratio) {
	if(!(underIE8 || tb)) {
		var grTextTarget = $(target);
		var grTextRatio;
		if(ratio == '') {
//			grTextRatio = 1.4;
			grTextRatio = 4;
		} else {
			grTextRatio = ratio;
		}
		grTextTarget.children().show();
		var imgWidth = grTextTarget.find('img').width();
		var imgHeight = grTextTarget.find('img').height();

		grTextTarget.css({
			width: imgWidth,
			height: imgHeight
		}).children().hide().children().css({
			position: 'absolute',
			top: (imgHeight - imgHeight * grTextRatio) * 0.5,
			left: (imgWidth - imgWidth * grTextRatio) * 0.5,
			width: imgWidth * grTextRatio,
			height: imgHeight * grTextRatio
		});
	}
}

function grTextAnime(target, ratio2, speed, speed2, delay, easing, easing2) {
	if(!(underIE8 || tb)) {
		var grTextTarget = $(target);
		var grTextRatio2, grTextSpeed, grTextSpeed2, grTextDelay, grTextEasing, grTextEasing2;
		if(ratio2 == '') {
			grTextRatio2 = 0.9;
		} else {
			grTextRatio2 = ratio2;
		}
		if(speed == '') {
			grTextSpeed = 140;
		} else {
			grTextSpeed = speed;
		}
		if(speed2 == '') {
			grTextSpeed2 = 70;
		} else {
			grTextSpeed2 = speed2;
		}
		if(delay == '') {
			grTextDelay = 0;
		} else {
			grTextDelay = delay;
		}
		if(easing == '') {
			grTextEasing = 'easeOutQuad';
		} else {
			grTextEasing = easing;
		}
		if(easing2 == '') {
			grTextEasing2 = 'easeInQuad';
		} else {
			grTextEasing2 = easing2;
		}
		var imgWidth = grTextTarget.width();
		var imgHeight = grTextTarget.height();

		setTimeout(function() {
			grTextTarget.children().show();
		}, grTextDelay);
		grTextTarget.find('img').delay(grTextDelay).animate({
			top: (imgHeight - imgHeight * grTextRatio2) * 0.5,
			left: (imgWidth - imgWidth * grTextRatio2) * 0.5,
			width: imgWidth * grTextRatio2,
			height: imgHeight * grTextRatio2
		}, grTextSpeed, grTextEasing, function() {
			grTextTarget.find('img').animate({
				top: 0,
				left: 0,
				width: imgWidth,
				height: imgHeight
			}, grTextSpeed2, grTextEasing2);
		});
	}
}



function splitTextInit(target, ratio) {
	if(!(underIE8 || tb)) {
		var splitTextTarget = $(target);
		var splitTextRatio;
		if(ratio == '') {
			splitTextRatio = 1.4;
		} else {
			splitTextRatio = ratio;
		}

		splitTextTarget.children().each(function(e) {
			splitTextTarget.children().eq(e).children().show();
			var imgWidth = splitTextTarget.children().eq(e).find('img').width();
			var imgHeight = splitTextTarget.children().eq(e).find('img').height();

			splitTextTarget.children().eq(e).addClass('ani-solo');
			splitTextTarget.children().eq(e).css({
				width: imgWidth,
				height: imgHeight
			}).children().hide().children().css({
				position: 'absolute',
				top: (imgHeight - imgHeight * splitTextRatio) * 0.5,
				left: (imgWidth - imgWidth * splitTextRatio) * 0.5,
				width: imgWidth * splitTextRatio,
				height: imgHeight * splitTextRatio
			});
		})
	}
}

function splitTextAnime(target, ratio2, speed, speed2, delay, easing, easing2) {
	if(!(underIE8 || tb)) {
		var splitTextTarget = $(target);
		var splitTextRatio2, splitTextSpeed, splitTextSpeed2, splitTextDelay, splitTextEasing, splitTextEasing2;
		if(ratio2 == '') {
			splitTextRatio2 = 0.8;
		} else {
			splitTextRatio2 = ratio2;
		}
		if(speed == '') {
			splitTextSpeed = 100;
		} else {
			splitTextSpeed = speed;
		}
		if(speed2 == '') {
			splitTextSpeed2 = 60;
		} else {
			splitTextSpeed2 = speed2;
		}
		if(delay == '') {
			splitTextDelay = 0;
		} else {
			splitTextDelay = delay;
		}
		if(easing == '') {
			splitTextEasing = 'easeOutQuad';
		} else {
			splitTextEasing = easing;
		}
		if(easing2 == '') {
			splitTextEasing2 = 'easeInQuad';
		} else {
			splitTextEasing2 = easing2;
		}

		splitTextTarget.children().each(function(e) {
			if(splitTextTarget.children().eq(e).hasClass('ani-solo')) {
				splitTextTarget.children().eq(e).removeClass('ani-solo');
				var imgWidth = splitTextTarget.children().eq(e).width();
				var imgHeight = splitTextTarget.children().eq(e).height();

				setTimeout(function() {
					splitTextTarget.children().eq(e).children().show();
				}, splitTextDelay + (e * 40));
				splitTextTarget.children().eq(e).find('img').delay(splitTextDelay + (e * 40)).animate({
					top: (imgHeight - imgHeight * splitTextRatio2) * 0.5,
					left: (imgWidth - imgWidth * splitTextRatio2) * 0.5,
					width: imgWidth * splitTextRatio2,
					height: imgHeight * splitTextRatio2
				}, splitTextSpeed, splitTextEasing, function() {
					$(this).animate({
						top: 0,
						left: 0,
						width: imgWidth,
						height: imgHeight
					}, splitTextSpeed2, splitTextEasing2, function() {
					});
				});
			}
		})
	}
}





(function($) {
	$.fn.battleGirl = function(options) {

		var elements = this;
		var defaults = {
			point: elements.offset().top + elements.find('img').height(),
			width: 0,
			height: 0,
			ratio: 1,
			moveX: 0,
			moveY: 0,
			moveX2: 0,
			moveY2: 0,
			speed: 500,
			speed2: 20,
			fadeSpeed: 300,
			delay: 0,
			direction: 'left',
			easing: 'swing',
			easing2: 'easeInQuad',
			callback: ''
		};
		var setting = $.extend(defaults, options);

		if(!(underIE8 || tb)) {
			elements.addClass('battleGirl');
			elements.children().show();
			var posTop = parseFloat(elements.css('top'));
			var posLeft = parseFloat(elements.css('left'));
			var imgWidth = setting.width;
			var imgHeight = setting.height;
			elements.css({
				top: posTop + setting.moveY,
				left: posLeft + setting.moveX,
				width: imgWidth,
				height: imgHeight
			}).children().hide().children().css({
				position: 'absolute',
				top: (imgHeight - imgHeight * setting.ratio) * 0.5,
				left: (imgWidth - imgWidth * setting.ratio) * 0.5,
				width: imgWidth * setting.ratio,
				height: imgHeight * setting.ratio
			});

			$(window).on('load resize scroll',function() {
				var winHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var windowEnd = winHeight + scrollTop;
				if(windowEnd > setting.point && elements.hasClass('battleGirl')) {
					elements.removeClass('battleGirl');
					elements.delay(setting.delay).animate({
						top: posTop + setting.moveY2,
						left: posLeft + setting.moveX2
					}, setting.speed, setting.easing, function() {
						elements.animate({
							top: posTop,
							left: posLeft
						}, setting.speed2, setting.easing2, setting.callback);
					});
					elements.children().delay(setting.delay).fadeIn(setting.fadeSpeed);
					elements.children().children().delay(setting.delay).animate({
						top: 0,
						left: 0,
						width: imgWidth,
						height: imgHeight
					}, setting.speed, setting.easing);
				}
			});
		}
	}
})(jQuery);


(function($) {
	$.fn.tbSlide = function(options) {

		var elements = this;
		var defaults = {
			speed: 1500
		};
		var setting = $.extend(defaults, options);

		var tbSlideLength = elements.find('li').length;
		elements.find('li:not(:first)').hide();
		function changeSlide() {
			var tbCurrentIndex = elements.find('li:visible').index();
			if(tbCurrentIndex < tbSlideLength - 1) {
				elements.find('li').eq(tbCurrentIndex).fadeOut(500);
				elements.find('li').eq(tbCurrentIndex + 1).fadeIn(500);
			} else {
				elements.find('li:last-child').fadeOut(500);
				elements.find('li:first-child').fadeIn(500);
			}
			setTimeout(changeSlide, setting.speed);
		}
		setTimeout(function() {
			changeSlide();
		}, setting.speed);
	}
})(jQuery);