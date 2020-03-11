import populationData from './data/populations.json'
import energyData from './data/energy.json'

const exclusions = ['ARB','CEB','CSS','EAP','EAR','EAS','ECA','ECS','ECU','EMU', 'EUU', 'FCS', 'HIC', 'HITZ', 'HPC', 'IBD', 'IBT', 'IDA', 'IDB','IDX','LAC','LCN','LIC','LDC','LMC','LMY','LTE','MEA','MIC','MNA','NAC','OED','OSS','PRE','PSS','PST','REU','SAS','SSA','SSF','SST','TEA','TEC','TLA','TMN','TSA','TSS','UMC','WLD'];

class Country {
  constructor(name) {
    this.name = name;
    this.populations = { count: 0 };
    this.energyConsumptions = { count: 0 };
    this.energyPerCapitas = { count: 0 };
  }
}

class Year {
  constructor() {
    this.populationMax = 0;
    this.energyConsumptionMax = 0;
    this.energyPerCapitaMax = 0;
  }
}

function processPopulationData(input, output = {}) {
  // console.log(`Countries in population data: ${input.length}`);
  input.forEach((country) => {
    const name = country.Country;
    const code = country.Country_Code;
    if (exclusions.includes(code)) return;
    output.countries[code] = new Country(name);

    Object.keys(country).forEach((key) => {
      const yearMatch = key.match(/year_(.*)/i);
      if (yearMatch) {
        const year = yearMatch[1];
        const population = country[key];

        if (!output.years[year]) output.years[year] = new Year();
        output.years[year].populationMax = Math.max(population, output.years[year].populationMax);

        output.countries[code].populations[year] = population;
        output.countries[code].populations.count += 1;
      }
    })
  })

  return output;
}

function processEnergyData(input, output = {}) {
  // console.log(`Countries in energy data: ${input.length}`);
  input.forEach((country) => {
    const code = country.iso;
    const name = country.name.split(',')[1].trim();
    if (exclusions.includes(code)) return;
    if (!output.countries[code]) output.countries[code] = new Country(name);

    country.data.forEach((yearData) => {
      const { date, value } = yearData;
      if (value === '--') return;
      const year = (new Date(date)).getFullYear();

      if (!output.years[year]) output.years[year] = new Year();
      output.years[year].energyConsumptionMax = Math.max(value, output.years[year].energyConsumptionMax);
      
      output.countries[code].energyConsumptions[year] =  value;
      output.countries[code].energyConsumptions.count += 1;
    });
  });

  return output;
}

function calculateEnergyPerCapita(data) {
  Object.values(data.countries).forEach((country) => {
    country.energyPerCapitas = { count: 0 };
    if (country.populations.count === 0 || country.energyConsumptions.count === 0) return;
    Object.keys(data.years).forEach((year) => {
      const population = country.populations[year];
      const energy = country.energyConsumptions[year];
      const kWHperBkWH = 1000000000;
      const energyPerCapita = energy * kWHperBkWH / population;
      country.energyPerCapitas[year] = energyPerCapita;
      country.energyPerCapitas.count += 1;
    });
  });
}

function removeIncompleteDataSets(data) {
  // data.countries = data.countries.filter((c) => );
}

const data = {
  years: {},
  countries: {},
};
processPopulationData(populationData, data);
processEnergyData(energyData, data);
calculateEnergyPerCapita(data);
removeIncompleteDataSets(data);

export default data;
