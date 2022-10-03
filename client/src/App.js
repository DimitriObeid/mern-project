import React from 'react'

// On appelle notre navigation (elle passera automatiquement par le fichier "index.js")
import Routes from './components/Routes'

const App = () => {
  // On appelle notre component "Routes" dans une balise HTML.
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App
