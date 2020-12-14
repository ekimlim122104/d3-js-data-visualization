const svg = d3.select('svg');

//getting default value of svg in <svg> tag for the height and width.
//adding + sign convert string to integer.
const height = document.body.clientHeight;
const width = document.body.clientWidth;

svg
        .attr('width', width)
        .attr('height', height)


const treeLayout = d3.tree()
    .size([height , width]);

d3.json('data.json')
    .then(data => {
        const root = d3.hierarchy(data);
        const links = treeLayout(root).links();
        const linkPathGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        svg.selectAll('path').data(links)
            .enter().append('path')
                .attr('d', linkPathGenerator);
});