const CountryDetails = ({ countryName, countryCapital, countryArea, countryLanguages, countryFlag, weather }) => {    
    
  return (
    <div>
        <h2>{countryName}</h2>
        <p>Capital {countryCapital && countryCapital.join(', ')}</p>
        <p>Area {countryArea}</p>
        <h3>Languages</h3>
        <ul>
        {countryLanguages && Object.values(countryLanguages).map(language => 
            <li key={language}>{language}</li>  
        )}
        </ul>
        <img src={countryFlag} alt={`flag of ${countryName}`} width="150" />        
        {(weather)?
            (<div>
            <h3>Weather in {weather?.location?.name }</h3>
            <p>temperature: {weather?.current?.temp_c} Celsius</p> 
            <p>Pressure: {weather?.current?.pressure_mb}</p>
            <img src={weather?.current?.condition?.icon} alt={weather?.current?.condition?.text} />          
            <p>wind: {weather?.current?.wind_kph} Km/h - direction: {weather?.current?.wind_dir}</p>      
            </div>)
            : <p>Loading weather...</p>  }
    </div>
    )
}       
export default CountryDetails;