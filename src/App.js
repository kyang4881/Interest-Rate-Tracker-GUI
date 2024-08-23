import React, { useState } from 'react';
import TradingEconomicsData from './components/TradingEconomicsData.jsx';
import DisplayMaps from './components/DisplayMaps.jsx';
import './App.css';

const App = () => {
  const [selectedDataType, setSelectedDataType] = useState('inflation');
  const [data, setData] = useState([]);

  const handleDataTypeChange = (type) => {
    setSelectedDataType(type);
  };

  return (
    <div className="app">
      <nav className="nav-bar">
        <button 
          className={selectedDataType === 'inflation' ? 'nav-button active' : 'nav-button'}
          onClick={() => handleDataTypeChange('inflation')}
        >
          Inflation Rate
        </button>
        <button 
          className={selectedDataType === 'interest' ? 'nav-button active' : 'nav-button'}
          onClick={() => handleDataTypeChange('interest')}
        >
          Interest Rate
        </button>
      </nav>
      <TradingEconomicsData dataType={selectedDataType} setData={setData} />
      <DisplayMaps data={data} />
    </div>
  );
};

export default App;
