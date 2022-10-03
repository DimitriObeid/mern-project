import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Trending from '../../pages/Trending'

const index = () => {
  // Navigation
  return (
    // Op appelle en premier le routeur.
    // Dans le switch, on appelle nos routes.
    // Si aucune de ces pages n'est trouvée par le Switch, alors on renvoie l'utilisateur à la page d'accueil du site.
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/trending" exact component={Trending} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default index
