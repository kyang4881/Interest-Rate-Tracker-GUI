import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Preload Highcharts scripts
const loadHighchartsScripts = async () => {
    try {
        await loadScript('https://code.highcharts.com/maps/highmaps.js');
        await loadScript('https://code.highcharts.com/maps/modules/exporting.js');
        await loadScript('https://code.highcharts.com/maps/modules/data.js');
        await loadScript('https://code.highcharts.com/maps/modules/accessibility.js');
    } catch (error) {
        console.error('Error loading Highcharts scripts:', error);
    }
};

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

// Call the function to preload scripts
loadHighchartsScripts();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

