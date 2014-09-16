/*TRY CHANGING THIS SHIT SO IT DOESNT NEED TO USE THE DATA() METHOD*/


//  --- Begin Config ---
var preloadPicture = 3;                // Number of pictures to preload before showing gallery
var loadingMessageDelay = 2000;       // How long to wait before showing loading message (in ms)
var loadingMessageSpeed = 1200;       // Duration of each pulse in/out of the loading message (in ms)
var loadingMessageMinOpacity = 0.4;   // Minimum opacity of the loading message
var loadingMessageMaxOpacity = 1;     // Maximum opacity of the loading message
var captionSpeed = 1200;              // Duration of the caption fade in/out (in ms)
var captionOpacity = 0.5;             // Maximum opacity of the caption when faded in
var swipeXThreshold = 30;             // X-axis minimum threshold for swipe action (in px) 
var swipeYThreshold = 90;             // Y-axis maximum threshold for swipe action (in px) 
var leftKeyCode = 37;                 // Character code for "move left" key (default: left arrow)
var rightKeyCode = 39;                // Character code for "move right" key (default: right arrow)
var currentPictureOpacity = 1.0;        // Opacity of the current (centre) picture
var backgroundPictureOpacity = 0.5;     // Opacity of the pictures either side of the current picture
//  --- End Config ---



var pictureHorizMargin = 1;             // Number of pixels either side of each picture
var buttonHeight = 600;                 // Temporary store for the button heights
var currentPicture = 0;                 // The picture that the user is currently viewing
var totalPictures = 0;                  // Total number of pictures in the gallery
var pictures = new Array();             // Holds jQuery objects representing each picture image
var pictureWidths = new Array();        // Holds the widths (in pixels) of each picture
var pictureLoaded = new Array();        // True if the given picture image has loaded
var loading = true;                   // True if we're still preloading images prior to displaying the gallery


function handlePictureLoad(){

	/*storing picture widths*/
	pictureWidths[$(this).data('picNum')] = $(this).width();
	/* increase picture-display's div width to accomodate*/
	$('.picture-display').width($('.picture-display').width() + $(this).width() + pictureHorizMargin*2);
	/*record the fact that the picture has loaded*/
	pictureLoaded[$(this).data('picNum')] = true;

	/* handle the fact that I only show pictures after at least 3 pictures are loaded */
	if (loading) {

		var preloaded = 0;

		for ( var i=0; i < preloadPicture; i++){
			if (pictureLoaded[i]) preloaded++;
		}

		if (preloaded == preloadPicture || preloaded == totalPictures){
			$('.picture-display').css('top', 0);
			$('.picture-display').fadeTo('fast', 1);
			$('#leftButton').css('height', buttonHeight);
			$('#rightButton').css('height', buttonHeight);
			$('#rightButton').show();
			addHoverText();
			loading = false;
		}

	}

	if ( $(this).data('picNum') == 0 ){
		centerCurrentPicture();
		$(this).fadeTo('slow', currentPictureOpacity);
	}
	else{
		$(this).fadeTo('slow', backgroundPictureOpacity);
	}
}
function moveLeft(){

	/* dont do anything if its first slide or if the previous slide doesnt havee width */
	/*if ( currentPicture == 0 ) return;
	if ( pictureWidths[currentPicture-1] == undefined) return;*/

	/* cancel event handlers on current slide for captions and shits*/
	pictures[currentPicture].unbind('mouseenter').unbind('mouseleave').unbind('touchstart');

	/* stop the caption*/
	$('#caption').stop().clearQueue().hide();

	/* move all to the right */
	var offset = pictureWidths[currentPicture]/2 + pictureHorizMargin*2 + pictureWidths[currentPicture-1]/2;
	$('.picture-display').animate({'left': '+=' + offset}); /*change this later*/

	/*out with the old and in with the new*/
	pictures[currentPicture].animate( {opacity: backgroundPictureOpacity});
	pictures[currentPicture-1].animate({opacity: currentPictureOpacity});

	currentPicture = currentPicture - 1;
	setButtonState();
	$('#caption').html(pictures[currentPicture].attr('alt'));
	addHoverText();		

}
function moveRight(){
	if (currentPicture == totalPictures) return;
	/*if (pictureWidths[currentPicture+1] == undefined) return;*/

	/* stop the caption*/
	$('#caption').stop().clearQueue().hide();

	pictures[currentPicture].unbind('mouseenter').unbind('mouseleave').unbind('touchstart');
	var offset = pictureWidths[currentPicture]/2 + pictureHorizMargin*2 + pictureWidths[currentPicture+1]/2;
	$('.picture-display').stop().animate({left: '-=' + offset});	

	pictures[currentPicture].animate( {opacity: backgroundPictureOpacity});
	pictures[currentPicture+1].animate({opacity: currentPictureOpacity});

	currentPicture = currentPicture + 1;
	setButtonState();

	$('#caption').html(pictures[currentPicture].attr('alt'));
	addHoverText();				
}

