import '../styles/Weather.scss'
import { useEffect, useContext, useState } from 'react';
import { ICity } from '../../types/interfaces'
import { TbMathMax, TbMathMin } from 'react-icons/tb';
import { ThemeContext } from './App';
import { WeatherContext } from './Input';

function convertDate(dateString: string) {
    const date = new Date(dateString);
    const option = { weekday: 'long', day: 'numeric', month: 'long' };  
    const frenchDateString = date.toLocaleDateString('fr-FR', option);  
    return frenchDateString.charAt(0).toUpperCase() + frenchDateString.slice(1);
}  


function Weather({ city }: { city: ICity }) {
    const [weather, setWeather] = useContext(WeatherContext);
    const { theme } = useContext(ThemeContext);
    const [jourS, jourN, mois] = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).split(' ');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:3001/weather/${city.latitude}/${city.longitude}`);
                const weatherResp = await response.json();
                setWeather({id: 0 ,data: weatherResp.data});
            } catch (error) {
                console.log(error);
            }
        };
        fetchWeather();
    }, [city]);

    console.log(weather)

    return (
                weather ? (
                    <div className={`weather card ${theme.rest}`}>
                        <div className="card-header">
                            {/* <h1>{jourS.replace(/^\w/, c => c.toUpperCase())} <span id="falc">{jourN} {mois}</span></h1> */}
                            <h1>{convertDate(weather.data[weather.id].valid_date)}</h1>
                            <h2>{weather.data[weather.id].cityName}</h2>
                        </div> 
                        <div className="card-body">
                            <div className="temp">
                                    <p>{weather.data[weather.id].temp} °</p>
                                    <img src="https://www.weatherbit.io/static/img/icons/c03d.png" alt="Weather icon" />
                            </div>
                            <div className="addTemp">
                                <div className="optTemp">
                                    <div className={`info`}>
                                        <TbMathMax /> <span>|</span><p>{weather.data[weather.id].max_temp} °</p>
                                    </div>
                                </div>
                                <div className="optTemp">
                                    <div className={`info`}>
                                        <TbMathMin /> <span>|</span><p>{weather.data[weather.id].min_temp} °</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ) : (
                    <div className={`weather ${theme}Skeleton card`}></div>
                )
            
    )
}
export default Weather