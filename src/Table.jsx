import React from 'react';

const Table = ({ data }) => (
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
);

export default Table;
