import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'http://api.weatherapi.com/v1/current.json?';

const WeatherService = {
  getByName: (countryName) => {
    const url = `${baseUrl}key=${apiKey}&q=${countryName}&aqi=no`;
    const request = axios.get(url);
    return request.then(response => response.data);    
  }
}

export default WeatherService