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

Promise.all([
    d3.json('countries-110m.json'),
    d3.tsv('50m.tsv')
]).then(([topoJSONData, tsvData]) => {

    const countryName = tsvData.reduce((accumalator, d) => {
        accumalator[d.iso_n3] = d.name;
        return accumalator;
    }, {});
    const countries = topojson.feature(topoJSONData, topoJSONData.objects.countries);
     g.selectAll('path')
            .data(countries.features)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
        .append('title')
            .text(d => countryName[d.id]);
}, {});