const svg = d3.select('svg');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(d3.zoom()
    .on('zoom', () => {
        g.attr('transform', d3.event.transform);
}));

const colorScale = d3.scaleOrdinal();

const colorValue = d => d.properties.economy;

Promise.all([
    d3.json('countries-110m.json'),
    d3.tsv('50m.tsv')
]).then(([topoJSONData, tsvData]) => {

    const rowById = tsvData.reduce((accumalator, d) => {
        accumalator[d.iso_n3] = d;
        return accumalator;
    }, {});
    const countries = topojson.feature(topoJSONData, topoJSONData.objects.countries);

    countries.features.forEach(d => {
        Object.assign(d.properties, rowById[d.id]);
    });

    colorScale
        .domain(countries.features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(d3.schemeSpectral[colorScale.domain().length]);

     g.selectAll('path')
            .data(countries.features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', d => colorScale(colorValue(d)))
        .append('title')
            .text(d => d.properties.name + ': ' + colorValue(d));
}, {});