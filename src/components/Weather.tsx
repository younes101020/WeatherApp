import '../styles/Weather.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from 'react';
import { cityType } from './Input';

interface IWeather {
    valid_date: string,
    temp: number,
    max_temp: number,
    min_temp: number,
    average_humid: number,
    icon: string,
    visibility_km: number,
    sunset_ts: number,
    sunrise_ts: number,
    moonrise_ts: number,
    moonset_ts: number
}

function Weather({ city }: { city: cityType }) {

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
            <div className='weather'>
                {data ? (
                    <p>Valeur chargé</p>
                ) : (
                    <Skeleton baseColor={'#020617'} highlightColor={'#0f172a'} />
                )}
            </div>
    )
}
export default Weather