(function () {
  var width = 1000,
    height = 1000;

   
  
  var svg = d3.select("#chart")
    .append("svg")
    .attr ("height",height)
    .attr ('width', width)
    .append("g")
    .attr("transform", "translate(0,0)")



  var radiusScale = d3.scaleSqrt().domain([2374999,12300000]).range([30,100])



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

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }



    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#ffffff")
    .text("a simple tooltip")
    .style('font-family', '"Helvetica", sans-serif')
 


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
              return "#00293c"
          }
          else if (industry === "1") {
              return "#257985"
          }
          else if (industry === "2") {
            return "#5ea8a7"
          }
          else if (industry === "3") {
          return "#484748"
          }
          else if (industry === "4") {
          return "#ff4447"
          }
        
      

      }
    
      
    )
    .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended))



      .on("mouseover", function(d,i){
      
      console.log("mouseover on", this)
         tooltip.text(d.organisation_name+' has spent'+' € '+d.lobbying_costs+" in EU lobbying costs."); return tooltip.style("visibility", "visible")
         && d3.select(this)
           .transition()
           .duration(100)
           .attr('stroke', '#ffffff')
           .attr('stroke-width', '2')
           
      ;})


      .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(d,i){
        console.log("mouseout", this)    
        return tooltip.style("visibility", "hidden")
        && d3.select(this)
                  .transition()
                  .duration(100)
                  .attr('stroke', '#000000')
                  .attr('stroke-width', '0')
                  
                  ;})


      var labels = svg.selectAll (".organisation_label")
      .data(datapoints)
      .enter().append('text')
      .attr('class', "organisation_label")
      .text(function(d) {
        return d.organisation_label;
      })
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff")
      .attr('textLength',"50")
      .attr('lengthAdjust',"spacingAndGlyphs")
      .style('font-family', '"Helvetica", sans-serif')
      .style('font-size', '12px')




      var $window = $(window);
      var $elem = $(".animation")
      
      function isScrolledIntoView($elem, $window) {
          var docViewTop = $window.scrollTop();
          var docViewBottom = docViewTop + $window.height();
      
          var elemTop = $elem.offset().top;
          var elemBottom = elemTop + $elem.height();
      
          return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
      }
      $(document).on("scroll", function () {
          if (isScrolledIntoView($elem, $window)) {
              $elem.addClass("animate")
          }
      });


      
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
}) ()



;
