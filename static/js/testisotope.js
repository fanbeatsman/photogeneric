var x = 0;
var images = new Array();
var items = new Array();

function addSwitchViews(){

	$('#switchView').click(function(){
		$(".gallery").toggleClass("biggerPackery");
		$("img").toggleClass("biggerImage");
		$(".item").toggleClass("biggerItem");


		$(".packery").packery({
			"isHorizontal":true
		});

	});
}

function addhistoryMode(button){
	button.click(function(){

		//initiate Skrollr
		/*skrollr.init({
                forceHeight: false
        });*/


		var dates = new Array();
		var i =0;
		var f = 0;
		$("img").each(function(){

		$(this).attr("data-"+String(f),"opacity: 1;");
		$(this).attr("data-"+String(f+500),"opacity: 0.4;")
		items.push($(this));	
		dates[i]=$(this).attr("date");
		i++;
		f=f+500;

		images.push($(this));
	});

		//when H is clicked, these are things I do on the "item" class
		var j=0;

		$('.item').each(function(){
		$(this).attr("data-"+String(j),"opacity: 1;");
		$(this).attr("data-"+String(j+500),"opacity: 0;")
		items.push($(this));
		j=j+500;

});



		console.log(images);
		console.log(images[x]);
		dates.sort(function(a,b){
			return new Date(b.date)-new Date(a.date);
		});
		//$('.item').fadeToggle();
		$('.navbar').fadeToggle();
		$('.packery').attr('style','height:2000px;width:100%;position:absolute;top:0px;left:0px;');
		$('.packery').toggleClass("fullscreen");
		$("img").toggleClass("historyImg");
		
skrollr.init({
                forceHeight: false
        });
//$(".item").toggleClass("historyItem");
//couldnt find answer to this, what i did is for each item, givce it a cummulatve margin made of all 
//its previous items' widths combined
var marginCount = 0;
$('.item').each(function(){
	$(this).attr('style',("margin-left:"+marginCount+";"+"position:fixed;"))
	marginCount = marginCount + $(this).css("width");
});

	});
}

function centerImage(){
	var offset = 0;
	$(".item").each(function(){
		offset = $(this).width();
	});
	offset = offset;
}



$(function(){

	//skrollr.init({forceHeight: false});
	$("img").each(function(){
		console.log($(this).attr("date"));
	});

	var heights = new Array();
	var heightsIndex = {};
	var i = 0;
	/*$('.packery img').each(function(){
		heights.push($(this).css('height'));
		heightsIndex[$(this).css('height')] = i;
		i++;
	});*/



	var $container = $('.packery').packery({
		columnWidth: 80,
		rowHeight: 80,

	});

	imagesLoaded( $container, function() {
		$container.packery();
	});

	/*$container.find('.item').each( function( i, itemElem){
		var draggie = new Draggabilly(itemElem);
		$container.packery('bindDraggabillyEvents', draggie);
	/*	for(var key in $(this)){
			console.log($(this)[key]);
		}/
		console.log($(this).hasOwnProperty(itemElem));
	});*/


	addSwitchViews($container);	
	addhistoryMode($('#historyMode'));


});
