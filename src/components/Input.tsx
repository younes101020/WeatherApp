import Datepicker from './Datepicker';
import Weather from './Weather';
import Article from './Article';
import { ThemeContext } from './App'
import useDebounce from '../hooks/useDebounce'
import '../styles/Input.scss';
import { createContext, useContext, useEffect, useRef, useReducer, useState } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { GiPositionMarker } from 'react-icons/gi';
import { State, Action } from '../../types/reducerInterface'


export const WeatherContext = createContext<any>(null);

const initialState: State = {
    city: { 
        name: 'paris', 
        latitude: 48.866667, 
        longitude: 2.333333 
    },
    cityOnChange: '',
    citySugg: [],
};

function reducer(state: State, action: Action) {
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
    const formRef = useRef<HTMLFormElement>(null);
    const isSuggestionVal = state.cityOnChange.includes(' ');
    const { theme } = useContext(ThemeContext);
    const weatherState = useState(null);
    const debouncedInputValue = useDebounce(state.cityOnChange, 500);

    useEffect(() => {
        if (debouncedInputValue && !isSuggestionVal) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/geocode/${state.cityOnChange}`);
                    const data = await response.json();
                    const uniqData = data.filter((value: any, index: number, self: any[]) =>
                        index === self.findIndex((t) => (
                            t.name === value.name
                        ))
                    )
                    dispatch({ type: 'SET_CITY_SUGG', payload: uniqData });
                } catch (error) {
                    console.log(error);
                }
            };
            fetchSearchResults();
        }
    }, [debouncedInputValue]);

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_CITY_ON_CHANGE', payload: e.target.value });
        if (e.target.value === '') {
            dispatch({ type: 'SET_CITY_SUGG', payload: [] });
        }
    };

    const handleClick = (obj: State["city"]) => {
        dispatch({ type: 'SET_CITY_ON_CHANGE', payload: obj.name + ' ' });
        dispatch({ type: 'SET_CITY', payload: obj });
        dispatch({ type: 'SET_CITY_SUGG', payload: [] });
        formRef.current && formRef.current.click();
    };

    const handlePosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            dispatch({ type: 'SET_CITY', payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }});
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
    };

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className='Input' autoComplete='off'>
                <span className={`position ${theme.rest}`} onClick={handlePosition}>
                    <GiPositionMarker />
                </span>
                <div className='field'>
                    <input type='text' id='city' name='cityOnChange' onChange={handleInputChange} value={state.cityOnChange} />
                            {state.citySugg.length > 0 ?
                            (
                            <div className={`citySugg ${theme.rest}`}>
                                <ul>
                                {state.citySugg.map((el: State['city'], index: number) => (
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
                <WeatherContext.Provider value={weatherState}>
                    <Datepicker theme={theme.rest} />
                    <Weather city={state.city} />
                    <Article theme={theme.rest} />
                </WeatherContext.Provider>
            </section>
        </>
    );
}

export default Input
export type cityType = State["city"];