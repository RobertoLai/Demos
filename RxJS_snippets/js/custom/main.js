'use strict'
/**
* Just few snippets to get aquainted with the RxJS.js library
*
*/


/**
* concatAll flatten a 2-dim Array into a 1 dim array
*/
Array.prototype.concatAll =  function(){
	var results = [];
	this.forEach(function(subArray){
		subArray.forEach(function(item){
			results.push(item);
		})
	})

	return results;
}

/**
* function demo1
*/
function demo1(){
	var button = document.getElementById('demo1');

	/**
	* DOM solution
	*/
	//var handler = function(e){
	//	alert('click');
	//	button.removeEventListener('click', handler);
	//}
	//
	//button.addEventListener('click', handler);

	/**
	* Asynchronous way with reactive js library RxJS
	*/
	var observable = Rx.Observable;
	var clicks = observable.fromEvent(button, 'click');

  if (!points){
			$('#demoArea').html('You have subscribed, now click again to get positions')
	}
	var points = clicks.map(function(click){
		console.log('Console: clicked on (' + click.clientX + ',' + click.clientY +')');
		return { x:click.clientX, y: click.clientY }
	})

  // Notice: Observables are lazy, so if I comment out this subscription code,
	// nothing will be printed in the console
	var subscription = points.forEach(
		function onNext(e){
			$('#demoArea').html('You have clicked on (' + e.x + ',' + e.y +')');
			//to test unsubscription
			//subscription.dispose();
		},
		function onError(error){
			console.log('Error!');
		},
		function onComplete(){
			console.log('completed');
		}
	);
}//end demo1

/**
* function demo2: drag a square around a parent
*/
function demo2(){

	var widget = `
	<p class="lead text-center">Drag the square inside the green zone, only movements inside this zone are authorized</p>
	<div id="widget" class="widget">
	<div id="dragger" class="dragger">Drag me!</div>
	</div>`

  $('#demoArea').html('');
	$('#demoArea').append(widget)


  var observable = Rx.Observable;
	var draggerClicked = observable.fromEvent($('#dragger'),'mousedown')
	var parentMoves = observable.fromEvent($('#widget'),'mousemove')
	var parentUps = observable.fromEvent($('#widget'),'mouseup')

  //save the absolute initial position of the dragger
	var x = $('#dragger').offset().left
	var y = $('#dragger').offset().top

  //concatAll will flatten the 2-dim Array
  var drags = draggerClicked
             .map(function(e){ return parentMoves.takeUntil(parentUps); })
						 .concatAll();

	drags.forEach(
		function onNext(e){
			//e.clientX,Y return the absolute position so
			//I substract the absolute positions of the square to move it relative to his position
			//+1 will prevent the cursor to be stuck inside the square
			$('#dragger').css({'left': e.clientX - x + 1,'top':e.clientY - y + 1});
		},
		//the following functions are not necessary for this code, but I keep it anyway
		function onError(error){},
		function onComplete(e){}
	)


}//end demo2

//just a test for concatAll
function demo3(){


	var array_1_dim = ['d1', 'd2', 'd3', 'd4']
	var array_1_dim_bis = ['d1.2', 'd2.2', 'd3.2', 'd4.2']
	var array_2_dim = [array_1_dim, array_1_dim_bis] //2-dim array


	console.log(array_2_dim)
	var ary_flattened2 = array_2_dim.concatAll()
  console.log(ary_flattened2)


	var array_3_dim = [array_2_dim, array_2_dim] //3-dim array
	console.log(array_3_dim)
	var ary_flattened3 =
		array_3_dim
		.concatAll()
		.concatAll()
  console.log(ary_flattened3)


	var array_4_dim = [array_3_dim, array_3_dim] //4-dim array
	console.log(array_4_dim)
	var ary_flattened4 =
		array_4_dim
		.concatAll()
		.concatAll()
		.concatAll()
	console.log(ary_flattened4)

	$('#demoArea').html(`TEST: Flattening	of 3 arrays of dimension 2, 3, 4 with the function concatAll.
		<br><br>
		code example:<br>
		<code>
		var ary_flattened4 =
			array_4_dim
			<br>.concatAll()
			<br>.concatAll()
			<br>.concatAll()
		</code>
		<br><br>Open the Chrome console (Ctrl+Shift+I) to see the logs<br><br><br>

<b>2-dim array</b>:<br> [['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']]<br><b>`
+ ary_flattened2 +`</b><br><br><br>
<b>3-dim array</b>:<br> [[['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']],[['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']]]<br><b>`
+ ary_flattened3 +`</b><br><br><br>
<b>4-dim array</b>:<br> [[[[['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']],[['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']]]],
						[[[['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']],[['d1', 'd2', 'd3', 'd4'], ['d1.2', 'd2.2', 'd3.2', 'd4.2']]]]
					]<br><b>`
+ ary_flattened4 +'</b>')

}//end demo3
