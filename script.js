// hathi el function t5aline na3ref blaset el mouse fi x ou y 
ns4 = (document.layers)? true:false
ie4 = (document.all)? true:false
function init() {
    if (ns4) {document.captureEvents(Event.MOUSEMOVE);}
    document.onmousemove=mousemove;
}
function mousemove(event) {
    var mouse_x = y = 0;
    if (document.attachEvent != null) {
        mouse_x = window.event.clientX;
        mouse_y = window.event.clientY;
    } else if (!document.attachEvent && document.addEventListener) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    }
    status="x = " + mouse_x + ", y = " + mouse_y;
    document.getElementById('xy').innerHTML = "x = " + mouse_x + ", y = " + mouse_y;
}
init()

// webgazer
// const collisionSVG = "collisionSVG";
//   var force = [];
//   var nodes = [];

//   window.onload = function() {

//     var localstorageLabel = 'webgazerGlobalData';
//     window.localStorage.setItem(localstorageLabel, null);

//     webgazer.setRegression('ridge') /* currently must set regression and tracker */
//     .setTracker('clmtrackr')
//     .begin()
//     .showPredictionPoints(false); /* shows a square every 100 milliseconds where current prediction is */

//     function checkIfReady() {
//       var feedbackBox = document.getElementById( webgazer.params.faceFeedbackBoxId );
      
//       if (!webgazer.isReady()) {
//         setTimeout(checkIfReady, 100);
//       }
//       // This isn't strictly necessary, but it makes the DOM easier to read
//       // to have the z draw order reflect the DOM order.
//       else if( typeof(feedbackBox) == 'undefined' || feedbackBox == null ) {
//         setTimeout(checkIfReady, 100);
//       }
//       else
//       {
//         // Add the SVG component on the top of everything.
//         setupCollisionSystem();
//         webgazer.setGazeListener( collisionEyeListener );
//       }
//     }

//     setTimeout(checkIfReady,100);
//   };

//   window.onbeforeunload = function() {
//     //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
//     window.localStorage.clear(); //Comment out if you want to save data across different sessions
//   }

//   function setupCollisionSystem() {
//     var width = window.innerWidth;
//     var height = window.innerHeight;

//     var numberOfNodes = 200;

//     nodes = d3.range(numberOfNodes).map(function() { return {radius: Math.random() * 12 + 4}; }),
//     nodes[0].radius = 0;
//     nodes[0].fixed = true;

//     force = d3.layout.force()
//     .gravity(0.05)
//     .charge(function(d, i) { return i ? 0 : -2000; })
//     .nodes(nodes)
//     .size([width, height])
//     .start();

//     var svg = d3.select("body").append("svg")
//     .attr("id", collisionSVG)
//     .attr("width", width)
//     .attr("height", height)
//     .style("top", "0px")
//     .style("left","0px")
//     .style("margin","0px")
//     .style("position","absolute")
//     .style("z-index", 100000);

//     var color = d3.scale.category10();
//     var colors = [];
//     for(var i=0; i<numberOfNodes-2; i++){
//       //colors[i] = color(i%3);
//       colors[i] = color(0);
//     }
//     colors.push("orange");

//     svg.selectAll("circle")
//     .data(nodes.slice(1))
//     .enter().append("circle")
//     .attr("r", function(d) { return d.radius; })
//     .style("fill", function(d, i) { return colors[i]; });


//     force.on("tick", function(e) {
//       var q = d3.geom.quadtree(nodes),
//       i = 0,
//       n = nodes.length;

//       while (++i < n) q.visit(collide(nodes[i]));

//       svg.selectAll("circle")
//       .attr("cx", function(d) { return d.x; })
//       .attr("cy", function(d) { return d.y; });
//     });

//     svg.append("line")
//     .attr("id", "eyeline1" )
//     .attr("stroke-width",2)
//     .attr("stroke","red");

//     svg.append("line")
//     .attr("id", "eyeline2" )
//     .attr("stroke-width",2)
//     .attr("stroke","red");

//     svg.append("rect")
//     .attr("id","predictionSquare")
//     .attr("width",5)
//     .attr("height",5)
//     .attr("fill","red");


//     svg.on("mousemove", function() {
//       var p1 = d3.mouse(this);
//       nodes[0].px = p1[0];
//       nodes[0].py = p1[1];
//       force.resume();
//     });

//     function collide(node) {
//       var r = node.radius + 16,
//       nx1 = node.x - r,
//       nx2 = node.x + r,
//       ny1 = node.y - r,
//       ny2 = node.y + r;
//       return function(quad, x1, y1, x2, y2) {
//         if (quad.point && (quad.point !== node)) {
//           var x = node.x - quad.point.x,
//           y = node.y - quad.point.y,
//           l = Math.sqrt(x * x + y * y),
//           r = node.radius + quad.point.radius;
//           if (l < r) {
//             l = (l - r) / l * .5;
//             node.x -= x *= l;
//             node.y -= y *= l;
//             quad.point.x += x;
//             quad.point.y += y;
//           }
//         }
//         return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
//       };
//     }
//   }

//   var collisionEyeListener = function(data, clock) {
//     if(!data)
//       return;
    
//     nodes[0].px = data.x;
//     nodes[0].py = data.y;
//     force.resume();

//     var cl = webgazer.getTracker().clm;
//     var whr = webgazer.getVideoPreviewToCameraResolutionRatio();

//     var line = d3.select('#eyeline1')
//               .attr("x1",data.x)
//               .attr("y1",data.y)
//               .attr("x2",cl.getCurrentPosition()[27][0] * whr[0])
//               .attr("y2",cl.getCurrentPosition()[27][1] * whr[1]);

//     var line = d3.select("#eyeline2")
//               .attr("x1",data.x)
//               .attr("y1",data.y)
//               .attr("x2",cl.getCurrentPosition()[32][0] * whr[0])
//               .attr("y2",cl.getCurrentPosition()[32][1] * whr[1]);

//     var dot = d3.select("#predictionSquare")
//               .attr("x",data.x)
//               .attr("y",data.y);
//   }