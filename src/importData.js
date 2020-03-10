import populationData from './data/populations.json'
import energyData from './data/energy.json'

function processPopulationData(input, output = {}) {
  // console.log(`Countries in population data: ${input.length}`);
  input.forEach((country) => {
    const name = country.Country;
    const code = country.Country_Code;
    output.countries[code] = {
      name,
      populations: {},
    };

    Object.keys(country).forEach((key) => {
      const yearMatch = key.match(/year_(.*)/i);
      if (yearMatch) {
        const year = yearMatch[1];

        if (!output.years[year]) output.years[year] = { populationCount: 0 };
        output.years[year].populationCount += 1;

        output.countries[code].populations[year] = country[key];
      }
    })
  })

  return output;
}

function processEnergyData(input, output = {}) {
  // console.log(`Countries in energy data: ${input.length}`);
  input.forEach((country) => {
    const code = country.iso;
    if (!output.countries[code]) output.countries[code] = {};
    output.countries[code].energyConsumptions = {};

    country.data.forEach((yearData) => {
      const { date, value } = yearData;
      const year = (new Date(date)).getFullYear();

      if (!output.years[year]) output.years[year] = { energyCount: 0 };
      if (!output.years[year].energyCount) output.years[year].energyCount = 0;
      output.years[year].energyCount += 1;

      output.countries[code].energyConsumptions[year] = value === '--' ? null : value;
    });
  });

  return output;
}

function calculateEnergyPerCapita(data) {
  Object.values(data.countries).forEach((country) => {
    country.energyPerCapitas = {};
    Object.keys(data.years).forEach((year) => {
      const population = country.populations && country.populations[year];
      const energy = country.energyConsumptions && country.energyConsumptions[year];
      const kWHperBkWH = 1000000000;
      const energyPerCapita = energy * kWHperBkWH / population;
      country.energyPerCapitas[year] = energyPerCapita;
    });
  });
}

const data = {
  years: {},
  countries: {},
};
processPopulationData(populationData, data);
processEnergyData(energyData, data);
calculateEnergyPerCapita(data);

export default data;
