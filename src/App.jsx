import { createContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import Weather from './Weather'
import Article from './Article'
import './styles/App.scss'

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState({
    body: 'isBodyDark',
    rest: 'isDark'
  })
  const body = document.querySelector('body');

  useEffect(() => {
    const isLightMode = localStorage.getItem('mode');
    if(isLightMode) {
      body.classList.remove('isBodyDark')
      body.classList.add('isBodyLight');
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mode', theme.body)
    body.classList.remove('isBodyDark', 'isBodyLight');
    body.classList.add(theme.body);
  }, [theme.body])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Navbar />
    </ThemeContext.Provider>
  )
}

export default App
