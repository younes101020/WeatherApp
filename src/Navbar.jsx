// La gestion de l'état du theme se fais intégralement sur le composant navbar
// excepter l'initialisation qui elle se fais sur le composant App
import { useContext, useMemo } from 'react';
import './styles/Navbar.scss'
import { ThemeContext } from './App'
import { HiMoon } from 'react-icons/hi'
import { AiFillGithub } from 'react-icons/ai'
import { FiSun } from 'react-icons/fi'

function Navbar() {
    const {theme, setTheme} = useContext(ThemeContext)

    const handleClick = () => {
        setTheme(prevTheme => {
            const newBodyTheme = prevTheme.body === 'isBodyDark' ? 'isBodyLight' : 'isBodyDark';
            const newRestTheme = prevTheme.rest === 'isDark' ? 'isLight' : 'isDark';
            return { body: newBodyTheme, rest: newRestTheme }
    })
    }

    return (
        <nav className={`navbar ${theme.rest}`}>
            <ul className='menu'>
                <li><AiFillGithub /></li>
                <li onClick={handleClick}>
                    {theme.rest === "isDark" ? <HiMoon className='isDark' /> : <FiSun className='isLight' />}
                </li>
            </ul>
        </nav>
    )
}
export default Navbar