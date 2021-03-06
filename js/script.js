var MIN_HEIGHT              = 600;
var current_screen          = 0;
var scroll_ready            = false;
var scroll_locked           = false;
var scroll_direction        = 'down';
var screen_height           = $(window).height() > MIN_HEIGHT ? $(window).height() : MIN_HEIGHT;
var document_wrap_width     = 1100;
var document_gutter_width   = (($(document).width() - document_wrap_width) / 2);
var screen_animation_time   = 1000;
var screens = new Array(    'start_screen',
		            		'template_one',
                            'template_two',
                            'template_three',
                            'template_four',
                            'template_five',
                            'template_six',
                            'contact' );
                                    

$(document).ready(function() {

    /**
     * PROCESS WINDOW SCROLL MOVEMENTS
     */
	var last_scroll_top = 0;
	$(window).scroll(function() {

		var wintop = $(window).scrollTop(), doc_height = $(document).height(), window_height = $(window).height();
		
		// Save which direction we are going to a global
		if( last_scroll_top >= wintop ) scroll_direction = 'up';
		else scroll_direction = 'down';
       
        /**
          * GLOBAL NAVIGATION MANAGEMENT
          */

		// Global Nav Show Hide
		if( wintop >= window_height && wintop < ((window_height*6) + (window_height/2)) ) $('#global_nav').removeClass('offscreen');
		else $('#global_nav').addClass('offscreen');
		
		// Current Navigation Item Highlight Indication
		if( wintop <= window_height*1.5 ) {
			$('#nav_one a').addClass('current');
		} else $('#nav_one a').removeClass('current');

		if( wintop > window_height*1.5 && wintop <= window_height*2.5 ) {
			if(!$('#nav_two a').hasClass('current')) $('#nav_two a').addClass('current');
		} else $('#nav_two a').removeClass('current');

		if( wintop > window_height*2.5 && wintop <= window_height*3.5 ) {
			if(!$('#nav_three a').hasClass('current')) $('#nav_three a').addClass('current');
		} else $('#nav_three a').removeClass('current');

		if( wintop > window_height*3.5 && wintop <= window_height*4.5 ) {
			if(!$('#nav_four a').hasClass('current')) $('#nav_four a').addClass('current');
		} else $('#nav_four a').removeClass('current');

		if( wintop > window_height*4.5 && wintop <= window_height*5.5 ) {            
			if(!$('#nav_five a').hasClass('current')) $('#nav_five a').addClass('current');
		} else $('#nav_five a').removeClass('current');

		if( wintop > window_height*5.5 && wintop <= window_height*6.5 ) {             
			if(!$('#nav_six a').hasClass('current')) $('#nav_six a').addClass('current');
		} else $('#nav_six a').removeClass('current');
		
		// Records last scroll top for acertaining direction
		last_scroll_top = wintop;
				
		// Prevent scrolling when scroller is not ready 
		if(scroll_locked) prevent_scroll();

	});
	
	
	
    /**
     * PROCESS WINDOW RESIZING - DELAY REACTION UNTIL RESIZE COMPLETE
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
					size_to_window();
					perform_scroll(); 							
			}               
	}



    /**
     * BUTTON CLICK / HOVER ACTIONS
     */

	$('#start_button').click(function(){        
		$('#start_button').addClass('offscreen');
		scroll_ready = true;
		current_screen = 0;
		scroll_next();
	});
	
	$('#down_one').click(function(){	current_screen = 1; scroll_next(); });
	$('#down_two').click(function(){	current_screen = 2; scroll_next(); });
	$('#down_three').click(function(){	current_screen = 3; scroll_next(); });
	$('#down_four').click(function(){	current_screen = 4; scroll_next(); });
	$('#down_five').click(function(){	current_screen = 5; scroll_next(); });
	$('#down_six').click(function(){    current_screen = 6; scroll_next(); });
	
	$('#scroll_top').click(function(){
		scroll_ready = false;
		$("html,body").animate({scrollTop:"0px"}, 2500,
		function(){
			scroll_ready = true;
			current_screen = 0;
		});
		return false;
	});

	// Nav Click Events
	$('#nav_one a').click(function(event){ event.preventDefault(); current_screen = 1; perform_scroll(); });
	$('#nav_two a').click(function(event){ event.preventDefault(); current_screen = 2; perform_scroll(); });
	$('#nav_three a').click(function(event){ event.preventDefault(); current_screen = 3; perform_scroll(); });
	$('#nav_four a').click(function(event){ event.preventDefault(); current_screen = 4; perform_scroll(); });
	$('#nav_five a').click(function(event){ event.preventDefault(); current_screen = 5; perform_scroll(); });
	$('#nav_six a').click(function(event){ event.preventDefault(); current_screen = 6; perform_scroll(); });
	$('#nav_contact a').click(function(event){ event.preventDefault(); current_screen = 7; perform_scroll(); });
 


    
    /**
     * MISC FEATURES AND FINAL LOAD CALL
     */
	$(window).load(function () {

        $('#start_button').show();
        $('#content_wrap').show();
    
        // Size Everything to Viewport
        size_to_window();		
    
        // Ready for Scroll Handlers
        scroll_ready = true;
        setup_scroll_handler();
        setup_key_scroll_handler();
 
    });

	 screens[7] = 'contact';

	
});



