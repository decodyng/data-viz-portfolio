var parseDate = d3.time.format("%Y").parse;
var radiusLimits = [1, 25]

var main_margin = {top: 15, right: 5, bottom: 15, left: 25};
var main_width =  650 - main_margin.left - main_margin.right; 
var main_height = 500- main_margin.top - main_margin.bottom;


var main_x = d3.time.scale().range([0, main_width]);
var main_y = d3.scale.linear().range([main_height, 0]);
var main_radius = d3.scale.sqrt().range(radiusLimits) 
var main_color = d3.scale.linear().range(['#d7191c', '#FFFFFF', '#a6d96a'])

var main_svg = d3.select("#mainscatter")
    .attr("width", main_width + main_margin.left + main_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom);
console.log(main_svg);

d3.json("data/movies.json", function(error, data){
	data.forEach(function(d){
			d.year = parseDate(d.year);
			d.avgNVotes = +d.avgNVotes;
			d.nMovies= +d.nMovies;
		});
	console.log(data[0]);
	main_x.domain(d3.extent(data, function(d) {return d.year}));
	main_y.domain(d3.extent(data, function(d) {return d.avgNVotes}));
	main_radius.domain(d3.extent(data, function(d) {return d.nMovies}));
	ratingExtent = d3.extent(data, function(d) {return d.avgRating});
	ratingMean = d3.mean(data, function(d) {return d.avgRating});
	main_color.domain([ratingExtent[0]], ratingMean, ratingExtent[1])

	circles = main_svg.append('g')
	.selectAll('.maincircle')
	.data(data)
	.enter()
	.append('circle');

	circles.attr("cx", function(d) {return main_x(d.year)})
	    .attr("cy", function(d) {return main_y(d.avgNVotes)})
	    .attr("r", function(d) {return main_radius(d.nMovies)})
	    .attr("fill", function(d) {return main_color(d.avgRating)});
	    // .on('mouseover', smTip.show)
     //  	.on('mouseout', smTip.hide)

})