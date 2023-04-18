import Weather from './Weather';
import Article from './Article';
import { ThemeContext } from './App'
import './styles/Input.scss';
import { useContext, useState, useEffect, useCallback, useRef, useReducer } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { GiPositionMarker } from 'react-icons/gi';

const initialState = {
    city: { lat: '48.866667', lon: '2.333333' },
    cityOnChange: '',
    citySugg: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, city: action.payload };
        case 'SET_CITY_ON_CHANGE':
            return { ...state, cityOnChange: action.payload };
        case 'SET_CITY_SUGG':
            return { ...state, citySugg: action.payload };
        default:
            throw new Error();
    }
}

function Input() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { city, cityOnChange, citySugg } = state;
    const formRef = useRef();
    const isSuggestionVal = cityOnChange.includes(' ');
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (cityOnChange.length > 2 && !isSuggestionVal) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/geocode/${cityOnChange}`);
                    const data = await response.json();
                    dispatch({ type: 'SET_CITY_SUGG', payload: data });
                } catch (error) {
                    console.log(error);
                }
            };
            fetchSearchResults();
        }
    }, [cityOnChange]);

    const handleInputChange = async (e) => {
        dispatch({ type: 'SET_CITY_ON_CHANGE', payload: e.target.value });
        if (e.target.value === '') {
            dispatch({ type: 'SET_CITY_SUGG', payload: [] });
        }
    };

    const handleClick = (place) => {
        dispatch({ type: 'SET_CITY_ON_CHANGE', payload: place.name + ' ' });
        dispatch({ type: 'SET_CITY_SUGG', payload: [] });
        formRef.current.submit();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const fetchWeather = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:3001/weather/${city.lat}/${city.lon}`);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, [city]);

    useEffect(() => {
        fetchWeather();
    }, [city]);

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className='Input' autoComplete='off'>
                <span className={theme.rest}>
                    <GiPositionMarker />
                </span>
                <div className='field'>
                    <input type='text' id='city' name='cityOnChange' onChange={handleInputChange} value={cityOnChange} />
                    
                            {citySugg.length > 0 ?
                            (
                            <div className={`citySugg ${theme.rest}`}>
                                <ul>
                                {citySugg.map((el, index) => (
                                    <li key={index} onClick={() => handleClick(el)}>{el.name}</li>
                                ))}
                                </ul>
                            </div>
                            )
                                :
                            null
                            }
                    
                </div>
                <button type='submit' className={theme.rest}>
                    <AiOutlineEnter />
                </button>
            </form>
            <section className='container'>
                <Weather />
                <Article />
            </section>
        </>
    );
}

export default Input