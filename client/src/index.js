import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'

// On injecte ici (dans <App />) tous les affichages et toute la logique de l'application.
// La méthode "document.getElementById('root')" fait référence à l'ID "root" dans le fichier "index.html"
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
