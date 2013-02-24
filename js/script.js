$(document).ready(function() {
	
    /**
     * Process Window Scroll Movements 
     */
	var lastScrollTop = 0;
	$(window).scroll(function() {
		var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
		
		// Save which direction we are going to a global
		if( lastScrollTop >= wintop ) scrollDirection = 'up';
		else scrollDirection = 'down';
		
		/********************************************
		  Global Navigation Managment
		 *******************************************/
		if( wintop >= winheight ) {
			pin_ShoeComponent($('#shoe-build-flexfilm-front'));
			pin_ShoeComponent($('#shoe-build-flexfilm-back'));
		}
		else {
			unpin_ShoeComponent($('#shoe-build-flexfilm-front'));
			unpin_ShoeComponent($('#shoe-build-flexfilm-back'));
		}
		if( wintop >= (winheight*2) ) {
			pin_ShoeComponent($('#shoe-build-upper-front'));
			pin_ShoeComponent($('#shoe-build-upper-back'));
		}
		else {
			unpin_ShoeComponent($('#shoe-build-upper-front'));
			unpin_ShoeComponent($('#shoe-build-upper-back'));
		}
		if( wintop >= (winheight*3) ) pin_ShoeComponent($('#shoe-build-progrid'));
		else unpin_ShoeComponent($('#shoe-build-progrid'));
		if( wintop >= (winheight*4) ) pin_ShoeComponent($('#shoe-build-midsole'));
		else unpin_ShoeComponent($('#shoe-build-midsole'));


		/***********************************************************
		  Entering and Leaving Each Dynamic Shoe Screen
		 **********************************************************/
		var cushion = 7; // Amount to cusion for browser sizing weirdness

		//Flexfilm
		if(scrollDirection == 'down'	&& wintop >= winheight				&& lastScrollTop < winheight)				setup_flexfilm();
		if(scrollDirection == 'down'	&& wintop >= winheight+cushion		&& lastScrollTop < winheight+cushion)		reset_flexfilm();
		if(scrollDirection == 'up'		&& wintop <= winheight+cushion		&& lastScrollTop > winheight+cushion)		setup_flexfilm();
		if(scrollDirection == 'up'		&& wintop < winheight				&& lastScrollTop >= winheight)				reset_flexfilm();

		//Upper
		if(scrollDirection == 'down'	&& wintop >= winheight*2			&& lastScrollTop < winheight*2)				setup_upper();
		if(scrollDirection == 'down'	&& wintop >= winheight*2+cushion	&& lastScrollTop < winheight*2+cushion)		reset_upper();
		if(scrollDirection == 'up'		&& wintop <= winheight*2+cushion	&& lastScrollTop > winheight*2+cushion)		setup_upper();
		if(scrollDirection == 'up'		&& wintop < winheight*2				&& lastScrollTop >= winheight*2)			reset_upper();

		//Powergrid
		if(scrollDirection == 'down'	&& wintop >= winheight*3			&& lastScrollTop < winheight*3)				setup_progrid();
		if(scrollDirection == 'down'	&& wintop >= winheight*3+cushion	&& lastScrollTop < winheight*3+cushion)		reset_progrid();
		if(scrollDirection == 'up'		&& wintop <= winheight*3+cushion	&& lastScrollTop > winheight*3+cushion)		setup_progrid();
		if(scrollDirection == 'up'		&& wintop < winheight*3				&& lastScrollTop >= winheight*3)			reset_progrid();

		//Midsole
		if(scrollDirection == 'down'	&& wintop >= winheight*4			&& lastScrollTop < winheight*4)				setup_midsole();
		if(scrollDirection == 'down'	&& wintop >= winheight*4+cushion	&& lastScrollTop < winheight*4+cushion)		reset_midsole();
		if(scrollDirection == 'up'		&& wintop <= winheight*4+cushion	&& lastScrollTop > winheight*4+cushion)		setup_midsole();
		if(scrollDirection == 'up'		&& wintop < winheight*4				&& lastScrollTop >= winheight*4)			reset_midsole();

		//Sole
		if(scrollDirection == 'down'	&& wintop >= winheight*5			&& lastScrollTop < winheight*5)				{ setup_sole(); animate_to_sole(); }
		if(scrollDirection == 'down'	&& wintop >= winheight*5+cushion	&& lastScrollTop < winheight*5+cushion)		reset_sole();
		if(scrollDirection == 'up'		&& wintop <= winheight*5+cushion	&& lastScrollTop > winheight*5+cushion)		setup_sole();
		if(scrollDirection == 'up'		&& wintop < winheight*5				&& lastScrollTop >= winheight*5)			{ animate_to_profile(); reset_sole(); }

		//Shoe Browser
		if(scrollDirection == 'down'	&& wintop >= winheight*6			&& lastScrollTop < winheight*6)				setup_shoeBrowser();
		if(scrollDirection == 'down'	&& wintop >= winheight*6+cushion	&& lastScrollTop < winheight*6+cushion)		reset_shoeBrowser();
		if(scrollDirection == 'up'		&& wintop <= winheight*6+cushion	&& lastScrollTop > winheight*6+cushion)		setup_shoeBrowser();
		if(scrollDirection == 'up'		&& wintop < winheight*6				&& lastScrollTop >= winheight*6)			reset_shoeBrowser();



        /**
          * Global Navigation Managment
          */


		// Global Nav Show Hide
		if( wintop >= winheight && wintop < ((winheight*5) + (winheight/2)) ) $('#global_nav').removeClass('offscreen');
		else $('#global_nav').addClass('offscreen');
		
		// Current Navigation Item Highlight Indication
		if( wintop <= winheight*1.5 ) {
			$('#nav_flexfilm a').addClass('current');
		} else $('#nav_flexfilm a').removeClass('current');
		if( wintop > winheight*1.5 && wintop <= winheight*2.5 ) {
			if(!$('#nav_upper a').hasClass('current')) $('#nav_upper a').addClass('current');
		} else $('#nav_upper a').removeClass('current');
		if( wintop > winheight*2.5 && wintop <= winheight*3.5 ) {
			if(!$('#nav_progrid a').hasClass('current')) $('#nav_progrid a').addClass('current');
		} else $('#nav_progrid a').removeClass('current');
		if( wintop > winheight*3.5 && wintop <= winheight*4.5 ) {
			if(!$('#nav_midsole a').hasClass('current')) $('#nav_midsole a').addClass('current');
		} else $('#nav_midsole a').removeClass('current');
		if( wintop > winheight*4.5 && wintop <= winheight*5.5 ) {
			if(!$('#nav_sole a').hasClass('current')) $('#nav_sole a').addClass('current');
		} else $('#nav_sole a').removeClass('current');
		if( wintop > winheight*5.5 && wintop <= winheight*6.5 ) {
			if(!$('#nav_colors a').hasClass('current')) $('#nav_colors a').addClass('current');
		} else $('#nav_colors a').removeClass('current');
		
		// Records last scroll top for acertaining direction
		lastScrollTop = wintop;
				
		// Prevent scrolling when scroller is not ready 
		if(scrollLocked) preventScroll();
	});
	
	
	
	
	
	/****************************************************************************************
	  Process Window Resizing - Delay reaction until resize complete
	 ***************************************************************************************/

	var rtime = new Date(1, 1, 2000, 12,00,00);
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
			rtime = new Date();
			if (timeout === false) {
					timeout = true;
					setTimeout(resizeend, delta);
			}
	});
	
	function resizeend() {
			if (new Date() - rtime < delta) {
					setTimeout(resizeend, delta);
			} else {
					timeout = false;
					sizeToWindow();
					performScroll(); // Reset Viewport								
			}               
	}



	/****************************************************************************************
	  Button Click / Hover Actions
	 ***************************************************************************************/	
	$('#start_button').click(function(){
        alert( "start button" );
		$('#start_button').addClass('offscreen');
		scrollReady = true;
		currentScreen = 0;
		scrollNext();
	});
	
	$('#downBtnFlexfilm').click(function(){	currentScreen = 1; scrollNext(); });
	$('#downBtnUpper').click(function(){	currentScreen = 2; scrollNext(); });
	$('#downBtnProgrid').click(function(){	currentScreen = 3; scrollNext(); });
	$('#downBtnMidsole').click(function(){	currentScreen = 4; scrollNext(); });
	$('#downBtnSole').click(function(){		currentScreen = 5; scrollNext(); });
	$('#downBtnBrowser').click(function(){	currentScreen = 6; scrollNext(); });
	
	$('#scrollToTop').click(function(){
		scrollReady = false;
		$("html,body").animate({scrollTop:"0px"}, 2500,
		function(){
			scrollReady = true;
			currentScreen = 0;
		});
		return false;
	});

	// Nav Click Events
	$('#nav_flexfilm a').click(function(event){ event.preventDefault(); currentScreen = 1; performScroll(); });
	$('#nav_upper a').click(function(event){ event.preventDefault(); currentScreen = 2; performScroll(); });
	$('#nav_progrid a').click(function(event){ event.preventDefault(); currentScreen = 3; performScroll(); });
	$('#nav_midsole a').click(function(event){ event.preventDefault(); currentScreen = 4; performScroll(); });
	$('#nav_sole a').click(function(event){ event.preventDefault(); currentScreen = 5; performScroll(); });
	$('#nav_colors a').click(function(event){ event.preventDefault(); currentScreen = 6; performScroll(); });
	$('#nav_getyours a').click(function(event){ event.preventDefault(); currentScreen = 7; performScroll(); });
	
	// Pop-Out Buttons
	$('.pop_out button').hover(
		function(evt){
			$(this).prev().stop().animate({"opacity": 1});
			$(this).prev().children('div').stop().animate({"opacity": 1}); //ie 8 hack
			$(this).parent().css('z-index','10001');
		},
		function(evt) {
			$(this).prev().stop().animate({"opacity": 0});
			$(this).prev().children('div').stop().animate({"opacity": 0}); //ie 8 hack
			$(this).parent().css('z-index','10000');
		}
	);
	
	// Color Browser Menu Buttons
	$('#color-thumb-1, #color-thumb-8').on('click', function(evt){
		if( colorBrowserCurrentItem != 1 ) {
			colorBrowserCurrentItem = 1;
			scroll_shoeBrowser();
		}
	});
	
	$('#color-thumb-2, #color-thumb-9').on('click', function(evt){
		if( colorBrowserCurrentItem != 2 ) {
			colorBrowserCurrentItem = 2;
			scroll_shoeBrowser();
		}
	});
	
	$('#color-thumb-3, #color-thumb-10').on('click', function(evt){
		if( colorBrowserCurrentItem != 3 ) {
			colorBrowserCurrentItem = 3;
			scroll_shoeBrowser();
		}
	});
	
	$('#color-thumb-4, #color-thumb-11').on('click', function(evt){
		if( colorBrowserCurrentItem != 4 ) {
			colorBrowserCurrentItem = 4;
			scroll_shoeBrowser();
		}
	});
	
	$('#color-thumb-5, #color-thumb-12').on('click', function(evt){
		if( colorBrowserCurrentItem != 5 ) {
			colorBrowserCurrentItem = 5;
			scroll_shoeBrowser();
		}
	});
	
	$('#color-thumb-6, #color-thumb-13').on('click', function(evt){
		if( colorBrowserCurrentItem != 6 ) {
			colorBrowserCurrentItem = 6;
			scroll_shoeBrowser();
		}
	});
	
	$('#color-thumb-7, #color-thumb-14').on('click', function(evt){
		if( colorBrowserCurrentItem != 7 ) {
			colorBrowserCurrentItem = 7;
			scroll_shoeBrowser();
		}
	});
	
	$('#shoeScrollLeft').on('click', function(evt){
		colorBrowserCurrentItem--;
		if(colorBrowserCurrentItem < 1) colorBrowserCurrentItem = shoeBrowserCount;
		scroll_shoeBrowser();
	});
	
	$('#shoeScrollRight').on('click', function(evt){
		colorBrowserCurrentItem++;
		if(colorBrowserCurrentItem > shoeBrowserCount) colorBrowserCurrentItem = 1;
		scroll_shoeBrowser();
	});
	
	
	$('#browser_switch_male').on('click', function(evt){
		evt.preventDefault();
		if( shoeBrowserGender != 'm' ){
			shoeBrowserGender = 'm';
			shoeBrowserCount = 7;
			$(this).addClass('current');
			$('#browser_switch_female').removeClass('current');
			$('#chooser_menu ul li').toggleClass('hidden');
			// Reset
			colorBrowserCurrentItem = 1;
			scroll_shoeBrowser();
		}
	});
	
	$('#browser_switch_female').on('click', function(evt){
		evt.preventDefault();
		if( shoeBrowserGender != 'f' ){
			shoeBrowserGender = 'f';
			shoeBrowserCount = 6;
			$(this).addClass('current');
			$('#browser_switch_male').removeClass('current');
			$('#chooser_menu ul li').toggleClass('hidden');
		
			// Reset
			colorBrowserCurrentItem = 1;
			scroll_shoeBrowser();
		}
	});
	
	
    /*
	// Video & Detail Button Hover Events
	$('.vidWrap a').hover(
		function(){
			$(this).children('.videoBtn').stop().animate({"opacity": 0});
			$(this).children('.videoBtnHover').stop().animate({"opacity": 1});
		},
		function(){
			$(this).children('.videoBtn').stop().animate({"opacity": 1});
			$(this).children('.videoBtnHover').stop().animate({"opacity": 0});
		}
	);
	$('.detailWrap a').hover(
		function(){
			$(this).children('.detailBtn').stop().animate({"opacity": 0});
			$(this).children('.detailBtnHover').stop().animate({"opacity": 1});
		},
		function(){
			$(this).children('.detailBtn').stop().animate({"opacity": 1});
			$(this).children('.detailBtnHover').stop().animate({"opacity": 0});
		}
	);
    */

	// 'Get Yours' Form Submit
	// Request code in separate JS file for security
	if( $('#getYours').length > 0 ) {

		$("#getYoursForm").validate({
			rules:{
				get_name: "required",
				get_store: "required",
				get_email:{
					required: true,
					email: true
				},
				get_phone: "required",
				get_address_1: "required",
				get_city: "required",
				get_state: "required",
				get_zip: {
					required: true,
					minlength: 5,
					digits: true
				},
				get_shoe: "required"
			},
			invalidHandler: function(form, validator) {
				var errors = validator.numberOfInvalids();
				if (errors) {
					var message = errors == 1
						? 'You missed 1 field. It has been highlighted'
						: 'You missed ' + errors + ' fields. They have been highlighted';
					$("#submitErrors").html(message);
					$("#submitErrors").show();
				} else {
					$("#submitErrors").hide();
				}
			},
			errorPlacement: function(errorMap, errorList) {
				// do nothing
			},
			submitHandler: function(form) {
				process_request();
			},
			highlight: function(element, errorClass, validClass) {
				$('#'+element.id).prev().addClass('errorField');
			},
			unhighlight: function(element, errorClass, validClass) {
				$('#'+element.id).prev().removeClass('errorField');
			}
		});
	}


	/****************************************************************************************
	  Misc Features & Final Load Call
	 ***************************************************************************************/
	
	// Shoe Builder Shadow
	$('#shoe-build-shadow').css('left', ($(document).width()-$('#shoe-build-shadow').width())/2 + "px");
	
	// Fancy Form Dropdowns
	$('#get_state').makeFancy();
	$('#get_shoe').makeFancy();
	
	// Ready to go
	$(window).load(function () {
		
		// Handle IE 6
		if( !$('html').hasClass('lt-ie7') ){
			// Show Hidden Elements
			
			$('#start_button').show();
			$('#content_wrap').show();
			$('#shoeBrowser').show();
			if($('#getYours').length > 0 ) $('#getYours').show();
			if($('#comingSoon').length > 0 ) $('#comingSoon').show();
		
			// Size Everything to Viewport
			sizeToWindow();
		
		
			// Ready for Scroll Handlers
			scrollReady = true;
			setupScrollHandler();
			setupKeyScrollHandler();
		}
    });

    /*
	// Colorbox
	$(".colorboxImage").colorbox({height: '414px', innerHeight: '416px'});
	$(".colorboxVideo").colorbox({iframe:true,  height:'361px', innerWidth:521, innerHeight: '293px'});
    
	// Disable Scrolling while colorbox open
	$(document).bind('cbox_open', function(){ scrollReady = false; scrollLocked = true; });
	$(document).bind('cbox_closed', function(){ scrollReady = true; scrollLocked = false; });
    */
	
	// Check for "getYours" form scren
	// If there is no form, the last screen is new 'comingSoon'
	if( $('#getYours').length <= 0 ) screens[7] = 'comingSoon';

	
});



