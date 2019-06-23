import React from 'react';

const CurrentWeather = ({location, weatherData}) => {
   return weatherData ? (
    <div>
      <h3>Weather in {location}</h3>
      <p>Temperature: {weatherData.temperature} degrees Celsius</p>
      <img src={weatherData.conditionIcon} alt={weatherData.conditionText} />
      <p>Wind: {weatherData.windSpeed} kph, direction {weatherData.windDir}</p>
    </div>
  ) : (
    <p>Failed fetching the weather for {location}.</p>
  );
}

export default CurrentWeather;
