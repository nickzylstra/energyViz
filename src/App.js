import React from 'react';
import './App.css';
import data from './importData';


function App() {

  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
