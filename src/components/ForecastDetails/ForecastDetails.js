import React from 'react';
import ForecastSelector from '../ForecastSelector/ForecastSelector';
import TodaysHighlights from '../TodaysHighlights/TodaysHighlights';
import './ForecastDetails.css';

function ForecastDetails(props) {
    return (
        <section className='ForecastDetails'>
            <ForecastSelector forecast={ props.forecast } />
            <TodaysHighlights highlights={ props.todaysHighlights } />
        </section>
    );
};

export default ForecastDetails;