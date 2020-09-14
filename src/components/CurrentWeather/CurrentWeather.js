import React from 'react';
import SearchLocation from '../SearchLocation/SearchLocation';

import { ReactComponent as Sun } from '../../assets/weather-icons/sun.svg';
import { ReactComponent as Cloud } from '../../assets/weather-icons/cloud.svg';
import { ReactComponent as Cloudy } from '../../assets/weather-icons/cloudy-1.svg';
import { ReactComponent as Showers } from '../../assets/weather-icons/rain-2.svg';
import { ReactComponent as Rain } from '../../assets/weather-icons/rain-1.svg';
import { ReactComponent as Storm } from '../../assets/weather-icons/storm.svg';
import { ReactComponent as Snow } from '../../assets/weather-icons/snowing-3.svg';
import { ReactComponent as Summer } from '../../assets/weather-icons/summer.svg';
import { ReactComponent as Winter } from '../../assets/weather-icons/winter.svg';
import { ReactComponent as Windy } from '../../assets/weather-icons/tornado.svg';
import { ReactComponent as Night } from '../../assets/weather-icons/night-1.svg';

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
    const getIcon = (iconid, style) => {
        if(iconid >= 1 && iconid <= 5) {
            return <Sun className={ style } />;
        } else if(iconid >= 6 && iconid <= 11) {
            return <Cloudy className={ style } />;
        } else if(iconid === 12) {
            return <Showers className={ style } />;
        } else if(iconid >= 13 && iconid <= 14) {
            return <Rain className={ style } />;
        } else if(iconid === 15) {
            return <Storm className={ style } />;
        } else if(iconid >= 16 && iconid <= 17) {
            return <Rain className={ style } />;
        } else if(iconid === 18) {
            return <Showers className={ style } />;
        } else if(iconid === 19) {
            return <Cloud className={ style } />;
        } else if(iconid >= 20 && iconid <= 21) {
            return <Cloudy className={ style } />;
        } else if(iconid >= 22 && iconid <= 29) {
            return <Snow className={ style } />;
        } else if(iconid === 30) {
            return <Summer className={ style } />;
        } else if(iconid === 31) {
            return <Winter className={ style } />;
        } else if(iconid === 32) {
            return <Windy className={ style } />;
        } else if(iconid >= 33 && iconid <= 37) {
            return <Night className={ style } />;
        } else if(iconid === 38) {
            return <Cloud className={ style } />;
        } else if(iconid >= 39 && iconid <= 40) {
            return <Showers className={ style } />;
        } else if(iconid >= 40 && iconid <= 42) {
            return <Storm className={ style } />;
        } else if(iconid >= 43 && iconid <= 44) {
            return <Snow className={ style } />;
        }
    };

    return (
        <aside className='CurrentWeather'>
            <SearchLocation />
            <h1>{ `${locationName.city}, ${locationName.country}` }</h1>
            { getIcon(currentConditions.WeatherIcon, 'current-weather-icon') }
            <p className='current-temperature'>{ `${Math.round(currentConditions.Temperature.Metric.Value)}°C` }</p>
            <p className='current-time'>{ `${days[currentTime.getDay()]}, ${currentTime.getHours()}:${currentTime.getMinutes()}` }</p>
            <hr></hr>
            <div className='details'>
                { getIcon(currentConditions.WeatherIcon, 'current-details') }
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