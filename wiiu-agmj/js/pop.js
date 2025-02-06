function lightBox(number) {
	$('body').css('position', 'relative').append('<div id="coverLayer"></div><div id="modal"></div>');

	$('#modal').append('<iframe id="popInner" scrolling="no" frameborder="0" allowtransparency="true" src="' + number + '"></iframe>');
	$('#modal iframe').load(function() {
		var modalWidth = $(this).contents().width() + 'px';
		var modalHeight = $(this).contents().height() + 'px';
		$(this).css({
			width: modalWidth,
			height: modalHeight 
		});
		$('#modal').css({
			width: modalWidth,
			height: modalHeight
		})
		if ($('a[href="' + number + '"]').hasClass('lb-fix-bottom')) {
			$('#modal').css({
				top: $(window).scrollTop() + $(window).height() - $('#modal').height(),
				marginLeft: - $('#modal').width() / 2
			});
		} else if ($(window).height() >= $('#modal').height()) {
			$('#modal').css({
				top: $(window).scrollTop() + ($(window).height() / 2) - ($('#modal').height() / 2),
				marginLeft: - $('#modal').width() / 2
			});
		} else {
			$('#modal').css({
				top: $(window).scrollTop() + 10,
				marginLeft: - $('#modal').width() / 2
			});
		}
		$('#coverLayer').css({
			height: $(document).height()
		});
	});

	$('#coverLayer').fadeIn();
	$('#modal').fadeIn();
}

$(function() {

	var pngTarget = '#slide-course img, #pop-close img, #pop-prev img, #pop-next img';
	if(ieVersion==7 || ieVersion==8){
		$(pngTarget).each(function(){
			$(this).css({'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+this.src+'", sizingMethod="scale")'});
		});
	}

	if( !(is3DS) ){
		 $('.lightBox').click(function() {
			lightBox($(this).attr('href'));
//			changeBgm('off');
		 	return false;
		 });

		$(document).on('click', '#coverLayer', function() {
			if(ieVersion == 9) {
				$('#modal iframe').contents().find('object').remove();
			}
			$('#coverLayer').remove();
			$('#modal').html('').remove();
//			changeBgm('on');
		});

		$('#pop-close a').click(function() {
			if(ieVersion == 9) {
				$('object').remove();
			}
//			window.parent.changeBgm('on');
			$('#coverLayer' ,parent.document).remove();
			$('#modal' ,parent.document).html('').remove();
			return false;
		});
	}
});