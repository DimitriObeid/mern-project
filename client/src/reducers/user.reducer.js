// Ce fichier sert de reducer pour notre utilisateur connecté. On y stocke ses informations pour y avoir accès tout le temps.

import { GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from '../actions/user.actions'

// Dans ce state, on cherchera en premier lieu les données dans la BDD pour la stocker dans le store, pour ne plus jamais avoir à interagir avec la BDD
const initialState = {}

// On export une fonction que l'on appelle "userReducer()", qui sera appelée dans le fichier "index.js" du dossier "client/src".
// Cette fonction prend en paramètres le state et une action.

// Notre fonction aura un state que l'on fera évoluer en fonction de ce que nous écrirons à l'intérieur. On va reprende le state et on le fera évoluer.
export default function userReducer(state = initialState, action) {
  // Le type d'action sera le "GET_USER" que nous avons défini dans le fichier "actions/user.actions.js"
  switch (action.type) {
    case GET_USER:
      // En retournant la data envoyée par la BDD, on incrémente notre "initialState", qui est vide au début, avec ces données, qui seront donc accessibles par tous les components du site.
      return action.payload

    case UPLOAD_PICTURE:
      return {
        // Avec l'opérateur spread, on récupère les données de notre utilisateur sans les écraser, sinon il n'y aurait plus que l'image dans les données de l'utilisateur. En revanche, on va modifier la donnée stockée dans le champ "picture".
        ...state,
        picture: action.payload,
      }

    case UPDATE_BIO:
      return { ...state, bio: action.payload }

    // Par défaut, on retourne le state.
    default:
      return state
  }
}
