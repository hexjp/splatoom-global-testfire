var tb = (isWiiU || isAndroid || isiPhone || isiPad);
var ytReady = false;
var visMinTime = 2500;
var tbVisMinTimeFlg = false;
var ytPlayFlg = false;
var ytPlayer;
var scArea = ['first-view', 'battle', 'transform', 'fashion', 'hero', 'twitter'];
var scPoint = [];
var cookiePeriod = 1; // cookieの有効期限
var cookieDomain = location.host; // cookieの有効ドメイン

if(!tb) {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var ytArea = 'visual-movie';
	var ytID = 'Sc6h6JNhYro';

	function onYouTubeIframeAPIReady() {
		ytPlayer = new YT.Player(ytArea, {
			videoId: ytID,
			playerVars: {
				rel: 0,
				controls: 0,
				showinfo: 0,
				wmode: 'transparent'
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	function onPlayerReady(e) {
		ytReady = true;
		ytPlayer.setPlaybackQuality('hd720');
	}

	function onPlayerStateChange(e) {
		var ytStatus = e.target.getPlayerState();
		if(ytStatus == 1 && !ytPlayFlg) {
			ytPlayFlg = true;
		}
		if (ytStatus == YT.PlayerState.ENDED) {
			ytPlayer.playVideo();
		}
	}
} else {
	var tbBg = document.getElementById('visual-movie');
	var ul = document.createElement('ul');
	for (var i = 0; i < 20; i++) {
		var li = document.createElement('li');
		var images = document.createElement('img');
		images.src = 'images/tb_slide' + (i + 1) + '.jpg';
		ul.appendChild(li).appendChild(images);
	};
	tbBg.appendChild(ul);
}

var onmMinH = 720;
$(function(){
	// first view height
	function adjust() {
		var winW = $(window).width();
		var winH = $(window).height();
		if(winH <= onmMinH) {
			winH = onmMinH;
		}
		$('#first-view').css({
			height: winH
		})
	}
	adjust();

	// visualAdjust
	var visRatioW = 1400;
	var visRatioH = 788;
	function visualAdjust() {
		var winW = $(window).width();
		var winH = $(window).height();
		var visW = winW;
		var visH = Math.floor(visRatioH * (visW / visRatioW));
		if (visH < winH) {
			var visH = winH;
			var visW = Math.floor(visRatioW * (visH / visRatioH));
		};
		$('#first-visual').css({
			width: visW,
			height: visH,
			top: (winH - visH) / 2,
			left: (winW - visW) / 2
		})
		if($('#first-visual').children('img').length) {
			$('#first-visual img').css({
				width: visW,
				height: visH
			})
		}
	}
	visualAdjust();

	$(window).on('load resize', function() {
		adjust();
		visualAdjust();
	});


	// get scroll point
	function scrollDataGet() {
		for (var i = 0; i < scArea.length; i++) {
			scPoint[i] = $('#' + scArea[i]).offset().top + ($('#' + scArea[i]).outerHeight() / 2);
		};
	}
	scrollDataGet();

	$(window).on('load resize', function() {
		scrollDataGet();
	});

	$('#scroll').css({
		cursor: 'pointer'
	})
	$(document).on('click', '#scroll', function() {
		var windowHeight = $(window).height(),
		windowScrolltop = $(window).scrollTop(),
		scrollBottom = windowHeight + windowScrolltop,
		scrollMiddle = windowHeight / 2 + windowScrolltop;
		$('html,body').not(':animated').animate({
			scrollTop: scPoint[1] - (windowHeight / 2)
		}, 600, 'easeOutSine');
	});

	if(!tb) {
		$('#mainvisual-wrap1').addClass('movie-net');
		$('#mainvisual-wrap2, #mainvisual-wrap3, #mainvisual-wrap4').css({
			background: 'none'
		})

		// animation init
		inkInit('#ink01', '');
		inkInit('#ink02', '');
		inkInit('#ink03', '');
		grTextInit('#copy', '');
		grTextInit('#logo', '');
		if(!underIE8) {
			$('#top-gnavi ul').css({
				right: -200
			});
		}
		inkInit('.battle-ink', '');
		splitTextInit('#battle-ttl', '')
		inkInit('.transform-ink', '');
		splitTextInit('#transform-ttl', '')
		grTextInit('.transform-img02', '')
		inkInit('.fashion-ink', '');
		splitTextInit('#fashion-ttl', '')
		inkInit('.hero-ink', '');
		inkInit('.hero-ink2', '');
		splitTextInit('#hero-ttl', '')

		// YouTube size adjust
		$('#visual-movie').css({
			'min-width': 0,
			'min-height': 0,
		})
		var ytRatioW = 16;
		var ytRatioH = 9;
		function youtubeAdjust() {
			var winW = $(window).width();
			var winH = $(window).height();
			var ytW = winW;
			var ytH = Math.floor(ytRatioH * (ytW / ytRatioW));
			if (ytH < winH) {
				var ytH = winH;
				var ytW = Math.floor(ytRatioW * (ytH / ytRatioH));
			};
			$('#visual-movie').css({
				width: ytW,
				height: ytH,
				top: (winH - ytH) / 2,
				left: (winW - ytW) / 2
			})
			if($('#visual-movie').children('img').length) {
				$('#visual-movie img').css({
					width: ytW,
					height: ytH
				})
			}
		}
		youtubeAdjust();

		$(window).on('load resize', function() {
			youtubeAdjust();
		});

		// Loading
		if($('#bgmbtn').children().length && $.cookie('agmjAcs') == undefined) {
			// add cookie
			$.cookie('agmjAcs', 'on', {
				expires: cookiePeriod,
				domain: cookieDomain
			});
			var loadingFlg = false;
			var loadingTimeFlg = false;
			$('#loading').css({
				height: $(document).height()
			});
			$('#loading .loading-inner').delay(1000).fadeIn(500, function() {
				setTimeout(function() {
					loadingAnime();
				}, 400);
			});

			function loadingAnime() {
				$('#loading .loadingtext').fadeOut(350).fadeIn(350);
				if(loadingFlg && loadingTimeFlg) {
					$('#loading').fadeOut(function() {
						inkAnime('#ink01', '', '', '');
						inkAnime('#ink02', '', 260, '');
						inkAnime('#ink03', '', 520, '');
						grTextAnime('#copy', '', '', '', 800, '', '')
						grTextAnime('#logo', '', '', '', 1200, '', '')
						if(!underIE8) {
							$('#top-gnavi ul').animate({
								right: 0
							}, 300, 'easeOutQuad');
						}
					});
					changeBgm('start');
					// min view time
					setTimeout(function() {
						ytReadyCheck();
					}, visMinTime);
				} else {
					setTimeout(loadingAnime, 1000);
				}
			}
			setTimeout(function() {
				loadingTimeFlg = true;
			}, 1500 + 2000);
			$(window).on('load', function() {
				loadingFlg = true;
			});

		} else {
			$('#loading').hide();

			$(window).on('load', function() {
				inkAnime('#ink01', '', '', '');
				inkAnime('#ink02', '', 260, '');
				inkAnime('#ink03', '', 520, '');
				grTextAnime('#copy', '', '', '', 800, '', '')
				grTextAnime('#logo', '', '', '', 1200, '', '')
				if(!underIE8) {
					$('#top-gnavi ul').animate({
						right: 0
					}, 300, 'easeOutQuad');
				}
				if($('#bgmbtn').children().length) {
					changeBgm('start');
				}
				// min view time
				setTimeout(function() {
					ytReadyCheck();
				}, visMinTime);
			});

		}

		// YouTube ready check
		function ytReadyCheck() {
			if(ytReady) {
				ytPlayer.playVideo();
				ytPlayFlgCheck();
			} else {
				setTimeout(ytReadyCheck, 200);
			}
		}
		function ytPlayFlgCheck() {
			if(ytPlayFlg) {
				$('#first-visual').fadeOut(300);
			} else {
				setTimeout(ytPlayFlgCheck, 100);
			}
		}

		var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		var scCounter = 0;
		var scTimer = null;
		var scIndex;
		$(document).on(mousewheelevent, function(e) {
			if(
				!$('.ncommon-ghdr-menu-content-wrapper').hasClass('is-opened-menu') &&
				!$('body').hasClass('alps-is-open-account')
			){
				e.preventDefault();
				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);

				var windowHeight = $(window).height(),
				windowScrolltop = $(window).scrollTop(),
				scrollBottom = windowHeight + windowScrolltop,
				scrollMiddle = windowHeight / 2 + windowScrolltop;

				// under
				if (delta < 0){
					if(windowHeight + windowScrolltop < onmMinH) {
						scrSet = onmMinH - windowHeight
					} else {
						for (var i = 1; i < scPoint.length; i++) {
							if(scPoint[i] > scrollMiddle + 5) {
								scrSet = scPoint[i] - (windowHeight / 2);
								scIndex = i;
								break;
							}
							if(i >= scPoint.length - 1) {
								scrSet = windowScrolltop + 210;
							}
						};
					}
				// over
				} else {
					for (var i = scPoint.length - 1; i >= 0; i--) {
						if(scPoint[i] < scrollMiddle) {
							scrSet = scPoint[i] - (windowHeight / 2);
							if(i == 0) {
								scrSet = 0;
							}
							scIndex = i;
							break;
						}
						if(i <= 0) {
							scrSet = windowScrolltop - 210;
						}
					};
				}

				$('html,body').not(':animated').animate({
					scrollTop: scrSet
				}, 600, 'easeOutSine', function() {
//					if(scIndex > 0 && scIndex < 5) {
//						splitTextAnime('#' + scArea[scIndex] + '-ttl', '', '', '', '', '', '');
//					}
				});
				return false;
			}
		});

		$(window).on('load resize', function() {
			if($(window).width() <= 960) {
				$('#top-gnavi').css({
					width: $(window).width()
				})
			} else {
				$('#top-gnavi').css({
					width: '100%'
				})
			}
		});

		$(window).on('load resize scroll', function() {
			var windowHeight = $(window).height(),
			windowScrolltop = $(window).scrollTop(),
			scrollBottom = windowHeight + windowScrolltop,
			scrollMiddle = windowHeight / 2 + windowScrolltop;
			for (var i = 1; i < 5; i++) {
				if(scPoint[i] < scrollMiddle + 10) {
					if(scArea[i] == 'hero') {
						inkAnime('.hero-ink', '', '', '');
						inkAnime('.hero-ink2', '', 260, '');
						splitTextAnime('#hero-ttl', '', '', '', 520, '', '');
					} else if(scArea[i] == 'transform') {
						inkAnime('.transform-ink', '', '', '');
						grTextAnime('.transform-img02', '', '', '', 260, '', '')
						splitTextAnime('#transform-ttl', '', '', '', 520, '', '');
					} else {
						inkAnime('.' + scArea[i] + '-ink', '', '', '');
						splitTextAnime('#' + scArea[i] + '-ttl', '', '', '', 260, '', '');
					}
				}

			};
		});

		for (var i = 1; i < 6; i++) {
			if($('#gnav-ink0' + i).length) {
				if(!underIE8) {
					inkInit('#gnav-ink0' + i, '');
				} else {
					gnavInkInit('#gnav-ink0' + i, '');
				}
			}
		};
		$(document).on('mouseenter', '#top-gnavi li a', function() {
			var tgtInd = $(this).parent().index();
			if(tgtInd < 5) {
				gnavInkAnime('#gnav-ink0' + (tgtInd + 1));
			}
		});
		$(document).on('mouseleave', '#top-gnavi li a', function() {
			var tgtInd2 = $(this).parent().index();
			if(tgtInd2 < 5) {
				gnavInkInit('#gnav-ink0' + (tgtInd2 + 1));
			}
		});

	} else {
		$('#loading').hide();

		// min view time
		setTimeout(function() {
			tbVisMinTimeFlg = true;
		}, visMinTime);

		// YouTube ready check
		$(window).on('load', function() {
			tbReadyCheck();
		});
		function tbReadyCheck() {
			if(tbVisMinTimeFlg) {
				$('#first-visual').fadeOut(500);
				$('#visual-movie').tbSlide();
			} else {
				setTimeout(tbReadyCheck, 200);
			}
		}

		// animation gif size adjust
		$('#visual-movie').css({
			'min-width': 0,
			'min-height': 0,
			'position': 'absolute'
		})
		var aniRatioW = 1920;
		var aniRatioH = 1080;
		function aniGifAdjust() {
			var winW = $(window).width();
			var onmH = $('#first-view').height();
			var aniW = winW;
			var aniH = Math.floor(aniRatioH * (aniW / aniRatioW));
			if (aniH < onmH) {
				var aniH = onmH;
				var aniW = Math.floor(aniRatioW * (aniH / aniRatioH));
			};
			$('#visual-movie').css({
				width: aniW,
				height: aniH,
				top: (onmH - aniH) / 2,
				left: (winW - aniW) / 2
			})
			if($('#visual-movie').children('ul').length) {
				$('#visual-movie ul, #visual-movie li, #visual-movie img').css({
					width: aniW,
					height: aniH
				})
			}
		}
		aniGifAdjust();

		$(window).on('load resize', function() {
			aniGifAdjust();
		});

	}

});


