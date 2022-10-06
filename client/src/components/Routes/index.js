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
import Navbar from '../Navbar'

const index = () => {
  // Navigation
  return (
    // Op appelle en premier le routeur.
    // Dans le switch, on appelle nos routes.
    // Si aucune de ces pages n'est trouvée par le Switch, alors on renvoie l'utilisateur à la page d'accueil du site.

    // Mettre la balise "Navbar" au dessus du "Switch" va faire en sorte que la barre de navigation va nous suivre partout sur le site, sur n'importe quelle page.
    <Router>
      <Navbar />
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
