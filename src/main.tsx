import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './styles/_main.scss'

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error("Error : couldn't found root");
}

