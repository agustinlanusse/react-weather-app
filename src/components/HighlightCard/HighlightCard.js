import React from 'react';
import './HighlightCard.css';

function HighlightCard(props) {
    return (
        <div className='HighlightCard'>
            <p className='highlight-title'>{ props.title }</p>
            <p className='highlight-content'>{ props.content }<span>{ props.symbolContent }</span></p>
            <p className='highlight-message'>{ props.message }</p>
        </div>
    );
}

export default HighlightCard;