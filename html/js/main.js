$(function(){

	// Catalogue
	$('.catnav-toggle').on('click', function(){
		$(this).parents('.catnav').toggleClass('catnav_active');
	});

	// Search
	$('.search-btn').on('click', function(){
		if (!$('#search').is('.search_active')) {
			$('#search').addClass('search_active');
			$('#search-input').focus();
			return false;
		}
	});
	$('.search-close-btn').on('click', function(){
		$('#search').removeClass('search_active');
		return false;
	});

	$(document).on('click', function(e){
		if(!$(e.target).parents('.search_active').length && !$(e.target).is('.search_active')){
			$('#search').removeClass('search_active');
		}
		if(!$(e.target).parents('.catnav_active').length && !$(e.target).is('.catnav_active')){
			$('.catnav').removeClass('catnav_active');
		}
	});

	// Spinner
	$('.spinner').spinner({
		min: 1,
		create: function(event, ui) {
			$('.ui-spinner-down').html('&ndash;');
			$('.ui-spinner-up').html('+');
		}
	});

	// Scrollbar width
	function scrollbarWidth() {
	    var $inner = $('<div style="width:100%;height:1px;"></div>'),
	        $outer = $('<div style="width:100px;height:1px;position:absolute;top:0;left:0;visibility:hidden;overflow:scroll;"></div>').append($inner);
	     
	    $('body').append($outer);
	    var width1 = $inner.width(),
	    	width2 = $outer.outerWidth();
	    $outer.remove();
	 
	    return (width2 - width1);
	}

	// Sidebar show/hide
	$('[data-sidebar]').on('click', function(){
		var $sidebar = $('#' + $(this).data('sidebar')),
			$sidebarToggle = $(this).parent('li'),
			$overlay = $('.overlay');

		if ($sidebarToggle.is('.active')) {
			$sidebarToggle.removeClass('active');
			$sidebar.hide();
			$overlay.hide();
			$('body').
				css('margin-right', 0).
				removeClass('overlayed');
			$('.search').css('right', 0);
		} else {
			if ($overlay.is(':visible')) {
				$sidebarToggle.parents('.primary').find('li.active').removeClass('active');
				$overlay.children(':visible').hide();
			} else {
				$('body').
					css('margin-right', scrollbarWidth()).
					addClass('overlayed');
				$('.search').css('right', scrollbarWidth());
				$overlay.show();
			}
			$sidebarToggle.addClass('active');
			$sidebar.show();
		}
		return false;
	});

	$('.overlay').on('click', function(e){
		if (!$(e.target).parents('.overlay').length) {
			$('[data-sidebar]').parent('.active').removeClass('active');
			$(this).children(':visible').hide();
			$('.overlay').hide();
			$('body').
				css('margin-right', 0).
				removeClass('overlayed');
			$('.search').css('right', 0);
		}
	});

	// Promo
	$('.promo-item').css('display', 'block');
	$('.promo').owlCarousel({
	    loop: true,
	    autoWidth: true,
	    navRewind: false,
	    dots: false,
	    autoplay: true,
	    autoplaySpeed: 500
	});

	// Promo 2
	$('.promo2-item').css('display', 'block');
	$('.promo2').owlCarousel({
	    loop: true,
	    autoWidth: true,
	    navRewind: false,
	    dots: false,
	    autoplay: true,
	    autoplaySpeed: 500
	});

	// Brands slider
	$('.brands-slider').owlCarousel({
	    loop: true,
	    items: 8,
	    navRewind: false,
	    dots: false,
	    autoplay: true,
	    autoplaySpeed: 500,
	    responsive: {
	        0: {
	            items: 8
	        },
	        1468: {
	            items: 10
	        },
	        1736: {
	            items: 12
	        }
	    }
	});

	// Custom scrollbar
	$('.sidebar').mCustomScrollbar({
		scrollbarPosition: 'outside',
		scrollInertia: 0
	});

	// Sidebar up btn
	$('.sidebar-up-btn').on('click', function(){
		var $sidebar = $(this).parents('.sidebar');

		$sidebar.mCustomScrollbar('scrollTo', 'top', {
			scrollInertia: 300
		});
		return false;
	});

	// Order toggle
	$('.order-toggle').on('click', function(){
		var $order = $(this).parents('.order');

		if ($order.is('.order_open')) {
			$(this).text('развернуть');
		} else {
			$(this).text('свернуть');
		}
		$order.toggleClass('order_open');
	});

	// Catalogue filter
	$('.catalogue-filter-caption').on('click', function(){
		$(this).parents('.catalogue-filter').toggleClass('catalogue-filter_open');
	});

	// Catalogue price slider
	$('.priceslider-holder').each(function(){
		var $pSlider = $(this).find('.priceslider'),
			$pSliderMin = $(this).find('.priceslider-min-value'),
			$pSliderMax = $(this).find('.priceslider-max-value'),
			minValue = $pSlider.data('min'),
			maxValue = $pSlider.data('max');

		$pSlider.slider({
			range: true,
			min: minValue,
			max: maxValue,
			step: $pSlider.data('step'),
			values: [$pSlider.data('min'), $pSlider.data('max')]
		});
		$pSliderMin.val($pSlider.data('min'));
		$pSliderMax.val($pSlider.data('max'));
		$pSlider.on('slide', function(event, ui){
			$pSliderMin.val(ui.values[0]);
			$pSliderMax.val(ui.values[1]);
		});

		$pSliderMin.on('change', function(){
			var min = $pSliderMin.val() * 1,
				max = $pSliderMax.val() * 1;

			if (min > maxValue) {
				$pSlider.slider('values', [maxValue, maxValue]);
			} else if (min < minValue) {
				$pSlider.slider('values', 0, minValue);
			} else if (min > max) {
				$pSlider.slider('values', [min, min]);
				$pSliderMax.val(min);
			} else {
				$pSlider.slider('values', 0, min);
			}
		});
		$pSliderMax.on('change', function(){
			var min = $pSliderMin.val() * 1,
				max = $pSliderMax.val() * 1;

			if (max < minValue) {
				$pSlider.slider('values', [minValue, minValue]);
			} else if (max > maxValue) {
				$pSlider.slider('values', 1, maxValue);
			} else if (max < min) {
				$pSlider.slider('values', [max, max]);
				$pSliderMin.val(max);
			} else {
				$pSlider.slider('values', 1, max);
			}
		});
	});

	// Chosen / Custom select
	$('.chosen').chosen({
		width: '100%',
		display_selected_options: false,
		no_results_text: "Ничего не найдено"
	});

	// Item photos carousel
	$('.item-photo').css('display', 'block');
	$('.item-photos').owlCarousel({
	    loop: true,
	    center: true,
	    autoWidth: true,
	    nav: true,
	    navText: ['',''],
	    autoplay: true,
	    autoplaySpeed: 500
	});

	// Popup
	$('[data-popup]').on('click', function(){
		var $popup = $('#' + $(this).data('popup'));
		var popup_art = $(this).attr("data-popup-art");
		var data_url = $(this).attr("data-url");
		
		$.get("/api/fastview.html?art="+popup_art+"&data_url="+data_url, function(data_html)
		{
			$popup.html(data_html);
			
			if ($('.popup').is(':visible')) {
				$('.popup:visible').hide();
			} else {
				$('body').
					css('margin-right', scrollbarWidth()).
					addClass('overlayed');
				$('.search').css('right', scrollbarWidth());
				$('.popup-overlay').show();
			}
			if ($popup.outerHeight() > $(window).height() - 60) {
				$popup.css({
					'top': 30,
					'margin-top': 0
				});
			} else {
				$popup.css({
					'top': '50%',
					'margin-top': -$popup.outerHeight()/2
				});
			}
			$popup.css('display', 'block');
			if ($popup.has('.fastview-photos:not(.owl-carousel)').length) {
				var $carousel = $popup.find('.fastview-photos:not(.owl-carousel)');

				// Fast view photos carousel
				$carousel.find('.fastview-photo').css('display', 'block');
				$carousel.owlCarousel({
					items: 1,
					loop: true,
					nav: true,
					navText: ['',''],
					dots: false
				});
			}
					
			$('.popup-close-btn').on('click', function(){
				popupClose();
			});
		});

		return false;
	});

	function popupClose() {
		$('.popup').hide();
		$('.popup-overlay').hide();
		$('body').
			css('margin-right', 0).
			removeClass('overlayed');
		$('.search').css('right', 0);
		return false;
	}

	$('.popup-close-btn').on('click', function(){
		popupClose();
	});

	$('.popup-overlay').on('click', function(e){
		if(!$(e.target).parents('.popup-overlay').length){
			popupClose();
		}
	});

	$(".header-logo").click(function()
	{
		$(window).attr("location", "http://test.domfarfora.ru/");
	});
});