function centerCurrentPicture(){
	var offsetFromStart = 0;
	for (var i=0; i<currentPicture; i++) {
		offsetFromStart += pictureWidths[i] + pictureHorizMargin*2;
	}
	/*finding horizontal center of the browser window, but i think the value is absolute of the hole viewport*/
	var windowCenter = $(window).width()/2;
	/*where is the left point of the current picture?*/
	var leftPos = windowCenter - ( pictureWidths[currentPicture]/2) - pictureHorizMargin;
		/*the actual absolute offset is the left absolute position MINUS all the offset
		from the beginning*/ 
		var actualOffset = leftPos - offsetFromStart - 15; /* small correction, dont know why, must be cause of bootstrap again*/


		$('.picture-display').animate({left: actualOffset}, 300, 'easeOutBack');

	}

	function setButtonState(){
		if (currentPicture == 0){
			$('#leftButton').hide();
		}
		else{
			$('#leftButton').show();
		}

		if (currentPicture == totalPictures-1)
		{
			$('#rightButton').hide();
		}
		else{
			$('#rightButton').show();
		}
	}

	function addHoverText(){
		if('ontouchstart' in document.documentElement){
			pictures[currentPicture].bind('touchstart', function(){
				if ($('#caption').is(':visible')){
					$('#caption').stop().clearQueue().fadeOut(captionSpeed);
				}
				else
				{
					$('#caption').stop().clearQueue().fadeIn(captionSpeed, captionOpacity);
				}
			});
		}
		else{
			pictures[currentPicture].hover(
				function(){$('#caption').stop().fadeTo(captionSpeed, captionOpacity)},
				function(){$('#caption').stop().fadeTo(captionSpeed, 0)}
				);
		}
	}


	function init(){
		pictureHorizMargin = parseInt($('.picture-display img').css('margin-left'));

		/* hide gallery and buttons */
		$('.picture-display').fadeTo(0,0);
		$('.picture-display').css('top',"-999em");
		buttonHeight = $('#leftButton').css('height');
		$('#leftButton').css('height',0);
		$('#rightButton').css('height',0);

		/*at load, do handlePictureLoad*/
		$('.picture-display img').load(handlePictureLoad);
		/*storing pictures in picture array and counting them*/
		$('.picture-display img').each(function(){
			/*$(this).hide();
			$(this).data( 'picNum', totalPictures );
			pictures[totalPictures++] = $(this);*/

		$(this).hide();
		$(this).data('picNum', totalPictures);
		pictures.push($(this));
		totalPictures = totalPictures + 1;
		if ( this.complete ) $(this).trigger("load");
		$(this).attr('src', $(this).attr('src'));
	});

		$(window).resize( centerCurrentPicture );
		setButtonState();

		$('#caption').html( pictures[currentPicture].attr('alt'));

		addHoverText();

	/*if ( !$.browser.msie ) {

		$('.picture-display').swipe( {
			swipeLeft: moveRight,
			swipeRight: moveLeft,
			threshold: { x:swipeXThreshold, y:swipeYThreshold }
		} ); 
}MOBILE stuFF*/

$(document).keydown(function(event){
	if (event.which == leftKeyCode) moveLeft();
	if (event.which == rightKeyCode) moveRight();
});
/*added an event for navbar fade in/out as mouse hovers . 2 event handlers for in and out*/
$('.navbar').fadeTo(200,0.5);
$('.navbar').hover(function(){$('.navbar').fadeTo(100,1);}, function(){$('.navbar').fadeTo(100,0.5);});

}

function addswitchView(){

	$('#switchView').click(function(){
		$("img").toggleClass("smaller");
		$(".tag-class").toggleClass("picture-display packery").init();

	});

}


$(function(){

	//ISOTOPE TEST
	var heights = new Array();
	var heightsIndex = {};
	var i = 0;
	$('.packery img').each(function(){
		heights.push($(this).css('height'));
		heightsIndex[$(this).css('height')] = i;
		i++;
	});
	var $container = $('.packery').packery({
		columnWidth: 80,
		rowHeight: 80
	});
	$container.find('.item').each( function( i, itemElem){
		var draggie = new Draggabilly(itemElem);
		$container.packery('bindDraggabillyEvents', draggie);

	});

	/*init();

	$('.btn search-query').css();
	$('img').attr('alt','Image Caption');
	$('hr').fadeTo(1,0);/* annoying hr*/
	addswitchView();

});
