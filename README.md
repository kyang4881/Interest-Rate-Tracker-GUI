https://github.com/kyang4881/Interest-Rate-Tracker-GUI/assets/28466897/8d8b8656-5bad-4833-a1b7-27b4ecfe0ce5

## Installation

````
git clone https://github.com/kyang4881/Interest-Rate-Tracker-GUI.git
````

## Start Application

````
npm start
````

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Authentication

Add the .env file to the root directory and add the Trading Economics API Key.

````
REACT_APP_TE_API_KEY=your_api_key
````

## API Calls (JS)

The data used in this web app was extracted using the following API calls:

```` 
const response = await axios.get(
`https://api.tradingeconomics.com/calendar/indicator/${indicator}/${yearStart}/${todayDate}?c=${api_key}`
);
````

indicator: {inflation_rate, interest_rate} \
yearStart: The first date of the year \
todayDate: Today's date \
api_key: Trading Economics' API Key 

