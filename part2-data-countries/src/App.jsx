import { useState, useEffect, use } from 'react'
import CountriesService from './services/CountriesService';
import WeatherService from './services/WeatherService';
import CountryDetails from './components/CountryDetails';

function App() {
  
const [searchText, setSearchText] = useState('');
const [countries, setCountries] = useState([]);
const [filteredCountries, serFilteredCountries ] = useState([]); 
const [foundedCountry, setFoundedCountry] = useState(null);
const [weather, setWeather] = useState(null);

const handleSearchTextChange = (event) => {
  setSearchText(event.target.value);

  const filteredCountries = countries.filter(country => 
  country.name.common.toLowerCase().includes(event.target.value.toLowerCase()));  
  serFilteredCountries(filteredCountries);
  if (filteredCountries.length === 1){
    setFoundedCountry(filteredCountries[0]);
  }else{
    setFoundedCountry(null);
  }
}

const handleClickShowCountry = (event) => {
  const countryName = event.target.name;  
  const country = countries.find(c => c.name.common === countryName);
  setFoundedCountry(country);  
}

useEffect(() => {
  if (countries.length === 0 ){
    CountriesService.getAll().then(countries => {    
      setCountries(countries);
    });
  }
  if (foundedCountry) {
    WeatherService.getByName(foundedCountry.name.common).then(data => {
      console.log('weather data', data);
      setWeather(data);
    });
  }
}, [foundedCountry]);

if (countries.length === 0) {
  return <div>Loading countries...</div>
}
  
  return (    
    <div>
      <label htmlFor="country_name">find countries </label>
      <input type="text" 
        placeholder='type a country name'
        value={searchText}
        onChange={handleSearchTextChange}
      />      

     {
     (!foundedCountry)?
     ( <ul>
        {filteredCountries.map(country => 
          <li key={country.name.common}>
            {country.name.common} 
            <button 
              name={country.name.common}
              onClick={handleClickShowCountry}
              >show</button>
          </li>  
        )}
      </ul>)
      : (<CountryDetails 
            countryName={foundedCountry.name.common} 
            countryFlag={foundedCountry.flags.png}
            countryCapital={foundedCountry.capital}
            countryArea={foundedCountry.area}
            countryLanguages={foundedCountry.languages}
            weather={weather}/>)
      }

    </div>            
  )
}


export default App;
