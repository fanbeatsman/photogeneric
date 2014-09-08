$(function() {
	
	var divinfo = {"initial": []};
	
	/*index of the selected or clicked box */
	var current = -1;
	
	$('#littleBoxes > div').each(function(){
		/* jqeury wrapped version of the element with the methods provided by jequery */
		var $this = $(this);

		var initial = {
			'index' : $this.index(),
			'left' : $this.css('left'),
			'top' : $this.css('top'),
		};
		divinfo.initial.push(initial);
	});

	/* click event for the anchors inside of the boxes */
	$('#littleBoxes a').bind('click',function(e){
		var $this = $(this);
		var $currentBox = $this.parent();

		/* setting z-index (the layer of the element) behind everything */
		$currentBox.css('z-index', '1');

		/*if clicking on an expanded box */
		if (current == $currentBox.index()){

			/* animate the box back knowing where it was originally thanks to divinfo*/
			$currentBox.stop().animate({
				'top': divinfo.initial[$currentBox.index()].top,
				'left': divinfo.initial[$currentBox.index()].left,
				'width': '90px',
				'height': '90px'
			},800,'easeOutBack').find('.boxcontent').fadeOut();

			$('#littleBoxes > div').not($currentBox).each(function(){
				var $ele = $(this);
				var elemTop = divinfo.initial[$ele.index()].top;
				var elemLeft = divinfo.initial[$ele.index()].left;
				$ele.stop().show().animate({
					'top': elemTop,
					'left': elemLeft,
					'opacity': 1
				},800);
				current = -1;
			})
		}

		/*if clicking a small box*/
		else{

			/*random number between -150 and 450 */
			$('#littleBoxes >div').not($currentBox).each(function(){
				$ele = $(this)
				$ele.stop().animate({
					'top': (Math.floor(Math.random()*601))-150 + 'px',
					'left': (Math.floor(Math.random()*601))-150 + 'px',
					'opacity':0
				},800,function(){
					$(this).hide();
				});
			});

			var newWidth = 379;
			var newHeight = 379;
			$currentBox.stop().animate({
				'top':'0px',
				'left':'0px',
				'height':newHeight,
				'width':newWidth,
			},800,'easeOutBack',function(){
				current = $currentBox.index();
				$(this).find('.boxcontent').fadeIn();
			});		
		}
		e.preventDefault();
	});
});
