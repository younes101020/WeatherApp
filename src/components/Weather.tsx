import '../styles/Weather.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Weather({ data }) {
    console.log(data)
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