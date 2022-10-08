// Barre de navigation gauche du site.

import React from 'react'

import { NavLink } from 'react-router-dom'

const LeftNav = () => {
  // Il n'y a que du rendu, aucune logique n'a été codée.
  return (
    <div className="left-nav-container">
      <div className="icons">
        {/* Pour englober les icônes */}
        <div className="icons-bis">
          {/* Lorsque l'on se trouve sur le lien du Navlink, la classname "active" est injectée. Elle permet d'ajouter une barre à gauche du bouton contenant le lien mentant à cette page, pour que l'utilisateur visualise bien sur quel bouton il a appuyé et / ou sur quelle page il se trouve */}
          {/* Page d'accueil */}
          <NavLink to="/" exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />

          {/* Tendances */}
          <NavLink to="/trending" exact activeClassName="active-left-nav">
            <img src="./img/icons/rocket.svg" alt="trending" />
          </NavLink>
          <br />

          {/* Page de profil */}
          <NavLink to="/profil" exact activeClassName="active-left-nav">
            <img src="./img/icons/user.svg" alt="profile" />
          </NavLink>
          <br />
        </div>
      </div>
    </div>
  )
}

export default LeftNav
