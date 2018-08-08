(function () {
  var width = 1000,
    height = 1000;

  
  
  var svg = d3.select("#chart")
    .append("svg")
    .attr ("height",height)
    .attr ('width', width)
    .append("g")
    .attr("transform", "translate(0,0)")



  var radiusScale = d3.scaleSqrt().domain([2374999.5,12300000.0]).range([40,100])



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



    var circles = svg.selectAll (".organisation_circle")
      .data(datapoints)
      .enter().append('circle')
      .attr('class', "organisation_circle")
      .attr('r', function(d) {
        return radiusScale(d.lobbying_costs);
      })
      .attr ('fill', function(d)
      {
          industry = d.industry.substring(0,4)
          if (industry === "0") {
              return "#1a2634"
          }
          else if (industry === "1") {
              return "#203e5f"
          }
          else if (industry === "2") {
            return "#ffcc00"
          }
          else if (industry === "3") {
          return "#B1CAFE"
          }
          else if (industry === "4") {
          return "#655b46"
          }
      

      })

      var labels = svg.selectAll (".organisation_name")
      .data(datapoints)
      .enter().append('text')
      .attr('class', "organisation_name")
      .text(function(d) {
        return d.organisation_name;
      })
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr('textLength',"70")
      .attr('lengthAdjust',"spacingAndGlyphs")
      .style('font-family', '"Open Sans", sans-serif')
      .style('font-size', '14px')


      
datapoints.forEach(function(d) {
  d.x = width / 2
  d.y = height / 2
})


    simulation.nodes(datapoints)
      .on('tick', ticked)
      
    function ticked() {
      console.log(labels.length)
      circles
        .attr("cx", function (d, i) {
          d3.select(labels.nodes()[i]).attr("x", d.x)
          return d.x
        })
        .attr("cy", function (d, i) {
          d3.select(labels.nodes()[i]).attr("y", d.y)
          return d.y
        })
  }
}
}) ();