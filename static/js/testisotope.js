function addSwitchViews(containerNudge){

	$('#switchView').click(function(){
		$(".gallery").toggleClass("biggerPackery");
		$("img").toggleClass("biggerImage");
		$(".item").toggleClass("biggerItem");

	});
}




$(function(){

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
		rowHeight: 80,

	});

	imagesLoaded( $container, function() {
		$container.packery();
	});

	$container.find('.item').each( function( i, itemElem){
		var draggie = new Draggabilly(itemElem);
		$container.packery('bindDraggabillyEvents', draggie);
	});


	addSwitchViews($container);	


});
