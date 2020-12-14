const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.

//drop downmenu module start here

const dropdownMenu = (selection, props) => {
    const {
        options,
        onOptionCliked
    } = props;

    let select = selection.selectAll('select').data([null]);
    select = select.enter().append('select')
    .merge(select)
        .on('change', function() {
            onOptionCliked(this.value)
        });

    const option = select.selectAll('option').data(options);
    option.enter().append('option')
        .merge(option)
            .attr('value', d => d)
            .text(d => d);
};


//drop downmenu module end here
const height = +svg.attr('height');
const width = +svg.attr('width');

let data;
let xColumn;
const onXColumnCliked = column => {
    xColumn = column;
    render();
};
//START OF SCATTER PLOT
const scatterPlot = (selection, props) => {
    const {
        title,
        xValue,
        xAxisLabel,
        yValue,
        circleRadius,
        yAxisLabel,
        margin,
        width,
        height,
        data
    } = props;
    // const title = 'Cars Scatter';
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    
    

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([0, innerHeight])
        .nice();


    const g = selection.selectAll('.container').data([null]);
    const gEnter = g
        .enter().append('g')
            .attr('class','container')
        gEnter.merge(g)
                .attr('transform', 
                    `translate(${margin.left}, ${margin.top})`
                );


    
    const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15);


    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const yAxisG = g.select('.y-axis');
    const yAxisGEnter = gEnter
        .append('g')
            .attr('class', 'y-axis');

    const yAxistLabelText = yAxisGEnter
    yAxisG.append('text')
        .attr('class','axis-label')
        .attr('y', -93)
        .attr('fill','black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor','middle')
    .merge(yAxisG.select('.axis-label'))
        .attr('x', -innerHeight / 2)
        .text(yAxisLabel);


    const xAxisG = g.select('.x-axis');
    const xAxisGEnter = gEnter
        .append('g')
            .attr('class','x-axis');
        xAxisG
            .merge(xAxisGEnter)
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll('.domain').remove();


        xAxisG.append('text')
        .attr('class','axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill','black')
        .text(xAxisLabel);

    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('cy', d=> yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', circleRadius)

    g.append('text')
        .attr('class','title')
        .attr('y', -10)
        // .attr('text-anchor','middle')
        .text(title);
};
//END OF SCATTER PLOT

const render = () => {

    d3.select('#menus')
    .call(dropdownMenu, {
        options: data.columns,
        onOptionCliked: onXColumnCliked
    
    });
    svg.call(scatterPlot, {
        title: 'Cars: Horsepower vs Weight',
        xValue: d => d[xColumn],
        xAxisLabel : 'Horse Power',
        yValue : d => d.weight,
        circleRadius: 10,
        yAxisLabel : 'Weight',
        margin : {top: 50, right: 40, bottom: 88, left: 150},
        width,
        height,
        data
    });
    
    
    
};

d3.csv("auto-mpg.csv")
    .then(loadedData =>{
    data = loadedData;
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