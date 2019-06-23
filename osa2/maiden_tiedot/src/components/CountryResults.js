import React from 'react';
import UListWithButtons from './UListWithButtons';
import CurrentWeather from './CurrentWeather';

const CountryDetails = ({name, capital, population, 
  languages, flag, weatherData}) => (
  <div>
      <h1>{name}</h1>
      <img src={flag} alt={`Flag of ${name}`} className="image" />
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Official languages of {name}</h3>
      <ul>
        {languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <CurrentWeather location={capital} weatherData={weatherData} />
    </div>
);

const CountryResults = ({countries, showMoreHandler, weatherData}) => 
  countries.length > 10 ? (
    <p>Too many matches.</p>
  ) : countries.length > 1 ? (
    <UListWithButtons src={countries} keyField="alpha2Code" valField="name"
      btnHandler={showMoreHandler} btnText="show"/>
  ) : countries.length ? (
    <CountryDetails name={countries[0].name} capital={countries[0].capital}
      population={countries[0].population} languages={countries[0].languages} 
      flag={countries[0].flag} weatherData={weatherData} />
  ) : (
    <p>No matches found.</p>
  );

export default CountryResults;