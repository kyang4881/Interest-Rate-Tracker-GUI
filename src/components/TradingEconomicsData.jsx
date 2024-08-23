import { useEffect } from 'react';
import axios from 'axios';

// Fetch the API key from environment variables
const api_key = process.env.REACT_APP_TE_API_KEY;

const TradingEconomicsData = ({ dataType, setData }) => {
  useEffect(() => {
    // Function to fetch data from Trading Economics API
    const fetchData = async () => {
      try {
        // Determine which indicator to fetch based on dataType ('inflation' or 'interest')
        const indicator = dataType === 'inflation' ? 'inflation%20rate' : 'interest%20rate';
        // Get today's date and year start date in YYYY-MM-DD format
        const today = new Date();
        const yearStart = `${today.getFullYear()}-01-01`;
        const todayDate = today.toISOString().split('T')[0];

        // Fetch data from Trading Economics API using axios
        const response = await axios.get(
          `https://api.tradingeconomics.com/calendar/indicator/${indicator}/${yearStart}/${todayDate}?c=${api_key}`
        );

        // Extract the data from the API response
        const data = response.data;

        // Function to find the latest record for a specific country
        const findLatestRecord = (data, country) => {
          let latestRecord = null;
          for (let item of data) {
            if (
              item.Country === country &&
              item.Previous !== null &&
              item.Actual !== null &&
              item.Forecast !== null &&
              item.ReferenceDate !== null &&
              (!latestRecord || item.ReferenceDate > latestRecord.ReferenceDate)
            ) {
              latestRecord = item;
            }
          }
          return latestRecord;
        };

        // Array of countries to filter (only these countries are available through the API call)
        const countries = ['Mexico', 'Thailand', 'New Zealand', 'Sweden'];
        const filteredData = countries.map(country => findLatestRecord(data, country)).filter(record => record !== null);
        
        // Set the filtered data using setData function (provided via props)
        if (typeof setData === 'function') {
          setData(filteredData);
        }
      } catch (error) {
        // Handle errors if data fetching fails
        console.error('Error fetching data:', error);
      }
    };
    // Call fetchData function when component mounts or dataType/setData dependencies change
    fetchData();
  }, [dataType, setData]);
};

export default TradingEconomicsData;

