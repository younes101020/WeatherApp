import { createContext, useState } from 'react'
import Navbar from './Navbar'
import Input from './Input'
import '../styles/App.scss'
import { Theme } from '../../types/interfaces';

let myTheme: Theme = {
  body: '',
  rest: '',
};

export const ThemeContext = createContext<{theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>>}>({theme: myTheme, setTheme: () => {}});

function App() {
  const getInitialTheme = (): Theme => {
    const isLightMode = localStorage.getItem('mode');
    return isLightMode === 'isBodyLight'
      ? {
          body: 'isBodyLight',
          rest: 'isLight',
        }
      : {
          body: 'isBodyDark',
          rest: 'isDark',
        };
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Navbar />
      <Input />
    </ThemeContext.Provider>
  )
}

export default App
