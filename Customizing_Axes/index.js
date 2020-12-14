const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = +svg.attr('height');
const width = +svg.attr('width');

const render = data => {

    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top: 20, right: 40, bottom: 20, left: 100};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);
    
    

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`);
    ;

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d=> yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('fill', 'steelblue');
};

d3.csv("data.csv").then(data =>{
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    render(data);
});