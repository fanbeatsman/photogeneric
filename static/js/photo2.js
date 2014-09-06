$(function() {
	
	var divinfo = {"initial": []};
	
	/*index of the selected or clicked box */
	var current = -1;
	
	$('#littleboxes > div').each(function(){
		/* jqeury wrapped version of the element with the methods provided by jequery */
		var $this = $(this);

		var initial = {
			'index' : $this.index(),
			'left' : $this.css('left'),
			'top' : $this.css('top'),
		};
		divinfo.inital.push(initial);
	});

	/* click event for the anchors inside of the boxes */
}
