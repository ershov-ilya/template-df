	function serviz_filter_init() {
		/* выплывание меню
		$(".serviz_filter_caption").click(function() {
			$(".serviz_filter").find(".serviz_filter_list").each(function() {
				if($(this).css("display") == "block") $(this).slideToggle( "slow" );
			});
			if($(this).parent().find(".serviz_filter_list").css("display") != "block") $(this).parent().find(".serviz_filter_list").slideToggle( "slow" );
		})
		*/
		$(".serviz_filter ul li a").click(function() { 
			$(this).toggleClass("toggle-active");
			
	//alert("toggle-active");
	
					//взято от кнопки применить $(".serviz_filter .filter_apply"
					var filter = $(this).parents(".serviz_filter").attr("id"); //alert (filter);
					var vals = "";
					
					$(this).parents(".serviz_filter").find("a").each(function() {
						
						if($(this).hasClass("toggle-active")) vals = vals + $(this).html() + ","; //alert("toggle-active");
						//update_filter();
					})
	
							console.log(vals.slice(0,-1));
					parseUrl(filter, vals.slice(0,-1));
	
		})

		$('.filter-group-label').on('click', function(){
			$(this).parents('.filter-column').toggleClass('filter-column_open');
								if($(this).parents('.filter-column').hasClass('filter-column_open'))
								{
										$(this).prev().val("block");
								}
								else
								{
										$(this).prev().val("none");
								}
		});
	
	}

	function serviz_menublocks_open() {
		var sp = location.href.split("?");
		if (sp[1]!== undefined)
		{
			var per = sp[1].split("&");		
			$.each(per, function(i, val)
			{
				if (val!='')
				{
					t_val = val.split("=");
					if (t_val[0]!== undefined)
						t_val1 = t_val[0].split("[]");
					if(t_val1 == 'brend' && t_val[1] != '') $("[data-pp='sbrend']").addClass("filter-column_open");
					if(t_val1 == 'spers' && t_val[1] != '') $("[data-pp='spers']").addClass("filter-column_open");
					if(t_val1 == 'stype' && t_val[1] != '') $("[data-pp='stype']").addClass("filter-column_open");
					if(t_val1 == 'decor' && t_val[1] != '') $("[data-pp='sdecor']").addClass("filter-column_open");
					
				}
			})

		}
	}


function decore_block_size()
{/* даёт блокам фильтра значения длины
    $(".serviz_filter_list").eq(-2).css("width","300px");
    $(".catalogue-filter-list").eq(-2).css("width","300px");
    $(".filter_apply").eq(-2).css("width","300px");
    */
}


var order={};
var total_sum="";

function calc_sum() {
    var sum=0;
    for (var key in order) {
        sum+=order[key].sum;
    }
}

function print_price(v) {
    return ((v*100)+'').replace(/(..)$/,',$1 р.')
}

