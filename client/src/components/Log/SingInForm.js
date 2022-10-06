import React, { useState } from 'react'

// Axios est un module qui nous permet de faire des requêtes AJAX / des fetch à notre API, à notre base de données.
import axios from 'axios'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    // On empêche la page de se recharger, car c'est ce qu'il se passe par défaut lorsqu'un utilisateur soumet un formulaire.
    e.preventDefault()

    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')

    // La fonction "signIn" du fichier "auth.controller.js" traite les données envoyées par le front via axios.
    // ATTENTION : Les variables d'environnement de React Native doivent OBLIGATOIREMENT commencer par "REACT_APP_".
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,

      // On passe la valeur de notre variable constante "email" au champ "email:" du corps de notre requête
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res)
        // Si une erreur.est envoyée par le serveur en réponse à notre requête.
        if (res.data.errors) {
          // On injecte le message d'erreur écrit
          emailError.innerHTML = res.data.errors.email
          passwordError.innerHTML = res.data.errors.password

          // Sinon, si aucune erreur ne s'est produite, alors on redirige l'utilisateur vers la pague d'accueil du site.
        } else {
          window.location = '/'
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Courriel</label>
      <br />
      {/* onChange = Si l'input change, on récuèpre ce qui y est changé et on le stocke */}
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />

      {/* gGrâce au 'type="password"' dans la balise "input", la chaîne de caractères composant le mot de passe est remplacée par des points dans le rendu */}
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      {/* Quand on clique sur cet input, la fonction contenue dans l'attribut "obSubmit" de la balise parent est exécutée */}
      <input type="submit" value="Se connecter" />
    </form>
  )
}

export default SignInForm
