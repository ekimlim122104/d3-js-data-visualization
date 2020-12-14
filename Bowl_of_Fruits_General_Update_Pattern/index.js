const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = +svg.attr('height');

const makeFruit = type => ({ 
    type,
    id: Math.random()
});

let fruits = d3.range(5)
    .map(()=> makeFruit('apple'));

const colorScale = d3.scaleOrdinal()
    .domain(['apple','lemon'])
    .range(['#c11d1d', '#eae600']);

const radiusScale = d3.scaleOrdinal()
    .domain(['apple','lemon'])
    .range([50, 30]);

const xPosition = (d,i) => i * 180 + 100;

const render = (selection, { fruits }) =>{

    const bowl = selection.selectAll('rect')
    .data([null])
    .enter().append('rect')
        .attr('y', 110)
        .attr('width', 910)
        .attr('height', 300)
        .attr('rx', 300 / 2);


    const groups = selection.selectAll('g')
    .data(fruits);
    const groupsEnter = groups.enter().append('g');
    groupsEnter.merge(groups)
            .attr('transform', (d, i) =>
                `translate(${i * 180 + 100}, ${height / 2})`
            );
    groups.exit().remove();

    groupsEnter.append('circle')
    .merge(groups.select('circle'))
        .attr('r',d => radiusScale(d.type))
        .attr('fill', d => colorScale(d.type));

    groupsEnter.append('text')
    .merge(groups.select('text'))
    .attr('y', 120);
        

const text = selection.selectAll('text')
    .data(fruits);
    text
        .enter().append('text')
        .attr('x', (d, i) => i * 180 + 100)

    .merge(text)
        .text(d => d.type);    
    text.exit().remove();
}

render(svg,{ fruits });

//eat an apple
setTimeout(() => {
    fruits.pop();
    render(svg,{ fruits });
}, 1000);


//replacing an apple with a lemon
setTimeout(() => {
    fruits[2].type = 'lemon';
    render(svg,{ fruits });
}, 2000);

//eat an apple
setTimeout(() => {
    fruits = fruits.filter((d, i) => i !== 1);
    render(svg,{ fruits });
}, 3000);