function total_price_basket() {
    total_sum = 0;
    $("#in_sets .product-price-value").each(function(){
        total_sum +=parseFloat($(this).text());
    });
		
    return total_sum;
}
$(function(){

	$("#reset").attr("href", window.location.pathname);
	//$('#search').addClass('search_active');
	
	
	/*
	Dropdown with Multiple checkbox select with jQuery - May 27, 2013
	(c) 2013 @ElmahdiMahmoud
	license: http://www.opensource.org/licenses/mit-license.php
*/ 
/*
	Dropdown with Multiple checkbox select with jQuery - May 27, 2013
	(c) 2013 @ElmahdiMahmoud
	license: http://www.opensource.org/licenses/mit-license.php
*/ 

	serviz_filter_init();
	serviz_menublocks_open();
	
	
	$(".cart-footer .cart-discount a").click(function()
	{
		$a = $(this);
		$input = $(this).parent().find("input");
		
		$a.hide();
		$input.show();
        $(".product-remove-btn.discount").css("display","inline-block");
	});

	$("#order [name='delivery']").click(function()
	{
		if ($(this).val()==1)
		{
			$("#delivery-block").show();
			$("#delivery-block2").hide();			
		}
		else
		{
			$("#delivery-block2").show();			
			$("#delivery-block").hide();		
		}
	});
	
	$("[data-add-button]").on('click', function()
	{
		$(this).html("Добавлен в корзину");
	});	
	
	popupInit();

	if ( $("#prop-hidden-value").length )
	{
		var prop_value = $("#prop-hidden-value").val();
		if (prop_value!='')
		{
			if(window.location.href.indexOf("?") >= 0)
				var tail = window.location.href.slice(window.location.href.indexOf('?') + 1)
			else 
				var tail = '';
			$.post("/api/filter-generation.html.html"+tail, { prop:prop_value}, function(data)
			{
				$("#propOutput").html(data);
				
				filterOpener();
				
				$('.catalogue-filter-caption').on('click', function(){
					$(this).parents('.catalogue-filter').toggleClass('catalogue-filter_open');
                    if($(this).parents('.catalogue-filter').hasClass('catalogue-filter_open'))
                    {
                        $(this).prev().val("block");
                    }
                    else
                    {
                        $(this).prev().val("none");
                    }
				});
				
				init_filter();
			});
		}
	}


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
			////$('#search').removeClass('search_active');
		}
		if(!$(e.target).parents('.catnav_active').length && !$(e.target).is('.catnav_active')){
			//$('.catnav').removeClass('catnav_active');
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
	
	function spinnerUp()
	{
		var code = $(this).parent().parent().parent().attr("data-code");
		var count = $(this).parent().find("input").attr("aria-valuenow");
		
		$.get("/api/card/edit.html?code="+code+"&count="+count, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshPageCard();
		});
	}
	
	function spinnerDown()
	{
		var code = $(this).parent().parent().parent().attr("data-code");
		var count = $(this).parent().find("input").attr("aria-valuenow");
		
		$.get("/api/card/edit.html?code="+code+"&count="+count, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshPageCard();
		});
	}
	
	$(".ui-spinner-up").on("click", spinnerUp);	
	$(".ui-spinner-down").on("click", spinnerDown);
	
	$("#realCard .product-remove-btn").on("click", function()
	{
		var code = $(this).parent().attr("data-code");
		$(this).parent().remove();
		
		$.get("/api/card/delete.html?code="+code, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshPageCard();
		});
		return false;
	});



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
        if($(this).parents('.catalogue-filter').hasClass('catalogue-filter_open'))
        {
            $(this).prev().val("block");
        }
        else
        {
            $(this).prev().val("none");
        }
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
	/*$('.chosen').chosen({
		width: '100%',
		display_selected_options: false,
		no_results_text: "Ничего не найдено"
	});*/

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

	$(".header-logo").click(function()
	{
		$(window).attr("location", "http://www.domfarfora.ru/");
	});
	
	// Spinner
	$('.spinner2').spinner({
		min: 1,
		create: function(event, ui) {
			$('.ui-spinner-down').html('&ndash;');
			$('.ui-spinner-up').html('+');
		}
	});	
	
	
	if ($('.spinner2').length)
		setRefresh();	
	
	if ($(".sidebar-products-item .product-remove-btn").length)
	$(".sidebar-products-item .product-remove-btn").on("click", function()
	{
		var code = $(this).parent().attr("data-code");
		$(this).parent().remove();
		
		$.get("/api/card/delete.html?code="+code, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshCard();
			refreshPageCard();
		});
		return false;
	});
});

