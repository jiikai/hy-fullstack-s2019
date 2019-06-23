import React, { useState, useEffect } from 'react';
import CountryResults from './components/CountryResults';
import TrackedInput from './components/TrackedInput';
import restCountries from './services/restCountries';
import apixuWeather from './services/apixuWeather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resData, setResData] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState('');
  const [weatherData, setWeatherData] = useState(undefined);

  const startsWithTrimmedCaseless = (s1, s2) => 
    s1.trim().toLowerCase().startsWith(s2.trim().toLowerCase());

  const showMore = (id, keyField) => {
    setResData(resData.filter(el => el[keyField] === id));
    setWeatherLocation(resData[0].capital);
  }

  const filterCountries = (event) => {
    const filterExpr = event.target.value;
    setFilterText(filterExpr);
    const filteredCountries = countries.filter(el => 
      startsWithTrimmedCaseless(el.name, filterExpr));
    setResData(filteredCountries);
    if (filteredCountries.length === 1)
      setWeatherLocation(filteredCountries[0].capital);
  }

  useEffect(() => {
    restCountries.getAll()
      .then(ret => {
        const tmp = ret.map(el => el);
        setCountries(tmp);
        setResData(tmp);
      }).catch(error => {
        console.log(error);
        setCountries(null);
        setResData(null);
      })
  }, []);

  useEffect(() => {
    if (weatherLocation)
      apixuWeather.getCurrentWeather(weatherLocation)
        .then(ret => {
          setWeatherData({
            temperature: ret.current.temp_c, 
            conditionIcon: ret.current.condition.icon, 
            conditionText: ret.current.condition.text,
            windSpeed: ret.current.wind_kph,
            windDir: ret.current.wind_dir
          });
        }).catch(error => {
          console.log(error);
          setWeatherData(undefined);
        });
  }, [weatherLocation]);

  return countries && resData ? (
    <div>
      <TrackedInput prependTxt="find countries" valueExpr={filterText}
        onChange={event => filterCountries(event)} appendTxt=""/>
      <CountryResults countries={resData} showMoreHandler={showMore} 
        weatherData={weatherData}/>
    </div>
  ) : (
    <p>Something went wrong fetching country data.</p>
  );
}

export default App;