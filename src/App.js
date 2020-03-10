import React from 'react';
import './App.css';
import populationData from './data/populations.json'
import energyData from './data/energy.json'

function processPopulationData(input, output = {}) {
  console.log(`Countries in population data: ${input.length}`);
  input.forEach((country) => {
    const name = country.Country;
    const code = country.Country_Code;
    output[code] = {
      name,
      populations: {},
    };

    Object.keys(country).forEach((key) => {
      const yearMatch = key.match(/year_(.*)/i);
      if (yearMatch) {
        const year = yearMatch[1];
        output[code].populations[year] = country[key];
      }
    })
  })

  return output;
}

function processEnergyData(input, output = {}) {
  console.log(`Countries in energy data: ${input.length}`);

  input.forEach((country) => {
    const code = country.iso;
    if (!output[code]) output[code] = {};
    output[code].energyConsumptions = {};

    country.data.forEach((yearData) => {
      const { date, value } = yearData;
      const year = (new Date(date)).getFullYear();
      output[code].energyConsumptions[year] = value === '--' ? null : value;
    });
  });

  return output;
}

function App() {
  const data = processPopulationData(populationData);
  processEnergyData(energyData, data);

  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
