import React from 'react';
import HighlightCard from '../HighlightCard/HighlightCard';
import './TodaysHighlights.css';

function TodaysHighlights(props) {
    let data = props.highlights;
    return (
        <div className='TodaysHighlights'>
            <h2>Today's Highlights</h2>
            <HighlightCard title='UV Index' content={ data.UVIndex } message={ data.UVIndexText } />
            <HighlightCard title='Wind Status' content={ data.Wind.Speed.Metric.Value } symbolContent='km/h' message={ 'Direction: ' + data.Wind.Direction.Localized } />
            <HighlightCard title='Humidity' content={ data.RelativeHumidity } symbolContent='%' />
            <HighlightCard title='Visibility' content={ data.Visibility.Metric.Value } symbolContent='km' message={ data.UVIndexText } />
            <HighlightCard title='Feels like' content={ data.RealFeelTemperature.Metric.Value } symbolContent='°C' />
            <HighlightCard title='Pressure' content={ data.Pressure.Metric.Value } symbolContent='mb' />
        </div>
    );
};

export default TodaysHighlights;