function update_filter() {
    var arr = [];
    $(".catalogue-filter").each(function(i){
        arr[i] = $('input:first', this).val();
    })
	console.log(arr); //alert(arr);
	if ( $("#prop-hidden-value").length )
	{
		var prop_value = $("#prop-hidden-value").val();
		if (prop_value!='')
		{
			$.post("/api/filter-generation.html.html"+window.location.href.slice(window.location.href.indexOf('?') + 1), { prop:prop_value}, function(data)
			{
				$("#propOutput").html(data);
                $(".catalogue-filter").each(function(i){
                    $('input:first', this).val(arr[i]);
                });
				filterOpener();
				$('.catalogue-filter-caption').on('click', function(){
					$(this).parents('.catalogue-filter').toggleClass('catalogue-filter_open');
                    if($(this).parents('.catalogue-filter').hasClass('catalogue-filter_open'))
                    {
                        $(this).prev().val("block");
                    }
                    else
                    {
                        $(this).prev().val("none");
                    }
				});
				
				init_filter();
			});
		}
	}
	$(".catalogue-filter").click();
}
function del_out_set(obj)
{
	$new_item = $(obj).parent().parent().clone();
	$count = $("#out_sets .cart-item").length;

	$new_item.find(".product-remove-btn").remove();
	
	var price = $new_item.find(".product-price-per-item span").html();
	$new_item.find(".product-price-per-item").remove();
	$new_item.find(".product-counter").remove();
	
	$new_item.find(".product-price .product-price-value").html(price);
	$new_item.find(".product-info").after('<br><div class="product-counter"><button class="btn-default" onclick="add_in_set('+$count+');">Добавить</button></div><br>');
	//$new_item.find(".product-info").after('<br><div align=" class="product-counter""><button class="btn-default" onclick="add_in_set('+$count+');">Добавить</button></div><br>');
	
	
	$("#out_sets .cart-item:last").after("<div class='cart-item'>" + $new_item.html() + "</div>");
	
	$(obj).parent().parent().animate({opacity: 0}, 1000, function(){$(this).hide();setRefresh();});
}

function del_int_set(i, obj)
{
	var data_i = i;	
	$("#out_sets .cart-item").eq(data_i).show();
	$("#out_sets .cart-item").eq(data_i).css("opacity", 1);
	$(obj).parent().parent().animate({opacity: 0}, 1000, function(){$(this).hide();setRefresh();});		
	return false;
}

function add_in_set(i)
{
	$html_item = $("#out_sets .cart-item").eq(i);
	$new_item = $html_item.clone();
	//$new_item.find("div[align='center']").html('<div class="product-counter"><input class="spinner2" type="text" value="1"></div>');
	$new_item.find(".product-counter").html('<input class="spinner2" type="text" value="1">');
	$new_item.find(".cart-product-body").after('<button class="product-remove-btn" onclick="del_int_set('+i+', this);"></button>');	
	
	var price = parseInt($new_item.find(".product-price-value").html());
	$new_item.find(".product-info").after('<div class="product-price-per-item"><span>'+price+'</span> за штуку</div>');
	$new_item.find("br").remove();	
	
	$("#out_sets .cart-item").eq(i).animate({opacity: 0}, 1000, function()
	{
		$(this).hide();
		$("#in_sets .cart-item:last").after("<div class='cart-item'>" + $new_item.html() + "</div>");
		
		$('.spinner2').spinner({
			min: 1,
			create: function(event, ui) {
				$('.ui-spinner-down').html('&ndash;');
				$('.ui-spinner-up').html('+');
			}
		});	
		setRefresh();
	});	
}

function addSetCard()
{
    $get_code = "";
    $get_count = "";
    $get_url = "";
    $url_ser = "";

	$("#in_sets .cart-item").map(function()
	{
		if ($(this).is(':visible'))
		{
			$exp = $(this).find(".product-article").html().split(" ");
			$code = $exp[1];		
			$count = $(this).find("input.spinner2").val();
			$price = parseInt($(this).find(".product-price-per-item span").html());
			$url = $(this).find(".cart-product").attr("data");
		
			$count = parseInt($count);
			$price = parseInt($price);

            if ($get_code=='')
                $get_code = $code;
            else
                $get_code = $get_code + "_" +$code;

            if ($get_count=='')
                $get_count = $count;
            else
                $get_count = $get_count + "_" +$count;

            if ($get_url=='')
                $get_url = $url;
            else
                $get_url = $get_url + "_" +$url;

            $url_ser = "&code="+$get_code+"&count="+$get_count+"&url="+$get_url;

		}
	});

    $.get("/api/card/add.html?type=serviz"+$url_ser, function(data)
    {
        $(".sidebar-cart").html(data);
        refreshCard();
        $(".btn-large").html("Добавлен в корзину");
    });

	return false;
}

