import axios from 'axios'

// Ici, c'est une table des matières, où toutes nos actions qui sont regroupées.

// Quand on appelera "GET_USER" au niveau du reducer, il y  aura une logique à mettre.
export const GET_USER = 'GET_USER'

// Paramètre : l'user ID de notre utilisateur.
export const getUser = (uid) => {
  // Le dispatch est la donnée qui sera envoyée au reducer pour qu'il la mette dans le store.
  return (dispatch) => {
    // On veut récupérer les infos de notre utilisateur.
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        // Ici, on evoie des infos au reducer.
        dispatch({
          type: GET_USER,
          // Toute la data recherchée dans la base données est passée au reducer via le payload.
          payload: res.data,
        })
      })
      .catch((err) => console.log(err))
  }
}
