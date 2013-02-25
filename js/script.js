$(document).ready(function() {

    /**
     * ========================================================================
     * PROCESS WINDOW SCROLL MOVEMENTS
     * ========================================================================
     */
	var lastScrollTop = 0;
	$(window).scroll(function() {

		var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
		
		// Save which direction we are going to a global
		if( lastScrollTop >= wintop ) scrollDirection = 'up';
		else scrollDirection = 'down';
       
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
	
	
	
    /**
     * ========================================================================
     * PROCESS WINDOW RESIZING - DELAY REACTION UNTIL RESIZE COMPLETE
     * ========================================================================
     */

	var rtime = new Date(1, 1, 2000, 12,00,00);
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
			rtime = new Date();
			if (timeout === false) {
					timeout = true;
					setTimeout(resize_end, delta);
			}
	});
	
	function resize_end() {
			if (new Date() - rtime < delta) {
					setTimeout(resize_end, delta);
			} else {
					timeout = false;
					sizeToWindow();
					performScroll(); // Reset Viewport								
			}               
	}



    /**
     * ======================================================================== 
     * BUTTON CLICK / HOVER ACTIONS
     * ========================================================================
     */

	$('#start_button').click(function(){        
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
	
	$('#scroll_top').click(function(){
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
	
   
 
	/****************************************************************************************
	  Misc Features & Final Load Call
	 ***************************************************************************************/
	
	// Shoe Builder Shadow
	//$('#shoe-build-shadow').css('left', ($(document).width()-$('#shoe-build-shadow').width())/2 + "px");
	
	// Fancy Form Dropdowns
	//$('#get_state').makeFancy();
	//$('#get_shoe').makeFancy();
	
	// Ready to go
	$(window).load(function () {
		
		// Handle IE 6
		if( !$('html').hasClass('lt-ie7') ){
			// Show Hidden Elements
			
			$('#start_button').show();
			$('#content_wrap').show();
			// $('#shoeBrowser').show();
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
var shoeBrowserGender = 'm';
var colorBrowserMenuLeftOffset = 0; //documentGutterWidth + ((documentWrapWidth-$('#chooser_menu').width())/2);
var colorBrowserMenuItemWidth = 0;
var colorBrowserCurrentItem = 1;
var mens_bg_colors = new Array('#ba2c2c','#395bae','#afcf3b','#6a6a6a','#dd7d04','#e2cb04' );
var womens_bg_colors = new Array('#b93457','#2c92cc','#ca4b4f','#7e5193','#b93457','#e2cb04');
var shoeBrowserCount = 6;

/*
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

*/
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
    /*
	oldLeft = parseInt($('#chooser_selected').css('left'));
	newLeft = colorBrowserMenuLeftOffset + ((colorBrowserCurrentItem-1)*colorBrowserMenuItemWidth);
	speed = Math.abs(newLeft-oldLeft)/colorBrowserMenuItemWidth;
	// tweaked as per tom's request - ss
	$('#chooser_selected').animate( { left: newLeft + "px" }, 200*speed );
    */
}





/***********************************************************
  Individual Screen Setups
 **********************************************************/

function setup_flexfilm(){

    log( "setup flex ... " );
    log( flexfilmSetupComplete );

	if(!flexfilmSetupComplete){
         
		flexfilmSetupComplete = true;

        log( flexfilmSetupComplete );

	}
	
	
	//$.plax.enable({ "activityTarget": $('#flexfilm')});
}
function reset_flexfilm(){

    log( "reset flexfilm " );
	//$.plax.disable();
}
 

function setup_upper(){
	if(!upperSetupComplete) {
		upperSetupComplete = true;
	}
	$.plax.enable({ "activityTarget": $('#upper')});
}
function reset_upper(){
	$.plax.disable();
}


function setup_progrid(){
	if(!progridSetupComplete) {
	 
		progridSetupComplete = true;
	}

	$.plax.enable({ "activityTarget": $('#progrid')});
}
function reset_progrid(){
	$.plax.disable();
}

function setup_midsole(){
	if(!midsoleSetupComplete) { 
		midsoleSetupComplete = true;	
	} 
	$.plax.enable({ "activityTarget": $('#midsole')});
}
function reset_midsole(){
	$.plax.disable();
}



function setup_sole(){
	if(!soleSetupComplete) { 
		soleSetupComplete = true;
	}
	
	$.plax.enable({ "activityTarget": $('#sole')});
}
function reset_sole(){
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
