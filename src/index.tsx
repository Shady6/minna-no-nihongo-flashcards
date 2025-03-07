import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { DeckProvider } from './contexts/DeckContext'
import { DeckConfigProvider } from './contexts/DeckConfigContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <DeckConfigProvider>
      <DeckProvider>
        <App />
      </DeckProvider>
    </DeckConfigProvider>
  </React.StrictMode>
)
