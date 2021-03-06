legends.js#

var width = 500;
var height = 75;
var svgw = 20;
var svgh = 20;

d3.tsv("nyc.stats.tsv", function(data) {
        legendVals = d3.set(data.map( function(d) { return d.COUNTY } ) ).values()
        
        console.log(legendVals)
        
        var legendVals1 = d3.scale.ordinal()
            .domain(legendVals)
            .range(["#1F77B4", "#FF7F0E", "#2CA02C"]);
        
        var legendVals2 = ["Queens", "Kings", "Bronx", "Manhatan","Richmond"]
        var color = d3.scale.category10()
        
        var svgLegned3 = d3.select(".legend3").append("svg")
            .attr("width", width).attr("height", height)
            
        //D3 Vertical Legend//////////////////////////
        var legend3 = svgLegned3.selectAll('.legend3')
            .data(legendVals1.domain())
            .enter().append('g')
            .attr("class", "legends3")
            .attr("transform", function (d, i) {
            {
                return "translate(0," + i * 20 + ")"
            }
        })
        
        legend3.append('rect')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
            return color(i)
        })
        
        legend3.append('text')
            .attr("x", 20)
            .attr("y", 10)
        //.attr("dy", ".35em")
        .text(function (d, i) {
            return d
        })
            .attr("class", "textselected")
            .style("text-anchor", "start")
            .style("font-size", 15)
        
/////////D3 Horizonal Lengend 1///////////////////////////
        var svgLegned4 = d3.select(".legend4").append("svg")
            .attr("width", width)
            .attr("height", height - 50)
        
        var dataL = 0;
        var offset = 80;
        
        var legend4 = svgLegned4.selectAll('.legends4')
            .data(legendVals2)
            .enter().append('g')
            .attr("class", "legends4")
            .attr("transform", function (d, i) {
             if (i === 0) {
                dataL = d.length + offset 
                return "translate(0,0)"
            } else { 
             var newdataL = dataL
             dataL +=  d.length + offset
             return "translate(" + (newdataL) + ",0)"
            }
        })
        
        legend4.append('rect')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
            return color(i)
        })
        
        legend4.append('text')
            .attr("x", 20)
            .attr("y", 10)
        //.attr("dy", ".35em")
        .text(function (d, i) {
            return d
        })
            .attr("class", "textselected")
            .style("text-anchor", "start")
            .style("font-size", 15)
            
/////////D3 Horizonal Legend 2////////////////////////////////
        var legend5 = d3.select('.legend5').selectAll("legend")
            .data(legendVals)
        
        legend5.enter().append("div")
        .attr("class","legends5")
        
        var p = legend5.append("p").attr("class","country-name")
        p.append("span").attr("class","key-dot").style("background",function(d,i) { return color(i) } ) 
        p.insert("text").text(function(d,i) { return d } ) 

///////////D3 Horizonal Legend 3/////////////////////////////
        var legend6 = d3.select('.legend6').selectAll("legend")
            .data(legendVals)
        
        legend6.enter().append("div")
        .attr("class","legends6")
        
        legend6.html(function(d,i) { return d } ).style("color", function(d,i) { return color(i) } )
    
//////////D3 Reusable Legend////////////////////////////

d3.edge = {};
d3.edge.reuselegend = function module() {
  function exports(_selection) {
    _selection.each(function (_data) {
        d3.select(this)
            .selectAll("legend").data(_data)
            .enter().append('div')
                .attr("class", "legends7")
                .html(function (d, i) {
                    return d.toUpperCase()
                })//.style("color","red")
                .style("color", function (d, i) { return color(i) })
        })
    }
    return exports;
}

var rlegend = d3.edge.reuselegend()
d3.select(".legend7").datum(legendVals).call(rlegend)

})