function setRefresh()
{
	$("#in_sets .ui-spinner-up").click(setRefresh);
	$("#in_sets .ui-spinner-down").click(setRefresh);
	
	$("#out_sets .ui-spinner-up").click(setRefresh);
	$("#out_sets .ui-spinner-down").click(setRefresh);
	
	$total = 0;
	
	$("#in_sets .cart-item").map(function()
	{
		if ($(this).is(':visible'))
		{
			$exp = $(this).find(".product-article").html().split(" ");
			$code = $exp[1];		
			$count = $(this).find("input.spinner2").val();
			$price = parseInt($(this).find(".product-price-per-item span").html());
		
			$count = parseInt($count);
			$price = parseInt($price);
		
			$(this).find(".product-price-value").html($price*$count);
			$total = $total + ($count*$price);
		}
		
		$(".item-price-value").html($total);
	});	
}

function init_filter()
{
	$(".catalogue-filter-list li a").click(function()
	{		
		$(this).toggleClass("toggle-active"); //alert("------");
		getOption();
		update_filter();
	});	
}

var old_data = "";
var opts = {
	lines: 13, // The number of lines to draw
	length: 20, // The length of each line
	width: 10, // The line thickness
	radius: 30, // The radius of the inner circle
	scale: 1, // Scales overall size of the spinner
	corners: 1, // Corner roundness (0..1)
	rotate: 0, // The rotation offset
	direction: 1, // 1: clockwise, -1: counterclockwise
	color: '#fff', // #rgb or #rrggbb or array of colors
	speed: 1, // Rounds per second
	trail: 60, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: false, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent
	left: '50%' // Left position relative to parent
};

function getOption()
{
	if (old_data=='') old_data = $(".products").html();
	var href = $(location).attr("href");	
	var this_url = "&this_url="+href;
	var url = "";
	
	$(".toggle-active").map(function()
	{
		pp = $(this).parent().parent().parent().parent().attr("data-pp");
		
		if (pp=='brend') url = url + "&brend[]=" + $(this).html();
		else if (pp=='decor') url = url + "&decor[]=" + $(this).html();
		else url = url + "&f_"+pp+"[]=" + $(this).html();		
	});
	
	var a = href.split("?");
	var a_url = a[0]+"?"+url;
	
	if (a[1]!== undefined)
	{		
		$.each(a[1].split("&"), function(i, val)
		{
			var exp = val.split("=");			
			
			if (exp[0]=='in_stock') url = url + "&" + exp[0] + "=" + exp[1];
			if (exp[0]=='without_price') url = url + "&" + exp[0] + "=" + exp[1];
			if (exp[0]=='novelties') url = url + "&" + exp[0] + "=" + exp[1];
			if (exp[0]=='discounts') url = url + "&" + exp[0] + "=" + exp[1];
			if (exp[0]=='on_page') url = url + "&" + exp[0] + "=" + exp[1];
            if (exp[0]=='min_value') url = url + "&" + exp[0] + "=" + exp[1];
            if (exp[0]=='max_value') url = url + "&" + exp[0] + "=" + exp[1];
		});
	}
	
	var a_url = a[0]+"?"+url;


	window.history.pushState(null, null, a_url);	
	
	$('.popup-overlay').show();
	$("#spinner").show();
	
	var target = document.getElementById('spinner');
	var spinner = new Spinner(opts).spin(target);
	
	$.get(a_url, function(data)
	{
		var products = $(data).find(".products").html();	
		var pagination = $(data).find(".pagination").html();
		var sort = $(data).find("#all_total").html();
		
		$(".products").html(products);
		$(".pagination").html(pagination);
		$("#all_total").html(sort);		
		
		$('.popup-overlay').hide();
		$("#spinner").hide();
		
		popupInit();
	});
}

function refreshPageCard()
{
	if ($(".cart-item").length)
	{
		$.get("/account/korzina.html", function(data)
		{
			$(".container").html($(data).find(".container").html());
			refreshCard();
		});
	}	
}

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

function refreshCard()
{
	$.get("/api/card/refresh.html", function(data)
	{
		$(".sidebar-products").html(data);
		initAfterRefresh();
	});
}

