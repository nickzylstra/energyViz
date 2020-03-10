import React from 'react';
import './App.css';
import populationData from './data/populations.json'

function processPopulationData(input, output = {}) {
  input.forEach((country) => {
    const name = country.Country;
    output[name] = {
      code: country.Country_Code,
      populations: {},
    };

    Object.keys(country).forEach((key) => {
      const yearMatch = key.match(/year_(.*)/i);
      debugger;
      if (yearMatch) {
        const year = yearMatch[1];
        output[name].populations[year] = country[key];
      }
    })
  })

  return output;
}

function App() {
  const data = processPopulationData(populationData);
  
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
