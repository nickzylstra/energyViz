import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';
import Table from './Table';
import data from './importData';

const width = 600;
const year = '2016';
const stats = ['populations', 'energyConsumptions', 'energyPerCapitas'];
const stat = stats[2];

function makeStatScaler(year, stat) {
  return d3.scaleLinear()
    .domain([0, d3.max(Object.entries(data.countries), ([code, stats]) => stats[stat][year])])
    .range([0, width]);
}

function makeBarChart() {
  const viz = d3.select('#viz');
    const vizData = Object.entries(data.countries).sort(([a, aStats], [b, bStats]) => bStats[stat][year] - aStats[stat][year]);
    viz.selectAll('div').data(vizData).join('div')
      .style('background', 'steelblue')
      .style('border', '1px solid white')
      .style('font-size', 'small')
      .style('color', 'black')
      .style('text-align', 'right')
      .style('padding', '3px')
      .style('width', ([code, stats]) => `${makeStatScaler(year, stat)(stats[stat][year])}px`)
      .text(([code, stats]) => `${stats.name}: ${stats[stat][year]}`);
}


function App() {
  useEffect(() => {
    makeBarChart();

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
