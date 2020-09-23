import React from 'react';
import WeatherIcons from '../../services/WeatherIcons/WeatherIcons';
import './WeatherCard.css';

function WeatherCard(props) {
    return (
        <div className='WeatherCard'>
            <p className='day'>{ props.day }</p>
            { WeatherIcons(props.icon, 'forecast-icon') }
            <div className='temperatures'>
                { props.minTemp ? <React.Fragment>
                    <p className='max-temp'>{ parseInt(props.maxTemp) }°</p>
                    <p className='min-temp'>{ parseInt(props.minTemp) }°</p>
                </React.Fragment> : <p className='max-temp' style={ { margin: '10px auto' } }>{ parseInt(props.maxTemp) }°</p> }
            </div>
        </div>
    );
};

export default WeatherCard;