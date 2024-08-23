import { useEffect, useRef } from 'react';

// A functional component that displays data on maps using Highcharts
const DisplayMaps = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    // Calls this function when data changes
    const loadMapData = async () => {
      try {
        // Fetching the map topology data
        const topology = await fetch('https://code.highcharts.com/mapdata/custom/world.topo.json').then(response => response.json());

        // Check if Highcharts and chart container are available
        if (window.Highcharts && chartContainerRef.current) {
          window.Highcharts.mapChart(chartContainerRef.current, {
            // Chart configuration options
            chart: {
              type: 'map',
              backgroundColor: '#282c34',
              map: topology
            },
            title: {
              text: 'Global Inflation/Interest Rate: Forecast vs Actual',
              align: 'center',
              style: {
                color: '#ffffff',
              }
            },
            credits: {
              enabled: false
            },
            mapNavigation: {
              enabled: true,
              buttonOptions: {
                verticalAlign: 'bottom'
              }
            },
            // Setting color ranges for data classes
            colorAxis: {
              dataClasses: [
                {
                  from: Number.NEGATIVE_INFINITY,
                  to: -0.01,
                  color: '#FF0000',
                  name: 'Actual Value BELOW Expectation'
                },
                {
                  from: -0.01,
                  to: 0.01,
                  color: '#fee60a',
                  name: 'Actual Value MEETS Expectation'
                },
                {
                  from: 0.01,
                  to: Number.POSITIVE_INFINITY,
                  color: '#8ae429',
                  name: 'Actual Value ABOVE Expectation'
                }
              ]
            },
            // Legend configuration
            legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              floating: true,
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              itemStyle: {
                color: '#000',
              },
              title: {
                text: 'Legend',
                style: {
                  fontWeight: 'bold',
                  fontSize: '14px'
                }
              }
            },
            // Tooltip format when hovering over data points
            tooltip: {
              formatter: function () {
                return `<b>${this.point.name}</b><br/>Actual ${this.point.category} Value: ${this.point.actual} %<br/>Previous ${this.point.category} Value: ${this.point.previous} %<br/>Forecasted ${this.point.category} Value: ${this.point.forecast} %<br/>Reference Date: ${this.point.reference}`;
              }
            },
            // Plot options configuration
            plotOptions: {
              series: {
                point: {
                  events: {
                    // Handling mouse hover events to adjust opacity
                    mouseOver: function () {
                      const point = this;
                      point.series.chart.series.forEach(series => {
                        series.data.forEach(dataPoint => {
                          if (dataPoint !== point) {
                            dataPoint.graphic.css({ opacity: 0.1 });
                          } else {
                            dataPoint.graphic.css({ opacity: 1 });
                          }
                        });
                      });
                    },
                    // Handling mouse out events to reset opacity
                    mouseOut: function () {
                      const point = this;
                      point.series.chart.series.forEach(series => {
                        series.data.forEach(dataPoint => {
                          dataPoint.graphic.css({ opacity: 1 });
                        });
                      });
                    }
                  }
                }
              }
            },
            // Mapping data into the series for the map
            series: [{
              name: 'Data',
              joinBy: ['iso-a3', 'code'],
              data: data.map(country => ({
                code: getCountryCode(country.Country),
                category: country.Category,
                actual: parseFloat(country.Actual),
                previous: parseFloat(country.Previous),
                forecast: parseFloat(country.Forecast),
                reference: formatDate(country.ReferenceDate),
                value: parseFloat(country.Actual) - parseFloat(country.Forecast)
              })),
              // Data label configuration
              dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                  operator: '>',
                  property: 'labelrank',
                  value: 250
                },
                style: {
                  fontWeight: 'normal'
                }
              }
            }]
          });
        }
      } catch (error) {
        console.error('Error loading Highcharts scripts:', error);
      }
    };

    // Helper function to get country code
    const getCountryCode = (countryName) => {
      const countryCodes = {
        'Mexico': 'MEX',
        'Sweden': 'SWE',
        'New Zealand': 'NZL',
        'Thailand': 'THA',
      };
      return countryCodes[countryName] || '';
    };
    
    // Helper function to clean the date format
    const formatDate = (dateString) => {
      try {
        return dateString.split('T')[0];
      } catch {
        return dateString;
      }
    };
    // Call loadMapData function when 'data' changes
    loadMapData();
  }, [data]);
  
  // Rendering the chart container
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div id="container" ref={chartContainerRef}></div>
    </div>
  );
};

export default DisplayMaps;
