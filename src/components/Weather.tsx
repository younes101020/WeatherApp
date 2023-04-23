import '../styles/Weather.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
import { cityType } from './Input';
import { IWeather } from '../../types/interfaces'

function Weather({ city }: { city: cityType }) {
    const [weather, setWeather] = useState<IWeather[]>([]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:3001/weather/${city.latitude}/${city.longitude}`);
                const weather = await response.json();
                setWeather(weather.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWeather();
    }, [city]);

    return (
            <div className='weather'>
                {weather ? (
                    <p>Valeur chargé</p>
                ) : (
                    <Skeleton baseColor={'#020617'} highlightColor={'#0f172a'} />
                )}
            </div>
    )
}
export default Weather