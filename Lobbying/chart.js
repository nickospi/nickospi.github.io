(function () {
  var width = 1000,
    height = 700;

    
  var svg = d3.select("#chart")
    .append("svg")
    .attr ("height",height)
    .attr ('width', width)
    .append("g")
    .attr("transform", "translate(0,0)")
  

  var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .force("collide", d3.forceCollide(function(d){
      return radiusScale(d.lobbying_costs) + 1;
    
    }))
     
  d3.queue()
    .defer(d3.csv,'lobby.csv')
    .await(ready)
  
  function ready (error, datapoints) {

    var circles = svg.selectAll (".organisation_name")
      .data(datapoints)
      .enter().append('circle')
      .attr('class', "organisation_name")
      .attr('r', function(d) {
        return radiusScale(d.lobbying_costs);
      })
      d3.selectAll("circle")
      .style('fill', function(d) {
        if(d >= 2) {
          return 'red';
        } else {
          return 'green';
        }
      })
      .on('click', function(d){
        console.log(d)

      })
     
    simulation.nodes(datapoints)
      .on('tick', ticked)
      
    function ticked() {
      circles
        .attr("cx", function (d) {
          return d.x
        })
        .attr("cy", function (d) {
          return d.y
        })
  }
}
}) ();