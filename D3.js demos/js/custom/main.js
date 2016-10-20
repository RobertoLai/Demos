'use strict'
/**
* Just few snippets to get aquainted with the D3.js library
*
*/
function demo1(){

  // reset demo area
  $('#demoArea').html('');

  var dataset = [5, 10, 15, 20, 25];
  var chart = d3.select('#demoArea').selectAll('div')
    .data(dataset)
    .enter()
    .append('div')
    .attr('class','bar')
    .style('height',function(d) {
      return d * 5 + 'px';
    })


  d3.select('#demoArea')
  .append('div')
  .attr('class','legend')
  .html('dataset: ' + dataset)
}
function demo2(dataSize=10){
  // reset demo area
  $('#demoArea').html('');

  var multiplier = 10;
  //same width as the container #demoArea
  var w = $('#demoArea').css('width').replace('px','')
  var h = $('#demoArea').css('height').replace('px','') - 40;

  // standard javascript version
  // var dataset = new Array(dataSize);
  // dataset.fill(1,0,dataset.length);
  // var dataset = dataset.map(function(el){
  //   return Math.ceil(Math.random() * 50)
  // })

  //with lodash
  var dataset = _.map(_.range(dataSize), function(i){
    return Math.ceil(Math.random() * 500 );
  })

  $('#demoArea').append('div').html('<p>' + dataset + '</p>')
  var svg = d3.select('#demoArea')
    .append('svg')
    .attr('width', w)
    .attr('height', h)


 var xScale = d3.scaleBand()
   .domain(dataset)
   .range([0, w]);

  var yScale = d3.scaleLinear()
     // * 1.1 will add some padding
    .domain([0, d3.max(dataset) * 1.1])
    .range([0, h])

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class','bar-svg')
    .attr('x',function(d, i) {
      //generalize this with xScale later
      //return i * 33 + 3;
      return xScale(d);

    })
    .attr('y', function(d) {
      return h - yScale(d) ;
    })
    .attr('width', 30)
    .attr('height', function(d){
      return  yScale(d);
    })

}
function demo3(){

}
