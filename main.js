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
			var drag = d3.behavior.drag()
				.origin(function(d) { return d; })
				.on("dragstart", dragstarted)
				.on("drag", dragged);
			
			//Called when drag event starts. It stop the propagation of the click event
			function dragstarted(d){
				d3.event.sourceEvent.stopPropagation();
			}
			
			//Called when the drag event occurs (object should be moved)
			function dragged(d){
				d.x = d3.event.x;
				d.y = d3.event.y;
				//Translate the object on the actual moved point
				d3.select(this).attr({
					transform: "translate(" + d.x + "," + d.y + ")"
				});
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

var data = [[0, 20], [10, 30]];
         var lineGenerator = d3.svg.line();
         container.append('path').attr('d', lineGenerator(data));