var currentScreen = 0;
var scrollReady = false;
var scrollLocked = false;
var scrollDirection = 'down';
var MIN_HEIGHT = 600;
var screenHeight = $(window).height() > MIN_HEIGHT ? $(window).height() : MIN_HEIGHT;
var documentWrapWidth = 1100;
var shoeBuildLeftOffset = 190;
var shoeOffsetTop = 0;
var shoeOffsetLeft = 0;
var documentGutterWidth = (($(document).width() - documentWrapWidth) / 2);
var screenAnimationTime = 1000;
var screens = new Array( 'start_screen',
						 'flexfilm',
						 'upper',
						 'progrid',
						 'midsole',
						 'sole',
						 'shoeBrowser',
						 'getYours');
						
// Perspective Background
var perspBgWidth = 2100;
var perspBgHeight = 1500;

// Shoe Builder Screens
var flexfilmSetupComplete = false;
var upperSetupComplete = false;
var progridSetupComplete = false;
var midsoleSetupComplete = false;
var soleSetupComplete = false;

// For Shoe Flip Animation
var anim;
var animationStep;

// Color Browser Menu
var shoeBrowserSetupComplete = false;
var shoeBrowserGender = 'm';
var colorBrowserMenuLeftOffset = 0; //documentGutterWidth + ((documentWrapWidth-$('#chooser_menu').width())/2);
var colorBrowserMenuItemWidth = 0;
var colorBrowserCurrentItem = 1;
var mens_bg_colors = new Array('#ba2c2c','#395bae','#afcf3b','#6a6a6a','#dd7d04','#e2cb04' );
var womens_bg_colors = new Array('#b93457','#2c92cc','#ca4b4f','#7e5193','#b93457','#e2cb04');
var shoeBrowserCount = 6;

