import Weather from './Weather';
import Article from './Article';
import { ThemeContext } from './App'
import './styles/Input.scss';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { GiPositionMarker } from 'react-icons/gi';

function Input() {
    const [ city, setCity ] = useState({lat: '48.866667', lon: '2.333333'});
    const [ cityOnChange, setCityOnChange ] = useState('');
    const [ citySugg, setCitySugg ] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        console.log(cityOnChange)
        if(cityOnChange.length > 2) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/geocode/${cityOnChange}`);
                    const data = await response.json();
                    setCitySugg(data);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchSearchResults();
        }
    }, [cityOnChange])

    const handleInputChange = async (e) => {
        setCityOnChange(e.target.value)
        if(e.target.value === '') {
            setCitySugg([])
        }
    }

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
    }, [city])

    return (
        <>
            <form onSubmit={handleSubmit} className='Input' autoComplete='off'>
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
                                    <li key={index}>{el.name}</li>
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
                <div className='weather'>
                    <ul className='timeline'>

                    </ul>
                </div>
                <div className='citydesc'>

                </div>
            </section>
        </>
    );
}

export default Input