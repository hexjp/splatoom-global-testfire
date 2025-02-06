var tb = (isWiiU || isAndroid || isiPhone || isiPad);
var ytPlayer = [];
var ytData = [
	{
		id: 'KSepR8Cl47w',
		area: 'background',
		view: 'movie01-img'
	}, {
		id: 'bvlR33zVtOw',
		area: 'background-sea',
		view: 'movie02-img'
	}, {
		id: 'myUGlDNbRaI',
		area: 'background-player',
		view: 'movie03-img'
	}
];
var ytReady = [false, false, false];
var ytPlayFlg = [false, false, false];

if(!tb) {
	// APIの読み込み
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// プレーヤーの埋め込み
	function onYouTubeIframeAPIReady() {
		for(var i = 0; i < ytData.length; i++) {
			ytPlayer[i] = new YT.Player(ytData[i]['area'], {
				videoId: ytData[i]['id'],
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
	}

	// YouTubeの準備完了後
	function onPlayerReady(e) {
		for (var i = 0; i < ytData.length; i++) {
			if(e.target.getIframe().id == ytData[i]['area']) {
				ytReady[i] = true;
			}
		};
		e.target.setPlaybackQuality('hd720');
	}

	// 再生完了後
	function onPlayerStateChange(e) {
		var ytStatus = e.target.getPlayerState();
		var curNum;
		for (var i = 0; i < ytData.length; i++) {
			if(e.target.getIframe().id == ytData[i]['area']) {
				curNum = i;
			}
		};
		if(ytStatus == 1 && !ytPlayFlg[curNum]) {
			ytPlayFlg[curNum] = true;
		}
		if (ytStatus == YT.PlayerState.ENDED) {
			e.target.playVideo();
		}
	}
} else {
	var tbData = [
		['background', 'images/tb_slide_paint', 3],
		['background-sea', 'images/tb_slide_sea', 5],
		['background-player', 'images/tb_slide_player', 4]
	];
	for(var i = 0; i < tbData.length; i++) {
		var tbBg = document.getElementById(tbData[i][0]);
		var ul = document.createElement('ul');
		for (var j = 0; j < tbData[i][2]; j++) {
			var li = document.createElement('li');
			var images = document.createElement('img');
			images.src = tbData[i][1] + (j + 1) + '.jpg';
			ul.appendChild(li).appendChild(images);
		};
		tbBg.appendChild(ul);
	}
}


$(function() {
	$(window).on('load', function() {
		if($('#bgmbtn').children().length) {
			changeBgm('start');
		}
	});

	if(!tb) {
		// YouTubeの準備ができたか確認
		$(window).on('load', function() {
			for (var i = 0; i < ytData.length; i++) {
				ytReadyCheck(i);
			};
		});
		function ytReadyCheck(num) {
			if(ytReady[num]) {
				ytPlayer[num].playVideo();
				ytPlayFlgCheck(num);
			} else {
				setTimeout(function() {
					ytReadyCheck(num);
				}, 200);
			}
		}
		function ytPlayFlgCheck(num) {
			if(ytPlayFlg[num]) {
				$('#' + ytData[num]['view'] + '').fadeOut(300);
			} else {
				setTimeout(function() {
					ytPlayFlgCheck(num);
				}, 100);
			}
		}

	} else {

		var visMinTime = 2500;
		var visMinTimeFlg = false;
		// メインビジュアルの最低表示時間の監視
		setTimeout(function() {
			visMinTimeFlg = true;
		}, visMinTime);

		// YouTubeの準備ができたか確認
		$(window).on('load', function() {
			tbReadyCheck();
		});
		function tbReadyCheck() {
			if(visMinTimeFlg) {
				$('#movie01-img').fadeOut(500);
				$('#movie02-img').fadeOut(500);
				$('#movie03-img').fadeOut(500);
				for(var i = 0; i < tbData.length; i++) {
					$('#' + tbData[i][0]).tbSlide();
				}
			} else {
				setTimeout(tbReadyCheck, 200);
			}
		}
	}

	if((underIE8 || tb)) {
		$('#ink_green > div').show();
		$('#ink_pink > div').show();
		$('#page-ttl > span').show();
		$('#chara01 > div').show();
	}

	$('#ink_green').ink({
		delay: 150
	});
	$('#ink_pink').ink({
		delay: 500
	});
	$('#page-ttl').grText({
		delay: 660
	});

	$('#chara01').battleGirl({
		point: 0,
		width: 590,
		height: 814,
		moveX: 400,
		moveX2: -10,
		delay: 250,
		speed: 250,
		easing: 'easeOutQuad'
	});

	$('#paint-ttl').grText({
			point: 1100,
			speed: 200
	});
	$('#sea-ttl').grText({
			point: 1770,
			speed: 200
	});
	$('#player-ttl').grText({
			point: 2500,
			speed: 200
	});

	$('#chara02').nanimate({
		type: 'magnifyMove',
		moveX: -200,
		moveY: 50,
		speed: 200,
		easing: 'easeOutQuad'
	});
	$('#chara03').nanimate({
		type: 'magnifyMove',
		moveX: -300,
		speed: 250,
		easing: 'easeOutQuad'
	});

	$('#copy-text').grText({
		point: 2900
	});
	$('#chara04-text').ink({
		point: 2900,
		delay: 350
	});
	$('#chara04').nanimate({
		type: 'magnifyMove',
		point: 2900,
		moveX: 200,
		delay: 700,
		speed: 250,
		easing: 'easeOutQuad'
	});
});