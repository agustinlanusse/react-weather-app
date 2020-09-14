import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import apiUtils from './api/apiUtils';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';
import './styles/App.css';

const override = css`
  display: block;
  margin: auto;
`;

function App() {
  const [load, setLoad] = useState(true);
  const [locationName, setLocationName] = useState();
  const [forecast, setForecast] = useState();
  const [currentConditions, setCurrentConditions] = useState();

  const getLocationName = (locationKey) => {
    fetch(`http://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=${apiUtils.accuWeather.apiKey}`)
      .then(response => response.json())
      .then(result => setLocationName({ country: result.Country.LocalizedName, city: result.LocalizedName }));
  };

  const getForecast = (locationKey) => {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiUtils.accuWeather.apiKey}`)
      .then(response => response.json())
      .then(result => {
        setForecast(result.DailyForecasts);
      })
  };

  const getCurrentConditions = (locationKey) => {
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiUtils.accuWeather.apiKey}&details=true`)
      .then(response => response.json())
      .then(result => {
        setCurrentConditions(result[0]);
      })
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if(window.location.search.length === 0){
      fetch('http://api.ipstack.com/check?access_key=' + apiUtils.ipstack.apiKey)
        .then(response => response.json())
        .then(result => {
          fetch('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=' + apiUtils.accuWeather.apiKey + '&q=' + result.latitude + ',' + result.longitude)
            .then(res => res.json())
            .then(json => {
              window.location.search = `?locationKey=${json.Key}`;
            })
        })
    } else if(urlParams.has('locationKey')) {
      const urlParams = new URLSearchParams(window.location.search);
      const locationKey = urlParams.get('locationKey');
      getLocationName(locationKey);
      getForecast(locationKey);
      getCurrentConditions(locationKey);
      setTimeout(() => setLoad(false), 2500);
    }
  }, []);


  return (
    <div className="App">
      { load === true ?
          <BounceLoader
          size={ 80 }
          color={ '#d2d2d2' }
          css={ override }
          />
        : <CurrentWeather locationName={ locationName } currentConditions={ currentConditions } /> }
    </div>
  );
}

export default App;