function initAfterRefresh()
{
	// Spinner
	$('.spinner').spinner({
		min: 1,
		create: function(event, ui) {
			$('.ui-spinner-down').html('&ndash;');
			$('.ui-spinner-up').html('+');
		}
	});
	
	$(".ui-spinner-up").on("click", function()
	{
		var code = $(this).parent().parent().parent().attr("data-code");
		var count = $(this).parent().find("input").attr("aria-valuenow");
		
		$.get("/api/card/edit.html?code="+code+"&count="+count, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshCard();
			refreshPageCard();
		});
	});
	
	$(".ui-spinner-down").on("click", function()
	{
		var code = $(this).parent().parent().parent().attr("data-code");
		var count = $(this).parent().find("input").attr("aria-valuenow");
		
		$.get("/api/card/edit.html?code="+code+"&count="+count, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshCard();
			refreshPageCard();
		});
	});
	
	$(".sidebar-products-item .product-remove-btn").on("click", function()
	{
		var code = $(this).parent().attr("data-code");
		$(this).parent().remove();
		
		$.get("/api/card/delete.html?code="+code, function(data)
		{
			$(".sidebar-cart").html(data);
			refreshCard();
			refreshPageCard();
		});
		return false;
	});	
}


function addCard(code, url)	
{	
	$.post("/api/card/add.html?code="+code, { post_url:url }, function(data)
	{
		$(".sidebar-cart").html(data);
		refreshCard();
	});

	return false;
}

