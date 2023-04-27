import '../styles/Article.scss'
import { Theme } from '../../types/interfaces'

function Article({ theme }: { theme: Theme['rest'] }) {
    return (
        false ? (
           <div className={`article ${theme}Skeleton`}>
                <div className='skeleton'></div>
            </div> 
        ): (
            <div className={`article ${theme}Skeleton`}></div> 
        )
        
    )
}
export default Article;