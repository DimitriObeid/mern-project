import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import { ButtonSwitchTheme } from './ButtonSwitchTheme'
import Logout from './Log/Logout'

const Navbar = () => {
  // On récupère l'UID (situé au plus haut niveau de notre application) pour personnaliser le texte de droite de la barre de navigation.
  const uid = useContext(UidContext)

  // On récupère le nom de l'utilisateur enregistré dans le store, et on l'enregistre dans la variable "userData", tout en utilisant le hook "useSelector()".
  // En lui disant "(state) => state.userReducer", notre component sait qu'il doit aller dans notre reducer "userReducer" pour chercher les données de notre utilisateur.
  const userData = useSelector((state) => state.userReducer)

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          {/* Cliquer sur le logo nouq amènera sur la page d'accueil */}
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>Raccoont</h3>
            </div>
          </NavLink>
        </div>
        <ButtonSwitchTheme />
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              {/* Si l'utilisateur clique sur le texte de bienvenue, il est redirigé vers la page de son profil */}
              <NavLink exact to="/profil">
                <h5>Bienvenue {userData.pseudo}</h5>
              </NavLink>
            </li>

            {/* On appelle notre component "Logout" pour déconnecter l'utilisateur s'il clique sur ce bouton. */}
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
