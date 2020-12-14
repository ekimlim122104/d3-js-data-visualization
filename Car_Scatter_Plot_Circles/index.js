const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = +svg.attr('height');
const width = +svg.attr('width');


// d.mpg = +d.mpg;
// d.cylinders = +d.cylinders;
// d.displacement = +d.displacement;
// d.horsepower = +d.horsepower;
// d.weight = +d.weight;
// d.acceleration = +d.acceleration;
// d.year = +d.year;

const render = data => {

    const xValue = d => d.horsepower;
    const xAxisLabel = 'Horse Power';
    const yValue = d => d.weight;
    const yAxisLabel = 'Weight';
    const title = 'Cars Scatter';
    const margin = {top: 50, right: 40, bottom: 88, left: 150};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const circleRadius = 10;
    

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    
    

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight])
        .nice();


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);


    
    const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15);


    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG
            .selectAll('.domain')
                .remove();

                yAxisG.append('text')
                    .attr('class','axis-label')
                    .attr('y', -90)
                    .attr('x', -innerHeight / 2)
                    .attr('fill','black')
                    .attr('transform', `rotate(-90)`)
                    .attr('text-anchor','middle')
                    .text(yAxisLabel);


    const xAxistG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
        xAxistG.select('.domain').remove();

        xAxistG.append('text')
        .attr('class','axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill','black')
        .text(xAxisLabel);

    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('fill','steelblue')
            .attr('cy', d=> yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            // yScale.bandwidth() / 2
            .attr('r', circleRadius)

    g.append('text')
        .attr('class','title-label')
        .attr('y', -10)
        .attr('text-anchor','middle')
        .text(title);
    
    
};

d3.csv("auto-mpg.csv")
    .then(data =>{

    data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
        
    });
    render(data);
});