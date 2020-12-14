const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = +svg.attr('height');
const width = +svg.attr('width');

//grp
const g = svg.append('g')
//default cx and cy
    .attr('transform', `translate(${width / 2},${height / 2})`);

//create circle init
const circle = g.append('circle');
circle.attr('r',height / 2)
    .attr('fill','yellow')
    .attr('stroke','black');



//left eye
const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 40;
const eyebrowWidth = 70;
const eyebrowHeight = 15;
const eyebrowYOffset = -70;

const eyesG = g.append('g')
    .attr('transform', `translate(${0},${eyeYOffset})`);

const leftEye = eyesG.append('circle')
//r and value
    .attr('r',eyeRadius)
    .attr('cx',- eyeSpacing);

//blushleft
const leftBlush = g.append('circle')
    .attr('r',eyeRadius)
    .attr('cx',- eyeSpacing)
    .attr('fill', 'pink')
    .transition().duration(2000)
        .attr('opacity', 3);

const rightEye = eyesG.append('circle')
    .attr('r',eyeRadius)
    .attr('cx', eyeSpacing);

const rightBlush = g.append('circle')
.attr('r',eyeRadius)
.attr('cx',eyeSpacing)
.attr('fill', 'pink')
.transition().duration(2000)
        .attr('opacity', 3);

const eyesbrowsG = eyesG.append('g')
    .attr('transform', `translate(${0},${eyebrowYOffset})`);

    eyesbrowsG.transition().duration(2000)
    .attr('transform', `translate(${0},${eyebrowYOffset - 50})`)
    .transition().duration(2000)
        .attr('transform', `translate(${0},${eyebrowYOffset})`);

const leftEyebrow = eyesbrowsG
    .append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);


const rightEyebrow = eyesbrowsG.append('rect')
    .attr('x', eyeSpacing - eyebrowWidth / 2)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

//mouth
//group eleemnt
const mouth = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2
}));

//eyes brows