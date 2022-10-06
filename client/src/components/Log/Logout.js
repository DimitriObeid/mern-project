import React from 'react'
import axios from 'axios'

// Quand l'utilisateur se déconnecte, il faut également supprimer le cookie qu'il reçoit, en plus de celui stocké sur le serveur, sinon la déconnexion ne réussit qu'une fois sur deux. Pour cela, on utilise la librairie "js-cookie"
import cookie from 'js-cookie'

const Logout = () => {
  // La clé à passer en paramètre est la clé du cookie à retirer.
  // Cette fonction est exécutée en front.
  const removeCookie = (key) => {
    // S'il se passe quulque chose sur la fenêtre.
    if (window !== 'undefined') {
      // Arguments : clé du cookie, expiration.
      cookie.remove(key, { expires: 1 })
    }
  }

  // Cette fonction est exécutée en back, sauf la fonction "removeCookie()" que nous avons créé.
  const logout = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err))

    // Une fois l'utilisateur déconnecté, on le renvoie à la page d'accueil.
    window.location = '/'
  }

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  )
}

export default Logout