function popupInit()
{	
	$("#paginator1 span a").click(function()
	{
		parseUrl("page", $(this).html());
		return false;
	});

	// Popup
	$('[data-popup]').on('click', function()
	{	
		$this_data = $(this).attr("data-popup");	
		$this_code = $(this).attr("data-code");
		
		if ($this_data=='fastview-popup-price')
		{
			var $popup = $('#fastview-popup');
			
			$.get("/api/zapros-czenyi.html", function(data)
			{
				$popup.html(data);
				
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
				
				$popup.show();
				
				$price_query = $("#price_query");				
				$price_query.click(function()
				{
					$ajaxbox_name = $(".ajaxbox [name='name']");
					$ajaxbox_contact = $(".ajaxbox [name='contact']");
					
					if ($ajaxbox_name.val()=='')
						$ajaxbox_name.css("border", "1px solid red");
					else
						$ajaxbox_name.css("border", "0");

					if ($ajaxbox_contact.val()=='')
						$ajaxbox_contact.css("border", "1px solid red");
					else
						$ajaxbox_contact.css("border", "0");
					
					if ($ajaxbox_name.val()!='' && $ajaxbox_contact.val()!='')
					{
						$.post("/api/zapros-czenyi.html", { name: $ajaxbox_name.val(), contact: $ajaxbox_contact.val(), code: $this_code }, function()
						{
							$ajaxbox_name.val("");
							$ajaxbox_contact.val("");
						
							$popup.hide();	
							$('.popup-overlay').hide();							
						});
					}					
				});
				
			});			
			
			return false;
		}
		else
		{
			$("#spinner").hide();
			var $popup = $('#' + $(this).data('popup'));
			
			var popup_art = $(this).attr("data-popup-art");
			var data_url = $(this).attr("data-url");
			
			$.get("/api/fastview.html.html?art="+popup_art+"&data_url="+data_url, function(data_html)
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
				
				$("[data-add-button]").on('click', function()
				{
					$(this).html("Добавлен в корзину");
				});	
			});

			return false;
		}

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
}

function submit_order()
{
	$card = $('[name="discount_card"]');
	$card_number = $("#card_number");
	$card_number.val("");
	
	if ($card.val()!='')
	{
		$.get("/api/card/card-check.html?card="+$card.val(), function(data)
		{
			if (data=='ok')
			{
				$card_number.val($card.val());
				$(".container h2").html("Оформление заказа");
				$(".cart").hide();
				$(".cart-footer").hide();
				$("#order").show();
				return true;
			}				
			else
			{
				$card.val("Неверный номер карты");
				$card.css("color", "red");
				return false;
			}
		});
	}
	else
	{
		$(".container h2").html("Оформление заказа");
		$(".cart").hide();
		$(".cart-footer").hide();
		$("#order").show();
	}
}

function parseUrl(name, value)
{
	
	var sp = location.href.split("?");
	
	if (sp[1]!== undefined)
	{
		var per = sp[1].split("&");
		var outer = "";
		var replaced = 0;
		
		$.each(per, function(i, val)
		{
			t_val = val.split("=");
			if (t_val[0]==name)
			{
			t_val[1] = value;
					replaced = 1;
			}
			
			if (t_val[0]!='')
			outer = outer + "&" + t_val[0] + "=" + t_val[1];
		});
	
		if (replaced==0) outer = outer + "&" + name + "=" + value;
	}
	else
		outer = "&" + name + "=" + value;
	
	window.history.pushState(null, null, sp[0] + "?" + outer);	
	
	$('.popup-overlay').show();
	$("#spinner").show();
	
	var target = document.getElementById('spinner');
	var spinner = new Spinner(opts).spin(target);	
	
	$.get(sp[0] + "?" + outer, function(data)
	{
		var prod = $(data).find(".products").html();
		var pag = $(data).find(".pagination").html(); 
		var sort = $(data).find("#all_total").html();
		
		if ($(".filter").length)
		{
			var filter0 = $(data).find(".filter-column").eq(0).html();
			var filter1 = $(data).find(".filter-column").eq(1).html();
			var filter2 = $(data).find(".filter-column").eq(2).html();
			var filter3 = $(data).find(".filter-column").eq(3).html();
			
			$(".filter-column").eq(0).html(filter0);
			$(".filter-column").eq(1).html(filter1);
			$(".filter-column").eq(2).html(filter2);
			$(".filter-column").eq(3).html(filter3);
		}
		
		$(".products").html(prod);
		$(".pagination").html(pag);
		$("#all_total").html(sort);
		popupInit();
		
		$('.popup-overlay').hide();
		$("#spinner").hide();
		serviz_filter_init();
console.log("asd");
	$('.chosen').chosen({
		width: '100%',
		display_selected_options: false,
		no_results_text: "Ничего не найдено"
	});
	

      //  decore_block_size();
	});
	
}

$(document).ready(function()
{
    $(".product-remove-btn.discount").on("click",function(){
        $("input[name=discount_card]").val("");
    });
    $('.ui-spinner-input').bind('mousewheel DOMMouseScroll', function(e) {
        var scrollTo = null;

        if (e.type == 'mousewheel') {
            scrollTo = (e.originalEvent.wheelDelta * -1);
        }
        else if (e.type == 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
        }

        if (scrollTo) {
            e.preventDefault();
            $(this).scrollTop(scrollTo + $(this).scrollTop());
        }
    });

    $('.ui-spinner-input').on("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        var input=$(this),
            count=input.val(),
            price=parseFloat(input.closest(".cart-product").find('.product-price-per-item').text()),
            sum=parseInt(price*count);

        input.closest(".cart-product").find('.product-price-value').text(sum);

        calc_sum();
        $(".cart-total-price").text("Итого: "+total_price_basket());
				$(".item-price-value").html(total_price_basket());
    });

	$(".priceslider a").eq(0).mouseup(function()
	{
		var min_value = $(".priceslider-min-value").val();
		parseUrl("min_value", min_value);
	});
	
	$(".priceslider a").eq(1).mouseup(function()
	{
		var max_value = $(".priceslider-max-value").val();
		parseUrl("max_value", max_value);
	});
	
	$(".priceslider-min-value").on("input",function(e)
	{
		var min_value = $(this).val();
		parseUrl("min_value", min_value);
	});
	
	$(".priceslider-max-value").on("input",function(e)
	{
		var max_value = $(this).val();
		parseUrl("max_value", max_value);
	});
	
	price_init();

    decore_block_size();
});


function price_init()
{
	
		// Catalogue price slider
	$('.priceslider-holder').each(function(){
		var $pSlider = $(this).find('.priceslider'),
			$pSliderMin = $(this).find('.priceslider-min-value'),
			$pSliderMax = $(this).find('.priceslider-max-value'),
			minValue = $pSlider.data('min'),
			maxValue = $pSlider.data('max');

		if ($pSliderMin.attr("value")=='') $pSliderMin.attr("value",minValue);
		if ($pSliderMax.attr("value")=='') $pSliderMax.attr("value",maxValue);
			
		$pSlider.slider({
			range: true,
			min: minValue,
			max: maxValue,
			step: $pSlider.data('step'),
			values: [$pSliderMin.attr("value"), $pSliderMax.attr("value")]
		});
		
		$('.priceslider-min-value').val($pSliderMin.attr("value"));
		$('.priceslider-max-value').val($pSliderMax.attr("value"));
	});
	
	
}



