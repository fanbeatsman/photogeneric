
var colors=[{}]



$(function(){
	console.log("READY");
$(".banners").hover(
	function(){
		$(this).fadeTo(100,0.7);
	},
	function(){
		$(this).fadeTo(100,1);
	});

});