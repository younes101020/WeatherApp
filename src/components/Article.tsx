import '../styles/Article.scss';
import { Theme } from '../../types/interfaces';
import { BsFillSunriseFill } from 'react-icons/bs';
import { useContext } from 'react';
import { WeatherContext } from './Input';

function Article({ theme }: { theme: Theme['rest'] }) {
    const [weather, setWeather] = useContext(WeatherContext);
    console.log(weather);
    return (
        true ? (
           <div className={`article card ${theme}Skeleton`}>
                <div className='sunrise'>
                    <BsFillSunriseFill className='sunriseIco' /><hr /><p> Levé du <span className='strong'>soleil</span></p>
                </div>
            </div> 
        ): (
            <div className={`article card ${theme}Skeleton`}></div> 
        )
        
    )
}
export default Article;