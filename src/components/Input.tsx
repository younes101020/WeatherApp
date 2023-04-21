import Weather from './Weather';
import Article from './Article';
import { ThemeContext } from './App'
import useDebounce from '../hooks/useDebounce';
import '../styles/Input.scss';
import { useContext, useEffect, useRef, useReducer } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { GiPositionMarker } from 'react-icons/gi';

interface ICityData {
    name: string,
    latitude: number,
    longitude: number
}

type IAction = {
    type: 'SET_CITY' | 'SET_CITY_ON_CHANGE' | 'SET_CITY_SUGG' | 'SET_WEATHER',
    payload: any
}

const initialState = {
    city: { latitude: '48.866667', longitude: '2.333333' },
    cityOnChange: '',
    citySugg: [],
    weather: []
};

function reducer(state: ICityData, action: IAction) {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, city: action.payload };
        case 'SET_CITY_ON_CHANGE':
            return { ...state, cityOnChange: action.payload };
        case 'SET_CITY_SUGG':
            return { ...state, citySugg: action.payload };
        case 'SET_WEATHER':
            return { ...state, weather: action.payload };
        default:
            throw new Error();
    }
}

function Input() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { city, cityOnChange, citySugg, weather } = state;
    const formRef = useRef();
    const isSuggestionVal = cityOnChange.includes(' ');
    const { theme } = useContext(ThemeContext);
    const debouncedInputValue = useDebounce(cityOnChange, 500)

    useEffect(() => {
        if (debouncedInputValue && !isSuggestionVal) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/geocode/${cityOnChange}`);
                    const data = await response.json();
                    dispatch({ type: 'SET_CITY_SUGG', payload: data });
                    console.log(data)
                } catch (error) {
                    console.log(error);
                }
            };
            fetchSearchResults();
        }
    }, [debouncedInputValue]);

    const handleInputChange = async (e) => {
        dispatch({ type: 'SET_CITY_ON_CHANGE', payload: e.target.value });
        if (e.target.value === '') {
            dispatch({ type: 'SET_CITY_SUGG', payload: [] });
        }
    };

    const handleClick = (obj: ICityData) => {
        dispatch({ type: 'SET_CITY_ON_CHANGE', payload: obj.name + ' ' });
        dispatch({ type: 'SET_CITY', payload: obj });
        dispatch({ type: 'SET_CITY_SUGG', payload: [] });
        formRef.current && (formRef.current as HTMLFormElement).click();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:3001/weather/${city.latitude}/${city.longitude}`);
                const weather = await response.json();
                dispatch({ type: 'SET_WEATHER', payload: weather.data });
            } catch (error) {
                console.log(error);
            }
        };
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
                <Weather data={weather} />
                <Article />
            </section>
        </>
    );
}

export default Input