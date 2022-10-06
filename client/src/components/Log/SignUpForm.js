import React, { useState } from 'react'
import axios from 'axios'
import SignInForm from './SingInForm'

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [controlPassword, setControlPassword] = useState('')

  // Prise en compte de l'inscription de l'utilisateur.
  const handleRegister = async (e) => {
    e.preventDefault()

    // On récupère l'ID de la checkbox de l'acceptation des CGU.
    const terms = document.getElementById('terms')
    const pseudoError = document.querySelector('.pseudo.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    )
    const termsError = document.querySelector('.terms.error')

    // À chaque fois que l'on relance le formulaire, il faut supprimer le texte injecté via la propriété "innerHTML".
    passwordConfirmError.innerHTML = ''
    termsError.innerHTML = ''

    // Si les mots de passe ne correspondent pas ou si la case des CGU n'est pas cochée, on affiche le message d'erreur correspondant, les deux en même temps si les deux conditions ne sont pas valides.
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          'Les mots de passe ne correspondent pas'

      if (!terms.checked)
        termsError.innerHTML =
          "Veuillez valider les conditions générales d'utilisation"

      // Sinon, si aucune erreur n'a été détectée, on traite les données du formulaire envoyées au serveur.
    } else {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/register`,

        // On passe les données requises de notre API à cette dernière.
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res)

          // Si une ou des erreurs sont détectées, seule la chaîne de caractères d'erreur de la donnée erronée est affichée.
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password

            // Si aucune erreur n'est détectée, on passe l'état "setFormSubmit" sur "true" pour afficher la page d'inscription à l'utilisateur.
          } else {
            setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  /* "onSubmit" : On exécute la fonction "handleRegister" lors de la soumission du formulaire d'inscription */
  // La balise vide est un fragment. Le placement d'un fragment est important lorsqu'on renvoie un component.
  return (
    <>
      {/* Si l'état "formSubmit" est vrai, alors on renvoie le formulaire de connexion à l'utilisateur pour qu'il se connecte, sachant qu'il vient de créer son compte, sinon on lui envoie le formulaire d'inscription. Ne pas oublier de mettre un fragment, car lorsque l'on fait une condition ternaire, il faut toujours qu'il y ait un élément supérieur aux autres. */}
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>

          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          {/* Pseudo */}
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />

          {/* Mail */}
          <label htmlFor="email">Courriel</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />

          {/* Mot de passe */}
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

          {/* Contrôle du mot de passe */}
          <label htmlFor="password-conf">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="password-confirm"
            id="password-confirm"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />

          {/* Conditions générales d'utilisation */}
          {/* "noopener noreferrer" : Pour des questions de sécurité et de performances, il faut les ajouter
           * "noopener" : un attribut pour mieux sécuriser les liens réalisés en target=blank
           * "noreferrer" : un attribut complémentaire au premier UNIQUEMENT pour Mozilla Firefox mais aussi et SURTOUT un attribut qui empêche tout site externe maillé d’obtenir l’origine du trafic (le referrer).
           */}
          <input type="checkbox" id="terms" />
          <label htmlFor="Terms">
            J'accepte les
            <a href="/" target="blank" rel="noopener noreferrer">
              {' '}
              conditions générales d'utilisation
            </a>
          </label>
          <div className="terms error"></div>
          <br />

          {/* Bouton de validation de l'inscription */}
          <input type="submit" value="Valider l'inscription" />
        </form>
      )}
    </>
  )
}

export default SignUpForm
