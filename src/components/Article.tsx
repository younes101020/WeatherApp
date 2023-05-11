import '../styles/Article.scss';
import { Theme } from '../../types/interfaces';
import { BsFillSunriseFill } from 'react-icons/bs';
import { useContext, useEffect, useRef, useState } from 'react';
import { WeatherContext } from './Input';
import { IWeather, ICelestial } from '../../types/interfaces';

function Article({ theme }: { theme: Theme['rest'] }) {
    const [weather, setWeather] = useContext(WeatherContext);
    const [moonsun, setMoonsun] = useState<ICelestial[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    const setHour = (celestialType: number): string => {
        const time = new Date(celestialType * 1000);
        const formattedHour = time.toLocaleString('fr-Fr', {hour: '2-digit', minute: '2-digit'});
        return formattedHour;
    }

    useEffect(() => {
        if(isMounted) {
            const celestialEvent = weather.map((el: IWeather) => {
                return {
                    date: el.valid_date,
                    moonrise: setHour(el.moonrise_ts),
                    moonset: setHour(el.moonset_ts),
                    sunrise: setHour(el.sunrise_ts),
                    sunset: setHour(el.sunset_ts)
                }})
            setMoonsun(celestialEvent);
        } else {
            setIsMounted(true);
        }
    }, [weather])

    console.log(weather);
    return (
        moonsun.length > 0 ? (
           <div className={`article card ${theme}`}>
                <div className="details">
                    <div className='column'>
                        <BsFillSunriseFill className='sunriseIco' />
                        <hr />
                        <p> Levé du <span className='strong'>soleil</span> à <span className='hours'>{moonsun[0].sunrise}</span></p>
                    </div>
                    <div className='column'>
                        <BsFillSunriseFill className='sunriseIco' />
                        <hr />
                        <p> Couché du <span className='strong'>soleil</span> à <span className='hours'>{moonsun[0].sunset}</span></p>
                    </div>
                    <div className='column'>
                        <BsFillSunriseFill className='sunriseIco' />
                        <hr />
                        <p> Levé de la <span className='strong'>lune</span> à <span className='hours'>{moonsun[0].moonrise}</span></p>
                    </div>
                    <div className='column'>
                        <BsFillSunriseFill className='sunriseIco' />
                        <hr />
                        <p> Couché de la <span className='strong'>lune</span> à <span className='hours'>{moonsun[0].moonset}</span></p>
                    </div>
                </div>  
            </div> 
        ): (
            <div className={`article card ${theme}Skeleton`}></div> 
        )
        
    )
}
export default Article;