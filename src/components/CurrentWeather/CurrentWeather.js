import React from 'react';
import SearchLocation from '../SearchLocation/SearchLocation';
import WeatherIcons from '../../services/WeatherIcons/WeatherIcons';
import { ReactComponent as Showers } from '../../assets/weather-icons/rain-2.svg';
import './CurrentWeather.css';

function CurrentWeather(props) {
    const locationName = props.locationName;
    const currentConditions = props.currentConditions;
    const currentTime = new Date(currentConditions.EpochTime * 1000);
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    return (
        <aside className='CurrentWeather'>
            <SearchLocation />
            <h1>{ `${locationName.city}, ${locationName.country}` }</h1>
            { WeatherIcons(currentConditions.WeatherIcon, 'current-weather-icon') }
            <p className='current-temperature'>{ `${Math.round(currentConditions.Temperature.Metric.Value)}°C` }</p>
            <p className='current-time'>{ `${days[currentTime.getDay()]}, ${currentTime.getHours()}:${currentTime.getMinutes()}` }</p>
            <hr></hr>
            <div className='details'>
                { WeatherIcons(currentConditions.WeatherIcon, 'current-details') }
                <p>{ currentConditions.WeatherText }</p>
            </div>
            <div className='precipitation'>
                <Showers className='current-precipitation' />
                <p>Precipitation - {currentConditions.PrecipitationSummary.Precipitation.Metric.Value}mm</p>
            </div>
        </aside>
    );
}

export default CurrentWeather;