var map = d3.select("#map")
				.attr("width", 960)
				.attr("height", 450);
				
			var container = map.append("g");
			
			//Get the background image from the server and set the viewport size
			// var mapImage = container.append("image")
			// 	.attr("width", 960)
			// 	.attr("height", 450);
			
			//Draw two circles and one rectangle
			var rectangle1 = container.append("g").classed('draggable', true).attr("id", "one");
            rectangle1.append("rect")
            .attr("x", 50)
            .attr("y", 50)
            .attr("width", 100)
            .attr("height", 100)
            .style("fill", "grey")
            ;

            rectangle1.append("circle")
            .attr("cx", 150)
            .attr("cy", 100)
            .attr("r", 5)
            .style("fill", "red")
            .classed('clickable', true)
            ;

			var rectangle2 = container.append("g").classed('draggable', true).attr("id", "two");               
            rectangle2.append("rect")
            .attr("x", 50)
            .attr("y", 200)
            .attr("width", 100)
            .attr("height", 100)
            .style("fill", "grey")
            ;

            rectangle2.append("circle")
            .attr("cx", 50)
            .attr("cy", 250)
            .attr("r", 5)
            .style("fill", "red")
            .classed('clickable', true)
            ;
			
			//Create the drag and drop behavior to set for the objects crated
			var drag = d3.drag()
				.subject(function(d) { return d; })
				.on("start", dragstarted)
				.on("drag", dragged);
			
			//Called when drag event starts. It stop the propagation of the click event
			function dragstarted(d){
				console.log('dragstart')
				d3.event.sourceEvent.stopPropagation();
			}
			
			//Called when the drag event occurs (object should be moved)
			function dragged(d){
				d.x = d3.event.x;
				d.y = d3.event.y;
				//Translate the object on the actual moved point
				d3.select(this).attr(
					'transform', "translate(" + d.x + "," + d.y + ")"
				);

				// d3.select(this).attr("transform",  "translate(" + [ d3.event.x,d3.event.y ] + ")"
				// )
			}
			
							
			//Matrix containing the x and y coordinates of the created objects (used for draggable events)
			nodes_data = [
				{
				  x: 0,
				  y: 0
				}, {
				  x: 0,
				  y: 0
				}, {
				  x: 0,
				  y: 0
				}
			];
			
			
			//Set the drag behavior on the objects having the "draggable" class and set their position on the viewport (by the "node_data" matrix)		
			nodes = container.selectAll(".draggable").call(drag).data(nodes_data);

var clicked = false;
var line;

$(".clickable").on("click", (event) => {
    clicked = !clicked;
line = container.append('line')
  .attr('x1', event.offsetX)
  .attr('y1', event.offsetY)
  .attr('x2', event.offsetX)
  .attr('y2', event.offsetY)
  .attr('stroke', 'red')
  .attr('marker-end', 'url(#arrow)')

// line = container.append('polyline')
//   .attr('points', event.offsetX + ',' + event.offsetY + " " + event.offsetX + ',' + event.offsetY)
//   .attr('y1', event.offsetY)
//   .attr('x2', event.offsetX)
//   .attr('y2', event.offsetY)
//   .attr('stroke', 'red')
	console.log(clicked)
});
$(".clickable").on("mousemove", (event) => {
    if(clicked){
        line
          .attr('x2', event.offsetX)
          .attr('y2', event.offsetY)
    }
});

// var data = [[0, 20], [10, 30]];
//          var lineGenerator = d3.svg.line();
//          container.append('path').attr('d', lineGenerator(data));


// Force layout Example

// var url = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
// var width = 1200;
// var height = 1800;
// var margin = {
//   top: 5, 
//   bottom: 50, 
//   left: 0, 
//   right: 75
// };

// $.ajax({
//   url: url, 
//   dataType: 'json', 
//   success: function(data){
//     console.log(data);
//     renderChart(data);
//   }
// });

// function renderChart(data){
//   var svg = d3.select('.chart')
//               .attr('width', width + margin.left + margin.right)
//               .attr('height', height + margin.top + margin.bottom)
  
//   //extracting the nodes and links from the dataset
//   var data_nodes = data.nodes;
//   var data_links = data.links;
  
//   //Creating force layout simulation object
//   var simulation = d3.forceSimulation(data_nodes)
//                 .force('link', d3.forceLink())
//                 .force('charge', d3.forceManyBody())
//                 .force('center', d3.forceCenter(width / 2, height / 2));
  
  
//   //creating a variable for the links where the data will be stored
//   var link = svg.selectAll('.link')
//                 .append('g')
//                 .data(data_links)
//                 .enter().append('line')
//                 .attr('class', 'link')
//   .attr("stroke","black")
//              .attr('stroke-width', 1)
 
//   //creating a variable for the nodes where the data will be stored
//   var node = svg.selectAll('.node')
//                  .append('g')
//                  .data(data_nodes)
//                  .enter().append('circle')
//                  .attr('r', 5)
//                  .attr('class', 'node')
  
//   simulation
//       .nodes(data_nodes)
//       .on('tick', ticked);
  
//   simulation.force('link')
//             .links(link);
  
//   function ticked(){
//     link.attr('x1', function(d){ return data_nodes[d.source].x; })
//         .attr('y1', function(d){ return data_nodes[d.source].y; })
//         .attr('x2', function(d){ return data_nodes[d.target].x; })
//         .attr('y2', function(d){ return data_nodes[d.target].y; });
    
//     node.attr('cx', function(d) { return d.x; })
//         .attr('cy', function(d) { return d.y; })
//         .on('mouseover', function(d){
//            console.log(d.country);
//         })
//   }
// }