(function () {
  var width = 500,
    height = 500;

  var svg = d3.select("#chart")
    .append("svg")
    .attr ("height",height)
    .attr ('width', width)
    .append("g")
    .attr("transform", "translate(0,0)")
  
  d3.queue()
    .defer(d3.csv,'lobby.csv')
    .await(ready)
  
  function ready (error, datapoints) {

    var circles = svg.selectAll (".organisation_name")
      .data(datapoints)
      .enter().append('circle')
      .attr('class', 'organisation_name')
      .attr('r', 10)
      .attr ('fill','lightblue')
      .attr ("cx", 100)
      .attr ("cy", 300)

  }

})();