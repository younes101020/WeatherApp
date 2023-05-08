import { createContext, useContext, useState } from 'react'
import Navbar from './Navbar'
import Weather from './Weather'
import Article from './Article'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './styles/App.scss'

const ThemeContext = createContext(null);

function App() {
  return (
    <ThemeContext.Provider>
      <Navbar />
    </ThemeContext.Provider>
  )
}

export default App