/**
 * RESIZE BASE ON BROWSERS WINDOW SIZE
 */
function size_to_window() {

	// Extra 5 Added to height to account for odd window height rounding issue.
	screen_height = (Math.ceil($(window).height()) > MIN_HEIGHT ? $(window).height() : MIN_HEIGHT) + 1;
    log( "start screen height = " + screen_height );

	$('#start_screen').height(screen_height);
	
	$('#contact .wrap').css('min-height',screen_height+"px");
	$('#content_wrap section').height(screen_height).width($(window).width());
}


/**
 * SCROLL SNAPPING FOR MOUSEWHEEL AND UP/DOWN KEY PRESSES 
 */

function setup_scroll_handler() {
	$("body").bind("mousewheel", function (delta, aS, aQ, delta_y) {
		delta.preventDefault();
		if (delta_y > 0) {
			scroll_prev();
		} else {
			if (delta_y < 0) {
				scroll_next();
			}
		}
		return false;
	});
}

function scroll_next() {
	if( current_screen < screens.length-1 && scroll_ready == true ) {
		current_screen++;
		perform_scroll();
	}
}

function scroll_prev() {
	if( current_screen > 0 && scroll_ready == true ) {
		current_screen--;
		perform_scroll();
	}
}

function perform_scroll() {
	scroll_ready = false;	
	var new_y_pos = Math.ceil($('#'+screens[current_screen]).offset().top);
	$("html, body").animate(
		{scrollTop: new_y_pos },
		screen_animation_time,
		'easeInOutExpo',
		function() { scroll_ready = true;}
	);		
}

function prevent_scroll() {
	var new_y_pos = Math.ceil($('#'+screens[current_screen]).offset().top);
	$(window).scrollTop(new_y_pos);
}

// Binds Key Up / Key Down for Scrolling
function setup_key_scroll_handler() {
	$(document).bind("keyup", function (event) {
		if (event.keyCode == 40 || event.keyCode == 38) {
			event.preventDefault();
			if (event.keyCode == 40) {
				if (scroll_ready == true) {
					scroll_next();
				}
			} else {
				if (event.keyCode == 38) {
					if (scroll_ready == true) {
						scroll_prev();
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
function unbind_keys() {
	$(document).unbind("keyup");
	$(document).unbind("keydown");
}
$("input, textarea, select").live("focus", function () { unbind_keys(); });
$("input, textarea, select").live("blur", function () {setup_key_scroll_handler(); });
