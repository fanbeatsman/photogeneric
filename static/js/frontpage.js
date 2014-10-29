
var colors=[{}]

function init(){

}


$(function(){
	

$(".banners").hover(
	function(){
		$(this).fadeTo(100,0.7);
	},
	function(){
		$(this).fadeTo(100,1);
	});

$(".Intro").click(
	function(){
		$('.introtext').toggle("fast");

	});
$(".Gallery").click(
	function(){
		window.location = "/photoapp/upload_picture/" + this.id;
	});
});