//$("[data-pp='sbrend'] input:first").val("block");


function filterOpener()
{
	var sp = location.href.split("?");
	if (sp[1]!== undefined)
	{
		var per = sp[1].split("&");		
		
		$.each(per, function(i, val)
		{
			if (val!='')
			{
				t_val = val.split("=");
				if (t_val[0]!== undefined)
					t_val1 = t_val[0].split("[]");
				
				if (t_val1[0]!== undefined)
				{
					t_val2 = t_val1[0].split("_");
					if (t_val2[0]!== undefined)
					{
						if (t_val2[0]=='brend')
						{
							$("[data-pp='brend']").addClass("catalogue-filter_open");
                            $("[data-pp='brend'] input:first").val("block");
							$("[data-pp='brend'] a").map(function()
							{
								v_html = $(this).html();
								if (v_html==decodeURIComponent(t_val[1]))
									$(this).addClass("toggle-active");
							});
						}
						
						if (t_val2[0]=='decor')
						{
							$("[data-pp='decor']").addClass("catalogue-filter_open");
							$("[data-pp='decor'] input:first").val("block");
							$("[data-pp='decor'] a").map(function()
							{
								v_html = $(this).html();
								if (v_html==decodeURIComponent(t_val[1]))
									$(this).addClass("toggle-active");
							});
						}
						
						if (t_val2[0]=='f')
						{
							$("[data-pp='"+t_val2[1]+"']").addClass("catalogue-filter_open");
							$("[data-pp='"+t_val2[1]+"'] input:first").val("block");
							$("[data-pp='"+t_val2[1]+"'] a").map(function()
							{
								v_html = $(this).html();								
								if (v_html==decodeURIComponent(t_val[1]))
									$(this).addClass("toggle-active");
							});
						}
					}
				}
			}
		});
	}

    if( $("[data-pp='brend'] input:first").val() == "block")
    {
        $("[data-pp='brend']").addClass("catalogue-filter_open");
    }
    if( $("[data-pp='decor'] input:first").val() == "block")
    {
        $("[data-pp='decor']").addClass("catalogue-filter_open");
    }
    if( $("[data-pp='0'] input:first").val() == "block")
    {
        $("[data-pp='0']").addClass("catalogue-filter_open");
    }
    if( $("[data-pp='1'] input:first").val() == "block")
    {
        $("[data-pp='1']").addClass("catalogue-filter_open");
    }
//    if(url!== undefined)
//    {
//        if(url[1]!== undefined)
//        {
//            if(url[1].indexOf('brend') + 1) {
//                $("[data-pp='brend']").addClass("catalogue-filter_open");
//            }
//            if(url[1].indexOf('decor') + 1) {
//                $("[data-pp='decor']").addClass("catalogue-filter_open");
//            }
//            if(url[1].indexOf('f_0') + 1) {
//                $("[data-pp='0']").addClass("catalogue-filter_open");
//            }
//            if(url[1].indexOf('f_1') + 1) {
//                $("[data-pp='1']").addClass("catalogue-filter_open");
//            }
//        }
//    }
}

function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
	// 
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +	 bugfix by: Michael White (http://crestidg.com)

	var i, j, kw, kd, km;

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 2;
	}
	if( dec_point == undefined ){
		dec_point = ",";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	//kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


	return km + kw + kd;
}

$(document).ready(function () {

    $(document).on("click", ".im", function () {
        if ($(this).attr("src") != "") {
            $("#im").attr("src", $(this).attr("src"));
            $("#fixedblack").show().fadeTo(200, 1);
            $("#im").show().fadeTo(0.5, 1);
        }
    });

    $(document).on("click", "#fixedblack", function () {
        $("#im").hide();
        $("#fixedblack").stop(true).fadeTo(200, 0, function () {
            $("#fixedblack").hide();
        });
    });

});