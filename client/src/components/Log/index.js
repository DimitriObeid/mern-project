import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../Contexts/DarkModeContext'

import SignUpForm from './SignUpForm'
import SignInForm from './SingInForm'

// On importe les props en paramètre (Voir la vue "<Log signin={false} signup={true} />" dans le fichier "Profil.js").
const Log = (props) => {
  // Dans les versions les plus récentes de React Native, on utilise les hook (ici, on enregistre les variables de connexion et d'inscription dans un "UseState")
  // Les hooks ont été ajoutés dans React 16.8. Ils permettent d'utiliser l'état et d'autres fonctionnalités de React sans écrire de classe.

  /*
   * Qu'est-ce qu'un Hook ?
   * Un Hook est une fonction spéciale qui nous permet de nous "accrocher" aux fonctionnalités de React. Par exemple, "useState" est un Hook qui nous permet d'ajouter l'état React aux composants de la fonction.
   *
   * Quand utiliser un Hook ?
   * Si nous écrivons un composant de fonction et que nous réalisons que nous devons lui ajouter un état, nous devons auparavant le convertir en classe. Maintenant, nous pouvons utiliser un Hook à l'intérieur du composant de fonction existant.
   */

  // Modal d'inscription
  const [signUpModal, setSignUpModal] = useState(props.signup)

  // Modal de connexion
  const [signInModal, setSignInModal] = useState(props.signin)

  const theme = useContext(ThemeContext)

  const darkMode = theme.state.darkMode

  // e = événement / event.
  const handleModals = (e) => {
    // Si l'utilisateur clique sur le bouton d'inscription.
    if (e.target.id === 'register') {
      // Au niveau de nos modals.
      setSignInModal(false)
      setSignUpModal(true)

      // Sinon, si l'utilisateur clique sur le bouton de connexion.
    } else if (e.target.id === 'login') {
      setSignUpModal(false)
      setSignInModal(true)
    }
  }

  // Rendu visuel
  return (
    <div
      className={`connection-form ${
        darkMode ? 'connection-form-dark' : 'connection-form-light'
      }`}
    >
      <div className="form-container">
        <ul>
          {/* Dans la balise "li", on appelle notre fonction "handleModals" via l'attribut "onClick" */}
          {/* Dans l'attribut "className", on vérifie que le bouton d'inscription a été appuyé pour changer la couleur autour de lui, pour que l'utilisateur puisse mieux voir quel formulaire se trouve devant lui (avec cette condition ternaire, on vérifie en premier si c'est le cas) */}
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? 'active-btn' : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? 'active-btn' : null}
          >
            Se connecter
          </li>
        </ul>
        {/* On écrit une condition. Si l'état "SignupModal" est sur true, alors on affiche le formulaire d'inscription (client/src/Components/Log/SignUpForm) */}
        {signUpModal && <SignUpForm />}

        {/* Si, au contraire l'état "SignInModal" est sur "true", alors on affiche le formulaire de connexion (client/src/Components/Log/SignInForm) */}
        {signInModal && <SignInForm />}
      </div>
    </div>
  )
}

export default Log
