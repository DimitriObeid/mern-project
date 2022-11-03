const UserModel = require('../models/user.model')

// Paquet nécessaire à la création de tokens d'authentification.
const jwt = require('jsonwebtoken')

const { signUpErrors, signInErrors } = require('../utils/errors.utils')

// On définit une durée de vie en millisecondes pour le token d'authentification.
const maxAge = 3 * 24 * 60 * 60 * 1000

// On crée une fonction qui crée le token d'authentification, et qui prend l'ID utilisateur en paramètre.
const createToken = (id) => {
  // On passe notre identifiant utilisateur en paramètre de la méthode "jwt.sign()", puis le token stocké ici dans une variable d'environnement.
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    // Le token expire dans le nombre de secondes enregistré dans la variable maxAge.
    expiresIn: maxAge,
  })
}

// Fonction asynchrone de création d'un utilisateur.
module.exports.signUp = async (req, res) => {
  // Le corps de la requête doit contenir le pseudo, le courriel et le MDP du nouvel utilisateur.
  const { pseudo, email, password } = req.body

  try {
    // Avec l'opérateur "await", on attent la résolution d'une promesse pour obtenir sa valeur de retour.
    const user = await UserModel.create({ pseudo, email, password })
    res.status(201).json({ user: user._id })

    // Si la requête a échoué.
  } catch (err) {
    const errors = signUpErrors(err)
    res.status(200).send({ errors })
  }
}

// Fonction asynchrone de connexion d'un utilisateur.
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // On attend que l'utilisateur passe son adresse mail et son mot de passe.
    const user = await UserModel.login(email, password)

    // On crée un token d'authentification pour l'utilisateur fraîchement connecté, en appelant notre fonction "createToken".
    const token = createToken(user._id)

    // On crée un cookie ('nom du cookie', le token tel qu'il est, les caractériqtiques de la mise en place du token).
    // "httpOnly: true" : paramètre de sécurité qui fait que le token ne sera consultable QUE par notre serveur.
    res.cookie('jwt', token, { httpOnly: true, maxAge })

    // L'utilisateur étant bien connecté, on renvoie un code HTTP 200 (réussite d'une requête)
    res.status(200).json({ user: user._id })
  } catch (err) {
    // On appelle la fonction de gestion d'erreurs de connexion, définie dans le fichier '../utils/errors.utils'.
    const errors = signInErrors(err)
    res.status(200).json({ errors })
  }
}

// Fonction de déconnexion d'un utilisateur.
module.exports.logout = (req, res) => {
  // On supprime le cookie...
  res.cookie('jwt', '', { maxAge: 1 })

  // ... puis on redirige l'utilisateur vers la page d'accueil du site.
  res.redirect('/')
}