var mens_urls = new Array(
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=20157-2&showDefaultOption=true&skuId=***4********20157-2*M080&productId=4-109350&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=20157-1&showDefaultOption=true&skuId=***4********20157-1*M085&productId=4-109350&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=20157-4&showDefaultOption=true&skuId=***4********20157-4*M090&productId=4-109350&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=20157-3&showDefaultOption=true&skuId=***4********20157-3*M075&productId=4-109350&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=20157-8&showDefaultOption=true&skuId=***4********20157-8*M095&productId=4-109350&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=20157-7&showDefaultOption=true&skuId=***4********20157-7*M095&productId=4-109350&searched=true&CID=LP-Kinvara3");
	
var womens_urls = new Array(
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=10157-1&showDefaultOption=true&skuId=***4********10157-1*M050&productId=4-109360&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=10157-3&showDefaultOption=true&skuId=***4********10157-3*M080&productId=4-109360&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=10157-4&showDefaultOption=true&skuId=***4********10157-4*M060&productId=4-109360&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=10157-5&showDefaultOption=true&skuId=***4********10157-5*M065&productId=4-109360&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=10157-2&showDefaultOption=true&skuId=***4********10157-2*M060&productId=4-109360&searched=true&CID=LP-Kinvara3",
	"http://www.saucony.com/store/SiteController/saucony/productdetails?stockNumber=10157-6&showDefaultOption=true&skuId=***4********10157-6*M070&productId=4-109360&searched=true&CID=LP-Kinvara3");


/***********************************************************
  Sizes Site components based upon browswer window size
 **********************************************************/
function sizeToWindow() {
	
	// Extra 5 Added to height to account for odd window height rounding issue.
	screenHeight = (Math.ceil($(window).height()) > MIN_HEIGHT ? $(window).height() : MIN_HEIGHT) + 1;
	documentGutterWidth = ((Math.ceil($(document).width()) - documentWrapWidth) / 2);    
	
    log( "start screen height = " + screenHeight );

	$('#start_screen').height(screenHeight);
    
	$('#shoeBrowser').height(screenHeight);
	$('#getYours .wrap').css('min-height',screenHeight+"px");
	$('#thanks .wrap').css('min-height',screenHeight+"px");
	$('#comingSoon .wrap').css('min-height',screenHeight+"px");
	$('#content_wrap section').height(screenHeight).width($(window).width());

	$('.shoe_part').css('top', ((screenHeight-$('.shoe_part').height())/2) + "px");
	$('.shoe_part').css('left',($(window).width()-$('.shoe_part').width())/2+"px");
	$('.shoe_shadow').css('top', ((screenHeight-$('.shoe_part').height())/2) + $('.shoe_part').height() + 30 + "px");
	$('.shoe_shadow').css('left',($(window).width()-$('.shoe_shadow').width())/2+"px");
	
	$('#chooser_menu').css('left', colorBrowserMenuLeftOffset + "px" );
	$('#chooser_selected').css('left', colorBrowserMenuLeftOffset + ((colorBrowserCurrentItem-1)*colorBrowserMenuItemWidth) + "px");


	$('.persp_background').css('top', ((screenHeight-perspBgHeight)/2) + "px");
	$('.persp_background').css('left', ($(window).width()-perspBgWidth)/2 + "px");
	$('.glow').css('top', ((screenHeight-perspBgHeight)/2) + "px");
	$('.glow').css('left', ($(window).width()-perspBgWidth)/2 + "px");
	
	
	shoeOffsetLeft = ($(window).width()-$('.shoe_part').width())/2;
	shoeOffsetTop = ((screenHeight-$('.shoe_part').height())/2);

	// Position Pop-Outs
	$('#flex_pop1').css('top', shoeOffsetTop + 150 + "px").css('left', shoeOffsetLeft + 35 + "px");
	$('#flex_pop2').css('top', shoeOffsetTop + 100 + "px").css('left', shoeOffsetLeft + 250 + "px");
	$('#upper_pop1').css('top', shoeOffsetTop + 160 + "px").css('left', shoeOffsetLeft + 85 + "px");
	$('#upper_pop2').css('top', shoeOffsetTop + 225 + "px").css('left', shoeOffsetLeft + 520 + "px");
	$('#progrid_pop1').css('top', shoeOffsetTop + 235 + "px").css('left', shoeOffsetLeft + 50 + "px");
	$('#midsole_pop1').css('top', shoeOffsetTop + 220 + "px").css('left', shoeOffsetLeft + 170 + "px");
	$('#sole_pop1').css('top', shoeOffsetTop + 100 + "px").css('left', shoeOffsetLeft + 130 + "px");
	$('#sole_pop2').css('top', shoeOffsetTop + 40 + "px").css('left', shoeOffsetLeft + 340 + "px");
	$('#sole_pop3').css('top', shoeOffsetTop + 200 + "px").css('left', shoeOffsetLeft + 400 + "px");

	// Shoe Build Section H1's
	var h1Offset = $(window).height()*.1;
	$('section h1').css('top', h1Offset + "px" );
	$('section h1').css('left', h1Offset + "px" );
	
	
	// Shoe Browser Sizing
	$('#scrollWrap').width($(window).width());
	$('#zebra_stripe').width($(window).width());
	
	var maxShoeScrollerHeight = 897;
	var minShoeScrollerHeight = 600;
	if($(window).height() > minShoeScrollerHeight ) {
		difference = $(window).height() - minShoeScrollerHeight;
		if( minShoeScrollerHeight + difference  < maxShoeScrollerHeight )
			$('#scrollWrap').height(minShoeScrollerHeight + difference);
		else {
			$('#scrollWrap').height($(window).height()).children("div[id!='zebra_stripe']").each(function() {
				$(this).css("top", ((parseInt(difference) / 4) + parseInt($(this).attr("data-top"))) + "px");
			});
			$('#zebra_stripe').height($(window).height()).find("div").height($(window).height());
		}
	}
	
	
	
	$('#shoe_display').css('right',(documentGutterWidth+90)+"px");
	
	if(shoeBrowserSetupComplete) {
		$('#genderNav').css('left', (documentGutterWidth+50)+"px");
	}
	else {
		$('#zebra_stripe').css('right', (-1*$('#zebra_stripe').width())+"px");
		$('#shoe_scroller').css('right', ($('#shoe_scroller').width()*-1) + "px" );
		$('#zebra_stipe').css('right', ($('#zebra_stipe').width()*-1) + "px" );
	}
	
	colorBrowserMenuLeftOffset = documentGutterWidth + ((documentWrapWidth-$('#chooser_menu').width())/2);
	colorBrowserMenuItemWidth = $('#chooser_menu ul li').width() + 14; // 14px right margin
	$('#chooser_menu').css('left', colorBrowserMenuLeftOffset + "px" );
	$('#chooser_selected').css('left', colorBrowserMenuLeftOffset + ((colorBrowserCurrentItem-1)*colorBrowserMenuItemWidth) + "px");

}



/****************************************************************************************
  Scroll Snapping for mousewheel and Up/Down Key Presses
 ***************************************************************************************/
function setupScrollHandler() {
	$("body").bind("mousewheel", function (delta, aS, aQ, deltaY) {
		delta.preventDefault();
		if (deltaY > 0) {
			scrollPrev();
		} else {
			if (deltaY < 0) {
				scrollNext();
			}
		}
		return false;
	});
}
function scrollNext() {
	if( currentScreen < screens.length-1 && scrollReady == true ) {
		currentScreen++;
		performScroll();
	}
}
function scrollPrev() {
	if( currentScreen > 0 && scrollReady == true ) {
		currentScreen--;
		performScroll();
	}
}
function performScroll() {
	scrollReady = false;	
	var newYPos = Math.ceil($('#'+screens[currentScreen]).offset().top);
	$("html, body").animate(
		{scrollTop: newYPos },
		screenAnimationTime,
		'easeInOutExpo',
		function() { scrollReady = true;}
	);		
}
function preventScroll() {
	var newYPos = Math.ceil($('#'+screens[currentScreen]).offset().top);
	$(window).scrollTop(newYPos);
}

// Binds Key Up / Key Down for Scrolling
function setupKeyScrollHandler() {
	$(document).bind("keyup", function (event) {
		if (event.keyCode == 40 || event.keyCode == 38) {
			event.preventDefault();
			if (event.keyCode == 40) {
				if (scrollReady == true) {
					scrollNext();
				}
			} else {
				if (event.keyCode == 38) {
					if (scrollReady == true) {
						scrollPrev();
					}
				}
			}
		}
	});
	$(document).bind("keydown", function (event) {
		if (event.keyCode == 40 || event.keyCode == 38 ) {
			event.preventDefault()
		}
	})
}
// Bind and unbind keys for form elements
function unbindKeys() {
	$(document).unbind("keyup");
	$(document).unbind("keydown");
}
$("input, textarea, select").live("focus", function () { unbindKeys(); });
$("input, textarea, select").live("blur", function () {setupKeyScrollHandler(); });





/***********************************************************
  Shoe Component Pinning
 **********************************************************/
function pin_ShoeComponent(component){ component.css('position','fixed'); }
function unpin_ShoeComponent(component){ component.css('position','absolute'); }



/***********************************************************
  Animates "selected" indicator for Shoe Color Browser 
 **********************************************************/
function animateSelector(){
	oldLeft = parseInt($('#chooser_selected').css('left'));
	newLeft = colorBrowserMenuLeftOffset + ((colorBrowserCurrentItem-1)*colorBrowserMenuItemWidth);
	speed = Math.abs(newLeft-oldLeft)/colorBrowserMenuItemWidth;
	// tweaked as per tom's request - ss
	$('#chooser_selected').animate( { left: newLeft + "px" }, 200*speed );
}

/***********************************************************
  Individual Screen Setups
 **********************************************************/

function setup_flexfilm()
{
	if(!flexfilmSetupComplete){
		
          /*
		$('#video_flexfilm_1').css('left', "-185px").css('top', (shoeOffsetTop-20)+"px").css('opacity', '0');
		$('#video_flexfilm_1').animate(
			{left: '45px', opacity: '1'},
			800,
			function() { $('#video_flexfilm_1').plaxify({"xRange":60,"yRange":60});}
		);
		
		$('#video_lbl_flexfilm_1').css('left', "-185px").css('top', (shoeOffsetTop+80)+"px").css('opacity', '0');
		$('#video_lbl_flexfilm_1').animate(
			{left: '110px', opacity: '1'},
			500,
			function() { $('#video_lbl_flexfilm_1').plaxify({"xRange":100,"yRange":100});}
		);
		
		$('#detail_flexfilm_1').css('right', "-185px").css('top', (shoeOffsetTop+20)+"px").css('opacity', '0');
		$('#detail_flexfilm_1').animate(
			{right: '69px', opacity: '1'},
			700,
			function() { $('#detail_flexfilm_1').plaxify({"xRange":60,"yRange":60});}
		);
	  	
		$('#detail_lbl_flexfilm_1').css('right', "-185px").css('top', (shoeOffsetTop+149)+"px").css('opacity', '0');
		$('#detail_lbl_flexfilm_1').animate(
			{right: '145px', opacity: '1'},
			400,
			function() { $('#detail_lbl_flexfilm_1').plaxify({"xRange":100,"yRange":100});}
		);
		

    
		$('#detail_flexfilm_2').css('right', ($(window).width()-shoeOffsetLeft-760)+"px").css('bottom', "-185px").css('opacity', '0');
		$('#detail_flexfilm_2').animate(
			{bottom: ($(window).height()-shoeOffsetTop-440)+"px", opacity: '1'},
			800,
			function() { $('#detail_flexfilm_2').plaxify({"xRange":60,"yRange":60});}
		);

        
		$('#detail_lbl_flexfilm_2').css('right', ($(window).width()-shoeOffsetLeft-720)+"px").css('bottom', "-185px").css('opacity', '0');
		$('#detail_lbl_flexfilm_2').animate(
			{bottom: ($(window).height()-shoeOffsetTop-320)+"px", opacity: '1'},
			500,
			function() { $('#detail_lbl_flexfilm_2').plaxify({"xRange":100,"yRange":100});}
		);
       
		
		$('#detail_flexfilm_3').css('left', "-185px").css('top', (shoeOffsetTop-20)+"px").css('opacity', '0');
		$('#detail_flexfilm_3').animate(
			{left: '45px', opacity: '1'},
			800,
			function() { $('#detail_flexfilm_3').plaxify({"xRange":60,"yRange":60});}
		);

		$('#detail_lbl_flexfilm_3').css('left', "-185px").css('top', (shoeOffsetTop+80)+"px").css('opacity', '0');
		$('#detail_lbl_flexfilm_3').animate(
			{left: '110px', opacity: '1'},
			500,
			function() { $('#detail_lbl_flexfilm_3').plaxify({"xRange":100,"yRange":100});}
		);

        
		$('#quote_flexfilm_1').css('bottom', $('#quote_flexfilm_1').height()*-1+"px").css('left', (shoeOffsetLeft-40)+"px").css('opacity', '0');
		$('#quote_flexfilm_1').animate(
			{bottom: ($(window).height()-shoeOffsetTop-320)+"px", opacity: '0.8'},
			800,
			function() { $('#quote_flexfilm_1').plaxify({"xRange":200,"yRange":140});}
		);
		
        
		$('#quote_flexfilm_2').css('top', $('#quote_flexfilm_2').height()*-1+"px").css('right', ($(window).width()-shoeOffsetLeft-660)+"px").css('opacity', '0');
		$('#quote_flexfilm_2').animate(
			{top: (shoeOffsetTop)+"px", opacity: '0.45'},
			700,
			function() { $('#quote_flexfilm_2').plaxify({"xRange":120,"yRange":50});}
		);
        */
		
		$('#flexfilm .line1').plaxify({"xRange":200,"yRange":100});
		$('#flexfilm .line2').plaxify({"xRange":140,"yRange":50});
		$('#flexfilm .line3').plaxify({"xRange":120,"yRange":40});
		$('#flexfilm .line4').plaxify({"xRange":100,"yRange":30});
		$('#flexfilm .line5').plaxify({"xRange":80,"yRange":20});
		$('#flexfilm .line6').plaxify({"xRange":60,"yRange":10});
		$('#flexfilm-bg').plaxify({"xRange":25,"yRange":25});
		$('#flexfilm-shoe-shadow').plaxify({"xRange":95,"yRange":95});

		flexfilmSetupComplete = true;
	}
	
	show_flexfilm_hotspots();
	
	$.plax.enable({ "activityTarget": $('#flexfilm')});
}
function reset_flexfilm()
{
	$.plax.disable();
	hide_flexfilm_hotspots();
}
function show_flexfilm_hotspots() {
	$('#flex_pop1').fadeIn('slow');
	$('#flex_pop2').fadeIn('slow');
}
function hide_flexfilm_hotspots() {
	$('#flex_pop1').animate({opacity: 0}, 'slow', function(){$(this).css('display', 'none').css('opacity','1')});
	$('#flex_pop2').animate({opacity: 0}, 'slow', function(){$(this).css('display', 'none').css('opacity','1')});
}


function setup_upper()
{
	if(!upperSetupComplete) {
	

		$('#video_upper_1').css('right', "-185px").css('top', (shoeOffsetTop+60)+"px").css('opacity', '0');
		$('#video_upper_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-870)+"px", opacity: '1'},
			800,
			function() { $('#video_upper_1').plaxify({"xRange":60,"yRange":60}); }
		);
		
		$('#video_lbl_upper_1').css('right', "-185px").css('top', (shoeOffsetTop+90)+"px").css('opacity', '0');
		$('#video_lbl_upper_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-810)+"px", opacity: '1'},
			600,
			function() { $('#video_lbl_upper_1').plaxify({"xRange":100,"yRange":100}); }
		);


		$('#detail_upper_1').css('left', "50px").css('top', "-185px").css('opacity', '0');
		$('#detail_upper_1').animate(
			{top: (shoeOffsetTop+10)+"px", opacity: '1'},
			800,
			function() { $('#detail_upper_1').plaxify({"xRange":60,"yRange":60}); }
		);
		
		$('#detail_lbl_upper_1').css('left', "80px").css('top', "-185px").css('opacity', '0');
		$('#detail_lbl_upper_1').animate(
			{top: (shoeOffsetTop+140)+"px", opacity: '1'},
			500,
			function() { $('#detail_lbl_upper_1').plaxify({"xRange":100,"yRange":100}); }
		);
		
		$('#detail_upper_2').css('left', "-185px").css('top', (shoeOffsetTop+250)+"px").css('opacity', '0');
		$('#detail_upper_2').animate(
			{left: '150px', opacity: '1'},
			800,
			function() { $('#detail_upper_2').plaxify({"xRange":60,"yRange":60}); }
		);
		
		$('#detail_lbl_upper_2').css('left', "-185px").css('top', (shoeOffsetTop+300)+"px").css('opacity', '0');
		$('#detail_lbl_upper_2').animate(
			{left: '180px', opacity: '1'},
			500,
			function() { $('#detail_lbl_upper_2').plaxify({"xRange":100,"yRange":100}); }
		);
		
		$('#quote_upper_1').css('top',$('#quote_upper_1').height()*-1+"px").css('left', (shoeOffsetLeft+200)+"px").css('opacity', '0');
		$('#quote_upper_1').animate(
			{top: (shoeOffsetTop+280)+"px", opacity: '0.6'},
			800,
			function() { $('#quote_upper_1').plaxify({"xRange":160,"yRange":90}); }
		);
		
		$('#quote_upper_2').css('right', $('#quote_upper_2').width()*-1+"px").css('top', (shoeOffsetTop-10)+"px").css('opacity', '0').css('z-index', '1500');
		$('#quote_upper_2').animate(
			{right: ($(window).width()-shoeOffsetLeft-700)+"px", opacity: '0.8'},
			600,
			function() { $('#quote_upper_2').plaxify({"xRange":80,"yRange":30}); }
		);

		$('#keyword_upper_1').css('bottom', $('#keyword_upper_1').height()*-1+"px").css('left', (shoeOffsetLeft+400)+"px").css('opacity', '0');
		$('#keyword_upper_1').animate(
			{bottom: ($(window).height()-shoeOffsetTop-580)+"px", opacity: '1'},
			650,
			function() { $('#keyword_upper_1').plaxify({"xRange":200,"yRange":50}); }
		);
		
		$('#upper .line1').plaxify({"xRange":200,"yRange":100});
		$('#upper .line2').plaxify({"xRange":140,"yRange":50});
		$('#upper .line3').plaxify({"xRange":120,"yRange":40});
		$('#upper .line4').plaxify({"xRange":100,"yRange":30});
		$('#upper .line5').plaxify({"xRange":80,"yRange":20});
		$('#upper .line6').plaxify({"xRange":60,"yRange":10});
		$('#upper-bg').plaxify({"xRange":25,"yRange":25});
		$('#upper-shoe-shadow').plaxify({"xRange":95,"yRange":95});
		
		upperSetupComplete = true;
	}
	
	show_upper_hotspots();
	$.plax.enable({ "activityTarget": $('#upper')});
}
function reset_upper()
{
	hide_upper_hotspots();
	$.plax.disable();
}
function show_upper_hotspots() {
	$('#upper_pop1').fadeIn('slow');
	$('#upper_pop2').fadeIn('slow');
}
function hide_upper_hotspots() {
	$('#upper_pop1').animate({opacity: 0}, 'slow', function(){$(this).css('display', 'none').css('opacity','1')});
	$('#upper_pop2').animate({opacity: 0}, 'slow', function(){$(this).css('display', 'none').css('opacity','1')});
}



function setup_progrid()
{
	if(!progridSetupComplete) {

		$('#video_progrid_1').css('left', "-185px").css('top', shoeOffsetTop+"px").css('opacity', '0');
		$('#video_progrid_1').animate(
			{left: '10px', opacity: '1'},
			800,
			function() { $('#video_progrid_1').plaxify({"xRange":60,"yRange":60}); }
		);
		
		$('#video_lbl_progrid_1').css('left', "-185px").css('top', (shoeOffsetTop+160)+"px").css('opacity', '0');
		$('#video_lbl_progrid_1').animate(
			{left: '90px', opacity: '1'},
			600,
			function() { $('#video_lbl_progrid_1').plaxify({"xRange":100,"yRange":100}); }
		);
		
		$('#detail_progrid_1').css('right', "-185px").css('top', (shoeOffsetTop+100)+"px").css('opacity', '0');
		$('#detail_progrid_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-860)+"px", opacity: '1'},
			800,
			function() { $('#detail_progrid_1').plaxify({"xRange":60,"yRange":60}); }
		);
		
		$('#detail_lbl_progrid_1').css('right', "-185px").css('top', (shoeOffsetTop+130)+"px").css('opacity', '0');
		$('#detail_lbl_progrid_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-820)+"px", opacity: '1'},
			900,
			function() { $('#detail_lbl_progrid_1').plaxify({"xRange":100,"yRange":100}); }
		);
		
		$('#quote_progrid_1').css('top', $('#quote_progrid_1').height()*-1+"px").css('left', (shoeOffsetLeft+430)+"px").css('opacity', '0');
		$('#quote_progrid_1').animate(
			{top: (shoeOffsetTop+30)+"px", opacity: '0.8'},
			700,
			function() { $('#quote_progrid_1').plaxify({"xRange":200,"yRange":140}); }
		);
		
		$('#quote_progrid_2').css('top',$('#quote_progrid_2').height()*-1+"px").css('left', (shoeOffsetLeft+40)+"px").css('opacity', '0');
		$('#quote_progrid_2').animate(
			{top: (shoeOffsetTop-50)+"px", opacity: '0.3'},
			400,
			function() { $('#quote_progrid_2').plaxify({"xRange":160,"yRange":90}); }
		);

		$('#keyword_progrid_1').css('bottom', $('#keyword_progrid_1').height()*-1+"px").css('left', (shoeOffsetLeft-180)+"px").css('opacity', '0');
		$('#keyword_progrid_1').animate(
			{bottom: ($(window).height()-shoeOffsetTop-550)+"px", opacity: '1'},
			600,
			function() { $('#keyword_progrid_1').plaxify({"xRange":180,"yRange":50}); }
		);
		
		$('#progrid .line1').plaxify({"xRange":200,"yRange":100});
		$('#progrid .line2').plaxify({"xRange":140,"yRange":50});
		$('#progrid .line3').plaxify({"xRange":120,"yRange":40});
		$('#progrid .line4').plaxify({"xRange":100,"yRange":30});
		$('#progrid .line5').plaxify({"xRange":80,"yRange":20});
		$('#progrid .line6').plaxify({"xRange":60,"yRange":10});
		$('#progrid-bg').plaxify({"xRange":25,"yRange":25});
		$('#progrid-shoe-shadow').plaxify({"xRange":95,"yRange":95});
		
		progridSetupComplete = true;
	}
	
	show_progrid_hotspots();
	$.plax.enable({ "activityTarget": $('#progrid')});
}
function reset_progrid()
{
	hide_progrid_hotspots();
	$.plax.disable();
}
function show_progrid_hotspots() {
	$('#progrid_pop1').fadeIn('slow');
}
function hide_progrid_hotspots() {
	$('#progrid_pop1').animate({opacity: 0}, 'slow', function(){$(this).css('display', 'none').css('opacity','1')});
}


function setup_midsole()
{
	if(!midsoleSetupComplete) {
/*
		$('#video_midsole_1').css('left', "-185px").css('top', (shoeOffsetTop+170)+"px").css('opacity', '0');
		$('#video_midsole_1').animate(
			{left: (shoeOffsetLeft-250)+"px", opacity: '1'},
			800,
			function() { $('#video_midsole_1').plaxify({"xRange":60,"yRange":60}); }
		);
		
		$('#video_lbl_midsole_1').css('left', "-185px").css('top', (shoeOffsetTop+300)+"px").css('opacity', '0');
		$('#video_lbl_midsole_1').animate(
			{left: (shoeOffsetLeft-200)+"px", opacity: '1'},
			600,
			function() { $('#video_lbl_midsole_1').plaxify({"xRange":100,"yRange":100}); }
		);
*/

		$('#detail_midsole_1').css('right', "-185px").css('top', (shoeOffsetTop+80)+"px").css('opacity', '0');
		$('#detail_midsole_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-900)+"px", opacity: '1'},
			800,
			function() { $('#detail_midsole_1').plaxify({"xRange":60,"yRange":60}); }
		);

		$('#detail_lbl_midsole_1').css('right', "-185px").css('top', (shoeOffsetTop+110)+"px").css('opacity', '0');
		$('#detail_lbl_midsole_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-940)+"px", opacity: '1'},
			700,
			function() { $('#detail_lbl_midsole_1').plaxify({"xRange":100,"yRange":100}); }
		);

		$('#detail_midsole_2').css('left', "-185px").css('top', (shoeOffsetTop+70)+"px").css('opacity', '0');
		$('#detail_midsole_2').animate(
			{left: (shoeOffsetLeft-250)+"px", opacity: '1'},
			800,
			function() { $('#detail_midsole_2').plaxify({"xRange":60,"yRange":60}); }
		);

		$('#detail_lbl_midsole_2').css('left', "-185px").css('top', (shoeOffsetTop+200)+"px").css('opacity', '0');
		$('#detail_lbl_midsole_2').animate(
			{left: (shoeOffsetLeft-200)+"px", opacity: '1'},
			600,
			function() { $('#detail_lbl_midsole_2').plaxify({"xRange":100,"yRange":100}); }
		);

		$('#quote_midsole_1').css('top', $('#quote_midsole_1').height()*-1+"px").css('left', (shoeOffsetLeft+370)+"px").css('opacity', '0');
		$('#quote_midsole_1').animate(
			{top: (shoeOffsetTop-25)+"px", opacity: '0.8'},
			700,
			function() { $('#quote_midsole_1').plaxify({"xRange":160,"yRange":90}); }
		);

		$('#quote_midsole_2').css('bottom', $('#quote_midsole_2').height()*-1+"px").css('right', ($(window).width()-shoeOffsetLeft-780)+"px").css('opacity', '0');
		$('#quote_midsole_2').animate(
			{bottom: ($(window).height()-shoeOffsetTop-370)+"px", opacity: '0.3'},
			700,
			function() { $('#quote_midsole_2').plaxify({"xRange":190,"yRange":110}); }
		);

		$('#keyword_midsole_1').css('bottom', $('#keyword_midsole_1').height()*-1+"px").css('left', "0px").css('opacity', '0');
		$('#keyword_midsole_1').animate(
			{bottom: ($(window).height()-shoeOffsetTop-500)+"px", opacity: '1'},
			600,
			function() { $('#keyword_midsole_1').plaxify({"xRange":200,"yRange":50}); }
		);
		
		$('#midsole .line1').plaxify({"xRange":200,"yRange":100});
		$('#midsole .line2').plaxify({"xRange":140,"yRange":50});
		$('#midsole .line3').plaxify({"xRange":120,"yRange":40});
		$('#midsole .line4').plaxify({"xRange":100,"yRange":30});
		$('#midsole .line5').plaxify({"xRange":80,"yRange":20});
		$('#midsole .line6').plaxify({"xRange":60,"yRange":10});
		$('#midsole-bg').plaxify({"xRange":25,"yRange":25});
		$('#midsole-shoe-shadow').plaxify({"xRange":95,"yRange":95});
		
		midsoleSetupComplete = true;	
	} 
	
	show_midsole_hotspots();
	$.plax.enable({ "activityTarget": $('#midsole')});
}
function reset_midsole()
{
	hide_midsole_hotspots();
	$.plax.disable();
}
function show_midsole_hotspots() {
	$('#midsole_pop1').fadeIn('slow');
	}
function hide_midsole_hotspots() {
	$('#midsole_pop1').animate({opacity: 0}, 'slow', function(){$(this).css('display', 'none').css('opacity','1')});
}



function setup_sole()
{
	if(!soleSetupComplete) {

		
		$('#video_sole_1').css('right', "-185px").css('top', (shoeOffsetTop+120)+"px").css('opacity', '0');
		$('#video_sole_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-940)+"px", opacity: '1'},
			600,
			function() { $('#video_sole_1').plaxify({"xRange":60,"yRange":60}); }
		);

		$('#video_lbl_sole_1').css('right', "-125px").css('top', (shoeOffsetTop+150)+"px").css('opacity', '0');
		$('#video_lbl_sole_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-940)+"px", opacity: '1'},
			600,
			function() { $('#video_lbl_sole_1').plaxify({"xRange":60,"yRange":60}); }
		);

		$('#detail_sole_1').css('right', "-185px").css('top', (shoeOffsetTop+60)+"px").css('opacity', '0');
		$('#detail_sole_1').animate(
			{right: ($(window).width()-shoeOffsetLeft-940)+"px", opacity: '1'},
			600,
			function() { $('#detail_sole_1').plaxify({"xRange":60,"yRange":60}); }
		);

		$('#detail_lbl_sole_1').css('right', "-185px").css('top',  (shoeOffsetTop+90)+"px").css('opacity', '0');
		$('#detail_lbl_sole_1').animate(
			{right:  ($(window).width()-shoeOffsetLeft-900)+"px", opacity: '1'},
			800,
			function() { $('#detail_lbl_sole_1').plaxify({"xRange":100,"yRange":100}); }
		);
		
		$('#detail_sole_2').css('left', "-185px").css('top', (shoeOffsetTop+20)+"px").css('opacity', '0');
		$('#detail_sole_2').animate(
			{left: '70px', opacity: '1'},
			800,
			function() { $('#detail_sole_2').plaxify({"xRange":60,"yRange":60}); }
		);

		$('#detail_lbl_sole_2').css('left', "-185px").css('top', (shoeOffsetTop+50)+"px").css('opacity', '0');
		$('#detail_lbl_sole_2').animate(
			{left: '100px', opacity: '1'},
			600,
			function() { $('#detail_lbl_sole_2').plaxify({"xRange":100,"yRange":100}); }
		);
	

		$('#quote_sole_1').css('bottom', $('#quote_sole_1').height()*-1+"px").css('left', (shoeOffsetLeft+520)+"px").css('opacity', '0');
		$('#quote_sole_1').animate(
			{bottom: ($(window).height()-shoeOffsetTop-500)+"px", opacity: '0.8'},
			500,
			function() { $('#quote_sole_1').plaxify({"xRange":200,"yRange":140}); }
		);
		
		$('#quote_sole_2').css('top', $('#quote_sole_2').height()*-1+"px").css('left', (shoeOffsetLeft+140)+"px").css('opacity', '0');
		$('#quote_sole_2').animate(
			{top: (shoeOffsetTop-60)+"px", opacity: '0.4'},
			400,
			function() { $('#quote_sole_2').plaxify({"xRange":60,"yRange":20}); }
		);
		
		$('#sole .line1').plaxify({"xRange":200,"yRange":100});
		$('#sole .line2').plaxify({"xRange":140,"yRange":50});
		$('#sole .line3').plaxify({"xRange":120,"yRange":40});
		$('#sole .line4').plaxify({"xRange":100,"yRange":30});
		$('#sole .line5').plaxify({"xRange":80,"yRange":20});
		$('#sole .line6').plaxify({"xRange":60,"yRange":10});
		$('#sole-bg').plaxify({"xRange":25,"yRange":25});
		$('#sole-shoe-shadow').plaxify({"xRange":95,"yRange":95});
		
		soleSetupComplete = true;
	}

	if(scrollDirection == 'up') show_sole_hotspots();
	$.plax.enable({ "activityTarget": $('#sole')});
}
function reset_sole()
{
	hide_sole_hotspots('slow');
	$.plax.disable();
}
function show_sole_hotspots() {
	$('#sole_pop1').fadeIn('slow');
	$('#sole_pop2').fadeIn('slow');
	$('#sole_pop3').fadeIn('slow');
}
function hide_sole_hotspots(speed) {
	$('#sole_pop1').animate({opacity: 0}, speed, function(){$(this).css('display', 'none').css('opacity','1')});
	$('#sole_pop2').animate({opacity: 0}, speed, function(){$(this).css('display', 'none').css('opacity','1')});
	$('#sole_pop3').animate({opacity: 0}, speed, function(){$(this).css('display', 'none').css('opacity','1')});
}
function animate_to_sole() {
	$('#shoe-build-sole img').addClass('hidden');;
	$('#shoe-build-sole img:first-child').removeClass('hidden');
	$('#shoe-build-flexfilm-front').hide();
	$('#shoe-build-flexfilm-back').hide();
	$('#shoe-build-upper-front').hide();
	$('#shoe-build-upper-back').hide();
	$('#shoe-build-progrid').hide();
	$('#shoe-build-midsole').hide();
	animationStep = 5;
	animationStepForward();
}
function animate_to_profile() {
	hide_sole_hotspots('fast');
	animationStep = 0;
	animationStepBackward();
}
function animationStepForward() {	
	$('#shoe-build-sole img:not(.hidden)').addClass('hidden').next().removeClass('hidden');
	animationStep--;
	if(animationStep == 4 ) anim=setTimeout("animationStepForward()",600);
	else if(animationStep > 0 ) anim=setTimeout("animationStepForward()",18);
	else show_sole_hotspots();
}
function animationStepBackward() {
	$('#shoe-build-sole img:not(.hidden)').addClass('hidden').prev().removeClass('hidden');
	animationStep++;
	if(animationStep < 5 ) anim=setTimeout("animationStepBackward()",50);
	if(animationStep == 4 ) {
		$('#shoe-build-flexfilm-front').show();
		$('#shoe-build-flexfilm-back').show();
		$('#shoe-build-upper-front').show();
		$('#shoe-build-upper-back').show();
		$('#shoe-build-progrid').show();
		$('#shoe-build-midsole').show();
	}
}









function setup_shoeBrowser()
{
	if( !shoeBrowserSetupComplete ) {
		$('#genderNav').animate({'left':(documentGutterWidth+50)+"px"}, 250 );
		scroll_shoeBrowser();

		$('#zebra_stripe').animate({'right':"0px"}, 350, function() {
			$('#shoeBrowser .scrollLeft').animate({'left':'0px'}, 250 );
			$('#shoeBrowser .scrollRight').animate({'right':'0px'}, 250 );
			
		});
		
		// Set Shop Now Link
		$('p#shopNowLink').html('<a href="'+mens_urls[0]+'" target="_blank">SHOP NOW</a>');
		
		shoeBrowserSetupComplete = true;
	}
}
function reset_shoeBrowser(){}

function scroll_shoeBrowser() {
	animateSelector();
	$('#shoe_scroller div.shoe_container').addClass('hidden');
	
	$('#'+(shoeBrowserGender=='m'?'men':'women')+'-scroll-'+colorBrowserCurrentItem).removeClass('hidden');
	
	$('#shoe_display').stop().animate({'right':$(window).width()+"px"}, 500, function() {
		$('#shoe_display div.shoe_container').addClass('hidden');
		$('#'+(shoeBrowserGender=='m'?'men':'women')+'-disp-'+colorBrowserCurrentItem).removeClass('hidden');
		$('#shoe_display').css('display', 'block').css('right',(documentGutterWidth+50)+"px");
		$('#shoe_scroller').css('display','none');
	});
	
	// Set Shop Now Link
	var shopURL = shoeBrowserGender=='m' ? mens_urls[colorBrowserCurrentItem-1] : womens_urls[colorBrowserCurrentItem-1];
	if( shopURL.length > 0 ) $('p#shopNowLink').html('<a href="'+shopURL+'" target="_blank">SHOP NOW</a>');
	else $('p#shopNowLink').html('Available 7/1');
	
	$('#shoe_scroller').css('right', ($('#shoe_scroller').width()*-1) + "px" );
	$('#shoe_scroller').stop().css('display', 'block').animate({'right':(documentGutterWidth+50)+"px"}, 500);
	
	var newColor = (shoeBrowserGender=='m' ? mens_bg_colors[colorBrowserCurrentItem-1]:womens_bg_colors[colorBrowserCurrentItem-1]);
	$('#zebra_stripe').css('background-color',newColor);
	$('#zebra_stripe .color_b').fadeOut('fast', function(){
		$('#zebra_stripe .color_b').css('background-color',newColor).show();
	});
}


/***********************************************************
  Helper Functions
 **********************************************************/
$.fn.makeFancy = function() {
	
	var formSelect = $(this);
	var newId = $(this).attr('id') + "_fancy";
	
	var selectBoxContainer = $('<div id="'+newId+'">').addClass('fancySelect').html('<div class="selectBox"></div>');

	var dropDown = $('<ul>').addClass('dropDown');
	var selectBox = selectBoxContainer.find('.selectBox');
		
	formSelect.find('option').each(function(i){
		var option = $(this);
		if(i==formSelect.prop('selectedIndex')) selectBox.html(option.text());
		if(option.data('skip')) return true;
		var li = $('<li>',{ html:	option.text() });
		li.click(function(){
			selectBox.html(option.text());
			dropDown.trigger('hide');
			formSelect.val(option.val());
			return false;
		});
		dropDown.append(li);
	});
	
	selectBoxContainer.append(dropDown.hide());
	formSelect.hide().after(selectBoxContainer);
	
	dropDown.on('show',function(){
		if(dropDown.is(':animated')) return false;
		selectBox.addClass('expanded');
		dropDown.slideDown();
	}).on('hide',function(){
		if(dropDown.is(':animated')) return false;
		selectBox.removeClass('expanded');
		dropDown.slideUp();
	}).on('toggle',function(){
		if(selectBox.hasClass('expanded')) dropDown.trigger('hide');
		else dropDown.trigger('show');
	});

	selectBox.on('click', function(){
		dropDown.trigger('toggle');
		return false;
	});

	$(document).click(function(){
		dropDown.trigger('hide');
	});
}
