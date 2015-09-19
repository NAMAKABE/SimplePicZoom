$(function() {

	$('head').append('<style>.zoom-bg{background:url(images/bg3.png);width:100%;height:100%;position:fixed;top:0}.zoom-loading{drop-shadow:4px 4px 10px #bfbfbf;border-radius:5px;width:100px;height:100px;background:#4a565f;position: absolute}.zoom-close{position:absolute;top:-20px;right:-20px;width:32px;height:32px;background:url(images/login-close.png) no-repeat;cursor:pointer}</style>');
	$.fn.extend({



		zoom: function(options) {

			var defaults = {
					innerPadding: 10,
					outerPadding: 30,
					time: 300,
					fadeTime: 300,
					slide: false,
					selector: 'body'
				},
				options = $.extend({}, defaults, options);
			var t = selector = $(this);

			if (typeof(t) === 'object' && t.length > 0 && t.attr('image-source') != '' || false) {
				t.on('click', function() {

					var t = $(this);

					function animateA(oWidth, oHeight) {
						if (true) {
							if (oWidth / oHeight >= $(window).width() / $(window).height()) {
								if ($(window).width() >= oWidth + options.outerPadding * 2 + options.innerPadding * 2) {
									vWidth = oWidth;
									vHeight = oHeight;
								} else {
									vWidth = $(window).width() - (options.outerPadding + options.innerPadding) * 2;
									vHeight = vWidth * oHeight / oWidth;
								}
							} else {
								if ($(window).height() >= oHeight + options.outerPadding * 2 + options.innerPadding * 2) {
									vWidth = oWidth;
									vHeight = oHeight;
								} else {
									vHeight = $(window).height() - (options.outerPadding + options.innerPadding) * 2;
									vWidth = vHeight * oWidth / oHeight;
								}
							}
						}

						$('.zoom-bg .zoom-loading').css('background-image', 'none').children('img').stop().animate({
							'width': vWidth,
							'height': vHeight
						}, options.time);

						$('.zoom-bg .zoom-loading').css({
							'padding': options.innerPadding,
							'width': 'auto',
							'height': 'auto'
						}).stop().animate({
							'left': ($(window).width() - (vWidth + options.innerPadding * 2)) / 2,
							'top': ($(window).height() - (vHeight + options.innerPadding * 2)) / 2
						}, options.time)
						console.log($(window).width() - (vWidth + options.innerPadding * 2))
					}

					$('body').append('<div class="zoom-bg" />');
					$('.zoom-bg').append('<div class="zoom-loading" style="background:#fff url(images/loading.gif) 50% no-repeat;left:' + ($(window).width() - 100) / 2 + 'px;top:' + ($(window).height() - 100) / 2 + 'px;" />')
					$('.zoom-bg .zoom-loading').append('<img class="zoom-image" style="width:0;height:0;" /><div class="zoom-close" />');
					$('.zoom-close').on('click', function() {
						$('.zoom-bg').fadeOut(options.fadeTime, function() {
							$(this).remove();
						})
					})
					var source = t.attr('image-source');
					var vWidth, vHeight;
					var img = new Image();
					img.onload = function() {
						var oWidth = img.width,
							oHeight = img.height;
						$('.zoom-image').attr('src', source);
						// else {
						// 	if ($(window).height() >= oHeight + options.outerPadding * 2 + options.innerPadding * 2) {
						// 		vWidth = oWidth;
						// 		vHeight = oHeight;
						// 	} else {
						// 		vHeight = $(window).height() - (options.outerPadding + options.innerPadding) * 2;
						// 		vWidth = vHeight * oWidth / oHeight;
						// 	}
						// }
						animateA(oWidth, oHeight);
						$(window).resize(function(event) {
							/* Act on the event */
							animateA(oWidth, oHeight)
						});
					}
					img.src = source;
					// slide :
					if (options.slide) {
						var globalIndex = t.index('' + options.selector + ' ' + selector.selector + '');
						if (selector.length == 1) {
							// do nothing
						} else {
							$('.zoom-loading').append('<a class="t-left" style="position: absolute; left:' + options.innerPadding + 'px; top:50%;width:92px;height:40px;line-height:40px;text-align:center;font-size:14px;background:#fff;">上一张</a><a class="t-right" style="position: absolute; right:' + options.innerPadding + 'px; top:50%;width:92px;height:40px;line-height:40px;text-align:center;font-size:14px;background:#fff;">下一张</a>');

							function ifStartOrEnd() {
								$('.t-left,.t-right').show();
								if (globalIndex == 0) {
									$('.t-left').hide();
								} else if (globalIndex == selector.length - 1) {
									$('.t-right').hide();
								} else {
									$('.loading-cover').remove();
									$('.zoom-loading').prepend('<div class="loading-cover" style="display:none;background:url(images/loading.gif) center no-repeat;width:100%;height:100%;position:absolute;top:0;left:0;" />')
								}
							}
							ifStartOrEnd();

							function dealLoading() {
								var vWidth, vHeight;
								var img = new Image();
								source = selector.eq(globalIndex).attr('image-source');
								$('.loading-cover').show();
								img.onload = function() {
									var oWidth = img.width,
										oHeight = img.height;
									$('.zoom-image').attr('src', source);
									animateA(oWidth, oHeight);
									$('.loading-cover').hide();
									$(window).resize(function(event) {
										/* Act on the event */
										animateA(oWidth, oHeight)
									});
								}
								img.src = source;
							}

							$('.t-left').on('click', function() {
								// selector.eq(globalIndex - 1)
								globalIndex--;
								ifStartOrEnd();
								dealLoading();
							})
							$('.t-right').on('click', function() {
								// selector.eq(globalIndex - 1)
								globalIndex++;
								ifStartOrEnd();
								dealLoading();
							})
						}
					}
					return false;
				})
			}
		}
	});
})
alert(1);