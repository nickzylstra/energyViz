import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';
import Table from './Table';
import data from './importData';

const width = 600;
const year = '2017';
const scale = d3.scaleLinear()
  .domain([0, d3.max(data.years[year].populationMax)]);


function App() {
  useEffect(() => {
    const viz = d3.select('#viz');
    return () => {
      viz.selectAll('div').data(Object.entries(data.countries)).join('div')
        .style('background', 'steelblue')
        .style('border', '1px solid white')
        .style('font-size', 'small')
        .style('color', 'white')
        .style('text-align', 'right')
        .style('padding', '3px')
        .style('width', d => `${scale(d.populations[year])}px`)
        .text((d) => d.populations[year]);
    };
  });

  return (
    <div className="App">
      <div id='viz'>
        {/* <Table data={data} /> */}
        {/* {JSON.stringify(data)} */}
      </div>
    </div>
  );
}

export default App;
