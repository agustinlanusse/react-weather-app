import React, { useState, useEffect } from 'react';
import apiUtils from '../../api/apiUtils';
import WeatherCard from '../WeatherCard/WeatherCard';
import './ForecastSelector.css';

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

function ForecastSelector(props) {
    const [option, setOption] = useState('today');
    const [forecast, setForecast] = useState([]);

    const getHourlyForecast = () => {
        let locationKey = new URLSearchParams(window.location.search);
        locationKey = locationKey.get('locationKey');

        fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${ locationKey }?apikey=${ apiUtils.accuWeather.apiKey }&metric=true`)
            .then(response => response.json())
            .then(result => {
                let res;
                res = result.map((hour, idx) => {
                    let time = new Date(hour.DateTime).getHours().toString();
                    if(time.length === 1) { time = '0' + time }
                    return <WeatherCard key={ idx } day={ time } icon={ hour.WeatherIcon } maxTemp={ parseInt(hour.Temperature.Value) } />
                })
                setForecast(res);
            })
    };

    const getWeekForecast = () => {
        let res;
        res = props.forecast.map((day, idx) => {
            let date = new Date(day.Date);
            return <WeatherCard key={ idx } day={ days[date.getDay()] } icon={ day.Day.Icon } maxTemp={ day.Temperature.Maximum.Value } minTemp={ day.Temperature.Minimum.Value } />
        });
        setForecast(res);
    };

    useEffect(() => {
        if(option === 'today') {
            getHourlyForecast();
        } else if(option === 'week') {
            getWeekForecast();
        }
    }, [option]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='ForecastSelector'>
            <div className='forecast-header'>
                <button className={ option === 'today' ? 'active' : null } onClick={ () => setOption('today') }>Today</button>
                <button className={ option === 'week' ? 'active' : null } onClick={ () => setOption('week') }>Week</button>
            </div>
            <div className='week-forecast'>
                { forecast.map(card => card) }
            </div>
        </div>
    );
};

export default ForecastSelector;