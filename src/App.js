import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';
import Table from './Table';
import data from './importData';

const width = 600;
const year = '2016';
function scalePop(year) {
  return d3.scaleLinear()
    .domain([0, d3.max(Object.entries(data.countries), ([name, { populations }]) => populations[year])])
    .range([0, width]);
} 


function App() {
  useEffect(() => {
    const viz = d3.select('#viz');
    const vizData = Object.entries(data.countries).sort(([a, aStats], [b, bStats]) => bStats.populations[year] - aStats.populations[year]);
    viz.selectAll('div').data(vizData).join('div')
      .style('background', 'steelblue')
      .style('border', '1px solid white')
      .style('font-size', 'small')
      .style('color', 'black')
      .style('text-align', 'right')
      .style('padding', '3px')
      .style('width', ([name, stats]) => `${scalePop(year)(stats.populations[year])}px`)
      .text(([name, stats]) => stats.populations[year]);

    return () => {
    };
  }, []);

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
