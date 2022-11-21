const fruits = [
    {name: "China", count: 1415046},
    {name: "India", count: 1354052},
    {name: "US", count: 326767},
    {name: "Indonisa", count: 266795},
    {name: "Brazil", count: 210868},
    {name: "Pakistan", count: 200814},
    {name: "Russia", count: 143965},
    {name: "Mexico", count: 130759}
  ]
  let dim = {
    'width': 720, 
   'height':500, 
   'margin':50   
    };

let svg = d3.select('#chart').append('svg')  
     .attrs(dim);




document.querySelector("#chart").classList.add("center");

let scaleX = d3.scaleLinear()
                .domain([0, d3.max(fruits, d => d.count)])
                .nice()
                .range([dim.margin, dim.width - dim.margin])
                .interpolate(d3.interpolateRound)

let scaleY = d3.scaleBand()
                .domain(fruits.map(d => d.name))
                .range([dim.margin, dim.height - dim.margin])
                .padding(0.1)
                .round(true)

let color = d3.scaleSequential()
            .domain([0, d3.max(fruits, d=>d.count)])
            .interpolator(d3.interpolateBlues);

let scaleQuantize = d3.scaleQuantize()
            .domain(d3.extent(fruits, (d)=>d.health))
             .range(['red', 'orange', 'blue', 'lightgreen', 'green']);


let axisX = d3.axisTop(scaleX);
let axisY = d3.axisLeft(scaleY);

svg.append('g')
    .attr('transform', 'translate(0,50)')
    .attr('color', '#fff')
    .call(axisX)


svg.append('g')
    .attr('transform', 'translate(50,0)')    
    .call(axisY);



svg.selectAll('rect')    
    .data(fruits)
    .enter()
    .append('rect')
    .attrs({
        'x':(d) =>scaleX(0),
        'y':(d) => scaleY(d.name),
        'width':(d)=>  0,
        'height':(d)=>scaleY.bandwidth(),
        'fill':(d)=>color(d.count)

    })
    .transition().duration(1000).attr('width', (d)=>  scaleX(d.count) - scaleX(0))

 


    