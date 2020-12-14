const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = document.body.clientHeight;
const width = document.body.clientWidth;

svg
        .attr('width', width)
        .attr('height', height)
    .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('rx', 40)