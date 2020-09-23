import React, { useState } from 'react';
import './SearchLocation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCompass } from '@fortawesome/free-solid-svg-icons';
import apiUtils from '../../api/apiUtils';

function SearchLocation() {
    const [places, setPlaces] = useState([]);
    const [input, setInput] = useState({ locationName: '', locationKey: ''});

    const hideAutocompleteList = () => {
        return document.querySelector('.autocomplete-list').style.display = 'none';
    };

    const showAutocompleteList = event => {
        let inputValue = event.target.value;
        if(inputValue.length > 0) {
            return document.querySelector('.autocomplete-list').style.display = 'block';
        }
    };

    const searchLocation = async event => {
        let inputValue = event.target.value;
        let autoCompleteList = document.querySelector('.autocomplete-list');

        setInput({ locationName: inputValue });

        if(inputValue.length <= 1) {
            return autoCompleteList.style.display = 'none';
        } else if(inputValue.length > 0){
            await fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ apiUtils.accuWeather.apiKey }&q=${ inputValue }`)
            .then(response => response.json())
            .then(data => setPlaces(data));

            autoCompleteList.style.display = 'block';
        }
    };

    const selectLocation = (props) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('locationKey', props.locationKey);
        window.location.search = urlParams;

        setInput({ locationName: `${props.city}, ${props.country}`, locationKey: props.locationKey});
    };

    function Item(props) {
        return (
            <div className='autocomplete-item' onMouseDown={ () => selectLocation(props) }>{`${ props.city }, ${ props.country }`}</div>
        );
    };

    return (
        <form className='search-form' autoComplete='off'>
            <div className='search-container'>
                <span className='input-icon-container'>
                    <FontAwesomeIcon icon={ faSearch }></FontAwesomeIcon>
                    <input type='text' className='search-input' placeholder='Search for places...' onBlur={ hideAutocompleteList } 
                    onChange={ searchLocation } onFocus={ showAutocompleteList } value={ input.locationName }></input>
                </span>
                <FontAwesomeIcon icon={ faCompass }></FontAwesomeIcon>
                <div className='autocomplete-list'>
                    { places.length > 0 ?
                    places.map((place, idx) => {
                        return <Item key={ idx } city={ place.LocalizedName } country={ place.Country.LocalizedName } locationKey={ place.Key } t />
                    }) : <div className='autocomplete-item'>Places not found.</div> }
                </div>
            </div>
        </form>
    );
}

export default SearchLocation;