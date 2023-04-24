import '../styles/Article.scss'
import { Theme } from '../../types/interfaces'

function Article({ theme }: { theme: Theme['rest'] }) {
    return (
        false ? (
           <div className={`citydesc ${theme} card`}>
                <div className='skeleton'></div>
            </div> 
        ): (
            <div className={`skeleton ${theme} card`}></div> 
        )
        
    )
}
export default Article;