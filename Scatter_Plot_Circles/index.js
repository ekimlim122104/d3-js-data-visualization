const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top: 50, right: 40, bottom: 77, left: 180};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
        .nice();
    
    

    const yScale = d3.scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.7);


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xAxisTickFormat = number => 
        d3.format('.3s')(number)
        .replace('G','B');

    
    const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);


    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth);

    g.append('g').call(yAxis)
    .selectAll('.domain')
        .remove();


    const xAxistG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
        xAxistG.select('.domain').remove();

        xAxistG.append('text')
        .attr('class','axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill','black')
        .text('Population');

    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('fill','steelblue')
            .attr('cy', d=> yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            // yScale.bandwidth() / 2
            .attr('r', 18)

    g.append('text')
        .attr('class','title-label')
        .attr('y', -10)
        .text('Top 10 Most Populous Countries');
    
    
};

d3.csv("data.csv").then(data =>{
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    render(data);
});