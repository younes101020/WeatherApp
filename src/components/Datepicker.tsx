import '../styles/Datepicker.scss';
import { Theme } from '../../types/interfaces';
import { useState, useContext } from 'react';
import { WeatherContext } from './Input';

function Datepicker({ theme }: { theme: Theme['rest'] }) {
    const [weather, setWeather] = useContext(WeatherContext);

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeather({...weather, id: parseInt(e.target.value)});
    }

    return <div className='date'>
                <input type="range" name="datepicker" className={`${theme}`} id="datepicker" onChange={handleDate} min={0} max={15} />
           </div>
}

export default Datepicker;