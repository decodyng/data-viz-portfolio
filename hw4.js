var parseDate = d3.time.format("%Y").parse;
var main_margin = {top: 15, right: 5, bottom: 15, left: 25;
var main_width =  650 - margin.left - margin.right; 
var main_height = 500- margin.top - margin.bottom;
var main_x = d3.time.scale().range([0, main_width]);
var main_y = d3.scale.linear().range([height, 0]);


var main_svg = d3.select("#deathinj")
    .attr("width", main_width + main_margin.left + main_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom);

d3.json("data/movies.json", function(error, data){
	data.forEach(function(d){
			d.year = parseDate(d.month);
			d.avgNVotes = +d.avgNVotes;
			d.nMovies= +d.nMovies;
		});
	console.log(data)
})