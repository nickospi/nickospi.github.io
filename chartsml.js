(function () {


    var decades = [   
      {
        name: '60s',
        songs: 48,

      },
      {
        name: '70s',
        songs: 89,

      },
      {
        name: '80s',
        songs: 39,
      },
      {
        name: '90s',
        songs: 62,
      },
      {
        name: '00s',
        songs: 25,
      },
      {
        name: '10s',
        songs: 32,
      }
    
  ]  
var height = 200,
width = 1000,
padding = 100;

var svg = d3.select("body")
.append("svg")
.attr("height", height + padding * 2)
.attr("width", width + padding * 2)
.append("g")
.attr("transform", "translate(100 100)")


var names = decades.map(function(d) { return d.name })
var songNames = decades.map(function(d) { return +d.songs }),
minPop = d3.min(songNames),
maxPop = d3.max(songNames);

var maxSongs = 295

var xPositionScaleName = d3.scalePoint().domain(names).range([0, width])
var colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(['#ffffff','#e7298a'])
var colorScaleName = d3.scaleOrdinal().domain(names).range(['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854'])


var defaultRadius = 20;
var maxRadius = 100;
var sizeScale = d3.scaleSqrt().domain([0, maxPop]).range([0, maxRadius])

var xPositionScalesongs = d3.scaleLinear().domain([0, maxPop]).range([0, width])


var nline = svg.append("line")
.attr("x1", 0)
.attr("x2", width)
.attr("y1", height / 2)
.attr("y2", height / 2)
.attr("stroke", "white")
.attr("opacity", 0)


var ngroups = svg.selectAll("g")
.data(decades)
.enter().append("g")
.attr("transform", "translate(" + (width / 2) + " " + (height / 2) + ")")


var ntext = ngroups.append("text")
.text(function(d) {
return d.name
})
.attr("text-anchor", "middle")
.attr("opacity", 0)
.attr("dy", defaultRadius + 40)

var nlabeltext = ngroups.append("text")
.text(function(d) {
return d.songs+" song lyrics"
})
.attr("text-anchor", "middle")
.attr("opacity", 0)
.attr("dy", defaultRadius + 40)


// var textZero = groups.append("text")
//   .text(function(d) {
//     return maxSongs+ " song lyrics written by Bowie and dating from the 60's up to 2015 have been analyzed.[Hit Space]"
//   })
//   .attr("text-anchor", "middle")
//   .attr("opacity", 1)
//   .attr("dy", defaultRadius*3 + 40)


var ncircles = ngroups.append("circle")
.attr("r", defaultRadius*3)
.attr("fill", 'white')
.style("fill-opacity", 0)



//function circleTransition() { 


// var plsCircles = groups.append("circle")
//   .attr("r", defaultRadius*2)
//   .attr("fill", 'white')

//   repeat();

// function repeat() {
//   plsCircles
//     .transition()        
//     .duration(500)      
//     .attr("r", defaultRadius*2)
//     .attr("fill","white")


//     .transition()       
//     .duration(500)      
//     .attr("r", defaultRadius)
//     .attr("fill","white")
//     .on("end", repeat);  
// };

// };

// circleTransition();



// var steps = [
//   step0,
//   step1,
//   step2
// step3
// step4,
//step5,
//step6
//]

// <!-- 
// var imgsix = svg.append("svg:image")
// .attr("xlink:href", "style/images/sixties.png")
// .attr("width", "80")
// .attr("height", "80")
// .attr('x',  width/4-200)
// .attr("visibility","hidden")

// var imgseven = svg.append("svg:image")
// .attr("xlink:href", "style/images/seventies.png")
// .attr("width", "80")
// .attr("height", "80")
// .attr('x', width/4)
// .attr("visibility","hidden")

// var imgeight = svg.append("svg:image")
// .attr("xlink:href", "style/images/eighties.png")
// .attr("width", "80")
// .attr("height", "80")
// .attr('x', width/4+200)
// .attr("visibility","hidden")

// var imgnine = svg.append("svg:image")
// .attr("xlink:href", "style/images/nineties.png")
// .attr("width", "80")
// .attr("height", "80")
// .attr('x', width/4+400)
// .attr("visibility","hidden")


// var imgten = svg.append("svg:image")
// .attr("xlink:href", "style/images/zeroes.png")
// .attr("width", "80")
// .attr("height", "80")
// .attr('x', width/4+600)
// .attr("visibility","hidden")


// var currentStep = 0

// d3.select("body").on("keyup", function() {
//   console.log(d3.event.code)
//   if(d3.event.code === "Space" || d3.event.code === "ArrowRight") {
//     currentStep = (currentStep + 1) % 3
//     steps[currentStep].apply()
//   }
//   if(d3.event.code === "ArrowLeft") {
//     currentStep = currentStep < 1 ? 3 : currentStep - 1
//     steps[currentStep].apply()
//   }
// })

// function makeTranslate(x, y) {
//   return "translate(" + x + " " + y + ")"
// }


// function step0() {
//   line.transition().attr("opacity", 0)

//   groups.transition()
//     .duration(1000)
//     .attr("transform", makeTranslate(width / 2, height / 2))

//   circles.transition()
//     .duration(1000)
//     .attr("r",defaultRadius*3)
//     .style("fill-opacity", 1)
//     .style("fill", '#ffffff')
//     .style("stroke-width", 0)


//   text.transition()
//     .duration(1000)
//     .attr("opacity", 0)

//   textZero.transition()
//     .duration(500)
//     .attr("text-anchor", "middle")
//     .attr("opacity", 1)
//     .attr("dx", 0)
//     .attr("dy", defaultRadius*3 + 40)


// labeltext.transition()
// .duration(1000)
//     .attr("opacity", 0)
//     .attr("dy", function(d) {
//       return sizeScale(d.songs) + 40
//     })
//     .attr("dx", 0)
//     .attr("text-anchor", "middle")



// }

// function step1() {
//   line.transition().attr("opacity", 2)


// textZero.transition()
//     .duration(250)
//     .attr("text-anchor", "middle")
//     .attr("opacity", 0)
//     .attr("dx", 0)
//     .attr("dy", defaultRadius*3 + 40)


//   groups.transition()
//     .duration(1000)
//     .attr("transform", function(d) {
//       return makeTranslate(xPositionScaleName(d.name), height / 2)
//     })

//   circles.transition()
//     .duration(1000)
//     .attr("r", defaultRadius*2)
//     .style("fill-opacity", 1)
//     .style("fill", '#ffffff')
//     .style("stroke-width", 0)



//   text.transition()
//     .duration(1000)
//     .attr("text-anchor", "middle")
//     .attr("opacity", 1)
//     .attr("dx", 0)
//     .attr("dy", defaultRadius*2 + 40)


// imgsix
// .attr("visibility","show")
// imgseven
// .attr("visibility","show")
// imgeight
// .attr("visibility","show")
// imgnine
// .attr("visibility","show")
// imgten
// .attr("visibility","show")


// }

nline.attr("opacity", 2)

ngroups.attr("transform", function(d) {
return makeTranslate(xPositionScaleName(d.name), height / 2)
 })

ncircles.attr("r", function(d) {
return sizeScale(d.songs)
 })
 .style("fill-opacity", 1)
 .style("fill", '#ffffff')
 .style("stroke-width", 0)

//   text.transition()
//     .duration(1000)
//     .attr("opacity", 0)
//     .attr("dy", function(d) {
//       return sizeScale(d.songs) + 40
//     })
//     .attr("dx", 0)
//     .attr("text-anchor", "middle")


nlabeltext
 .attr("opacity", 1)
 .attr("dy", function(d) {
   return sizeScale(d.songs) + 40
 })
 .attr("dx", 0)
 .attr("text-anchor", "middle")


// imgsix
// .attr("visibility","hidden")
// imgseven
// .attr("visibility","hidden")
// imgeight
// .attr("visibility","hidden")
// imgnine
// .attr("visibility","hidden")
// imgten
// .attr("visibility","hidden")


// }



// function step4() {
//   line.transition().attr("opacity", 0)

//   groups.transition()
//     .duration(1000)
//     .attr("transform", function(d) {
//       var y = height - sizeScale(d.songs) - maxRadius
//       return makeTranslate(width / 2, y)
//     })

//   circles.transition()
//     .duration(1000)
//     .attr("r", function(d) {
//       return sizeScale(d.songs)
//     })
//     .style("fill-opacity", 0)
//     .style("fill", '#ffffff')
//     .style("stroke-width", 1)

//   text.transition()
//     .duration(1000)
//     .attr("opacity", 1)
//     .attr("dy", 0)
//     .attr("text-anchor", "right")
//     .attr("dx", function(d) {
//       return sizeScale(d.songs) + 5
//     })
// } --> -->

// function step4() {
//   line.transition().attr("opacity", 1)

//   groups.transition()
//     .duration(1000)
//     .attr("transform", function(d) {
//       return makeTranslate(xPositionScalesongs(d.songs), height / 2)
//     })

//   circles.transition()
//     .duration(1000)
//     .attr("r", defaultRadius / 2)
//     .style("fill-opacity", 1)
//     .style("fill", '#ffffff')
//     .style("stroke-width", 0)

//   text.transition()
//     .duration(1000)
//     .attr("opacity", 1)
//     .attr("dy", defaultRadius / 2 + 20)
//     .attr("text-anchor", "middle")
//     .attr("dx", 0)

// }

// function step6() {
//   line.transition().attr("opacity", 1)

//   groups.transition()
//     .duration(1000)
//     .attr("transform", function(d) {
//       return makeTranslate(xPositionScalesongs(d.songs), height / 2)
//     })

//   circles.transition()
//     .duration(1000)
//     .attr("r", defaultRadius / 2)
//     .style("fill-opacity", 1)
//     .style("fill", function(d) {
//       return colorScaleName(d.name)
//     })
//     .style("stroke-width", 0)

//   text.transition()
//     .duration(1000)
//     .attr("opacity", 1)
//     .attr("dy", defaultRadius / 2 + 20)
//     .attr("text-anchor", "middle")
//     .attr("dx", 0)

// }


}())


;
