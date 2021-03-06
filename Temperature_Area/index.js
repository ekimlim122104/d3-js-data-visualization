const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = +svg.attr('height');
const width = +svg.attr('width');


const render = data => {

    const xValue = d => d.timestamp;
    const xAxisLabel = 'Temperature';

    const yValue = d => d.temperature;
    const yAxisLabel = 'Time';
    const title = 'A Week in San Francisco';
    const margin = {top: 50, right: 40, bottom: 88, left: 105};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const circleRadius = 6;
    

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const xAxis = d3.axisBottom(xScale)
    .ticks(6)
    .tickSize(-innerHeight)
    .tickPadding(15);


    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class','axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill','black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor','middle')
        .text(xAxisLabel);


    const xAxistG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
        xAxistG.select('.domain').remove();

        xAxistG.append('text')
        .attr('class','axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill','black')
        .text(yAxisLabel);

    const AreaGenerator = d3.area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

    g.append('path')
        .attr('class','line-path')
        .attr('d', AreaGenerator(data));

        //generate circle data sets
    // g.selectAll('circle').data(data)
    //     .enter().append('circle')
    //         .attr('fill','steelblue')
    //         .attr('cy', d => yScale(yValue(d)))
    //         .attr('cx', d => xScale(xValue(d)))
    //         // yScale.bandwidth() / 2
    //         .attr('r', circleRadius)

    g.append('text')
        .attr('class','title-label')
        .attr('y', -10)
        .attr('text-anchor','middle')
        .text(title);
    
    
};

d3.csv("week_temperature_sf.csv")
    .then(data =>{
    data.forEach(d => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
    });
    render(data);
});