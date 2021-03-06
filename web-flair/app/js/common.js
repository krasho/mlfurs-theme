$(function() {

	var clientWidth = document.body.clientWidth;

	

	$('.popup').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,

		showCloseBtn: true,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});


	$(".sccol__minus").click(function() {
		let count = $(this).parent().find(".sccol__input").val();

		if(count > 1 ) {
			count--;
			$(this).parent().find(".sccol__input").attr("value", count);
		}
	});

	$(".sccol__plus").click(function() {
		let count = $(this).parent().find(".sccol__input").val();
		
		count++;
		$(this).parent().find(".sccol__input").attr("value", count);
	});

	$('.dropdown-list').click(function () {
		$(this).toggleClass('dropdown-list_open');
	});

	$(document).mouseup(function (e){ 
		let div = $('.dropdown-list'); 
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
			div.removeClass('dropdown-list_open');
		}
	});

	$('.filter-handler').click(function () {
		$('.filter-handler__burger').toggleClass('filter-handler__burger_open');
		$('.filter').slideToggle('fast');
		if (clientWidth > 991) {
			$('.main-category__filter-container').slideToggle('fast');
		}	
	});

	if (clientWidth <= 991) {
		$('.filter-handler__burger').removeClass('filter-handler__burger_open');
		$('.filter').hide();
	}

	$('.filter__item-title').click(function () {
		$(this).toggleClass('filter__item-title_open');
		$(this).next().slideToggle('fast');
	});

	$('.colors__item').click(function () {
		$(this).toggleClass('colors__item_checked');
	});

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav',
		responsive: [
		{
			breakpoint: 992,
			settings: {
				//centerMode: true,
				//variableWidth: true,
				infinite: true,
				//dots: true,
				fade: false,
				focusOnSelect: true
			}
		},
		{
			breakpoint: 576,
			settings: {
				arrows: true,
				dots: true,
				fade: false,
				nextArrow: '<img src="img/arrow-slider-right.png" class="slick-arrow_right"></img>',
				prevArrow: '<img src="img/arrow-slider-left.png" class="slick-arrow_left"></img>',
			}
		}
		]
	});
	$('.slider-nav').slick({
		nextArrow: '<img class="slick-next" src="img/slider-arr-down.png">',
		prevArrow: '<img class="slick-prev" src="img/slider-arr-up.png">',
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		focusOnSelect: true,
		verticalSwiping: true,
		vertical: true,
		arrows: true,
	});

	$('.product-info__size-box').click(function () {
		$('.product-info__size-box').removeClass('product-info__size-box_active');
		$(this).toggleClass('product-info__size-box_active');
	});

	$('.product-info__color-box').click(function () {
		$('.product-info__color-box').removeClass('product-info__color-box_active');
		$(this).toggleClass('product-info__color-box_active');
	});

	$('.accordion__title').click(function () {
		$(this).toggleClass('accordion__title_open');
		$(this).next().slideToggle('fast');
	});

	/*$('.sustainability__tab-content').not(':first').hide();
	$('.sustainability__tab').click(function() {
		$('.sustainability__tab').removeClass('sustainability__tab_active').eq($(this).index()).addClass('sustainability__tab_active');
		$('.sustainability__tab-content').hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass('sustainability__tab_active');





	$('.sustainability__list-content').not(':first').hide();
	$('.sustainability__dropdown-list .dropdown-list__name').text($('.sustainability__dropdown-list .dropdown-list__menu-item').eq(0).text());

	$('.sustainability__dropdown-list .dropdown-list__menu-item').click(function() {
		$('.sustainability__dropdown-list .dropdown-list__name').text($(this).text());
		$('.sustainability__list-content').hide().eq($(this).index()).fadeIn();
	});
    */



	$('.mobile-nav__item-search').click(function(e) {
		e.preventDefault();
		let query = $('.mobile-nav__input').val();
		if (query.length != 0) {
			$('.mobile-nav__search-form').submit();
		} else {
			$('.mobile-nav__input').toggleClass('mobile-nav__input_visible').focus();
			$('.logo').toggle();
		}
		
	});

	$('.main-nav__burger-container').click(function () {
		$(this).children().toggleClass('mobile-burger_open');
	});


});
