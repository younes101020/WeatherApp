import '../styles/Weather.scss'
import { useEffect, useState, useContext } from 'react';
import { IWeather, ICity } from '../../types/interfaces'
import { CiTempHigh } from 'react-icons/ci';
import { TbMathMax, TbMathMin } from 'react-icons/tb';
import { ThemeContext } from './App';



function Weather({ city }: { city: ICity }) {
    const [weather, setWeather] = useState<IWeather[]>([]);
    const { theme } = useContext(ThemeContext);
    const [jourS, jourN, mois] = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).split(' ');
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`http://localhost:3001/weather/${city.latitude}/${city.longitude}`);
                const weather = await response.json();
                setWeather(weather.data);
                console.log(weather)
            } catch (error) {
                console.log(error);
            }
        };
        fetchWeather();
    }, [city]);

    return (
                weather ? (
                    <div className={`weather card ${theme.rest}`}>
                        <div className="card-header">
                            <h1>{jourS.replace(/^\w/, c => c.toUpperCase())} <span id="falc">{jourN} {mois}</span></h1>
                            <img src="https://www.weatherbit.io/static/img/icons/c03d.png" alt="Weather icon" />
                        </div> 
                        <div className="card-body">
                            <div className="temp">
                                <div className={`info ${theme.body}`}>
                                    <CiTempHigh /> <span>|</span><p>8C</p>
                                </div>
                            </div>
                            <div className="optTemp">
                                <div className={`info ${theme.body}`}>
                                    <TbMathMax /> <span>|</span><p>8C</p>
                                </div>
                            </div>
                            <div className="optTemp">
                                <div className={`info ${theme.body}`}>
                                    <TbMathMin /> <span>|</span><p>8C</p>
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