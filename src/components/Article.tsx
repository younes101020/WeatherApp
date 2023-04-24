import '../styles/Article.scss'
import { Theme } from '../../types/interfaces'

function Article({ theme }: { theme: Theme['rest'] }) {
    return (
        false ? (
           <div className={`article ${theme}`}>
                <div className='skeleton'></div>
            </div> 
        ): (
            <div className={`article skeleton ${theme}`}></div> 
        )
        
    )
}
export default Article;