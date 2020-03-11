import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';
import data from './importData';

const width = 600;
// const scale = d3.scaleLinear()
//   .domain([0, d3.max(data)]);

function App() {
  useEffect(() => {
    // const viz = d3.select('#viz');
    // return () => {
    //   viz.selectAll('div').data(Object.entries(data.countries)).join('div')
    //     .style('background', 'steelblue')
    //     .style('border', '1px solid white')
    //     .style('font-size', 'small')
    //     .style('color', 'white')
    //     .style('text-align', 'right')
    //     .style('padding', '3px')
    //     .style('width', d => `${scale(d.populations['2017'])}px`)
    //     .text((d) => d.name);
    // };
  });

  return (
    <div className="App">
      <div id='viz'>
        <table>
          <thead>
            <tr>
              <th>code</th>
              <th>name</th>
              <th>pop</th>
              <th>energy</th>
              <th>ePC</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.countries).sort().map((country) => {
              const [code, stats] = country;
              const { name, energyPerCapitas, populations, energyConsumptions } = stats;
              const ePCCount = energyPerCapitas.count;
              const popCount = populations.count;
              const energyCount = energyConsumptions.count;
              
              return (
                <tr key={code}>
                  <td>{code}</td>
                  <td>{name}</td>
                  <td>{popCount}</td>
                  <td>{energyCount}</td>
                  <td>{ePCCount}</td>
                </tr>);
            })}
          </tbody>
        </table>
        {/* {JSON.stringify(data)} */}
      </div>
    </div>
  );
}

export default App;
