import '../styles/Weather.scss'
import { useEffect, useState } from 'react';
import { IWeather, ICity, Theme } from '../../types/interfaces'

function Weather({ city, theme }: { city: ICity, theme: Theme['rest']}) {
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
            <div className={`weather ${theme} card`}>
                {false ? (
                    <p>Valeur chargé</p>
                ) : (
                    <div className="skeleton"></div>
                )}
            </div>
    )
}
export default Weather