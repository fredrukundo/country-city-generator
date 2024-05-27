const fetch = require('node-fetch');
const fs = require('fs');

const API_URL = 'https://countriesnow.space/api/v0.1/countries';

const fetchCountriesData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching data:', data.msg);
      return;
    }

    const countriesData = data.data.map(country => ({
      country: country.country,
      cities: country.cities,
    }));

    fs.writeFileSync('countriesData.json', JSON.stringify(countriesData, null, 2));
    console.log('Data has been written to countriesData.json');
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchCountriesData();
