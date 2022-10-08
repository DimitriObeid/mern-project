import axios from 'axios'

// Ici, c'est une table des matières, où toutes nos actions sont regroupées.

// Quand on appelera "GET_USER" au niveau du reducer, il y  aura une logique à mettre.
export const GET_USER = 'GET_USER'

export const UPLOAD_PICTURE = 'UPLOAD_PICTURE'

export const UPDATE_BIO = 'UPDATE_BIO'

export const FOLLOW_USER = 'FOLLOW_USER'

export const UNFOLLOW_USER = 'UNFOLLOW_USER'

// Paramètre : l'user ID de notre utilisateur.
export const getUser = (uid) => {
  // Le dispatch est la donnée qui sera envoyée au reducer pour qu'il la mette dans le store. Avant d'envoyer les choses au reducer, on envoie les données à la BDD.
  return (dispatch) => {
    // On veut récupérer les infos de notre utilisateur.
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        // Ici, on evoie des infos au reducer.
        dispatch({
          type: GET_USER,
          // Toute la data recherchée dans la base données est passée au reducer via le payload, qui va envoyer ces données au store.
          payload: res.data,
        })
      })
      .catch((err) => console.log(err))
  }
}

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    // On envoie à notre back toutes ces infos, il va créer un nouveau nom d'image.
    return (
      axios
        // On envoie d'abord ces infos à la BDD (on crée un nom de fichier, on stocke l'image dans le dossier "public/uploads/profil")
        .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
        .then((res) => {
          // On effectue une requête GET pour chercher les informations de l'image, car on ne connaît ni le nom de la sauvegarde, ni le chemin. On demande à la BDD de nous fournir ce qu'elle a enregistré.
          return (
            axios
              // Ici, après avoir envoyé les infos à la BDD, on passe le chemin de l'image...
              .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
              .then((res) => {
                // Puis on récupère le chemin de cette image pour l'enregistrer dans le store, pour que l'utilisateur sache que son image de profil a été actualisée.
                dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
              })
              .catch((err) => console.log(err))
          )
        })
        .catch((err) => console.log(err))
    )
  }
}

// Action -> Élément qui va envoyer les infos à la BDD sans rien lui demander en retour,
// Reducer -> montre visuellement à l'utilisateur cd qui a évolué dans le store.
// userId : Pour identiifer l'utilisateur dans la requête.
export const updateBio = (userId, bio) => {
  return (dispatch) => {
    // Cette façon de transférer les données à la BDD marche aussi.
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio })
      })
      .catch((err) => console.log(err))
  }
}

// Paramètres : ID d'utilisateur, ID de la personne à suivre.
export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({
          type: FOLLOW_USER,
          payload: { idToFollow },
        })
      })
      .catch((err) => console.log(err))
  }
}

// Paramètres : ID d'utilisateur, ID de la personne à ne plus suivre.
export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({
          type: UNFOLLOW_USER,
          payload: { idToUnfollow },
        })
      })
      .catch((err) => console.log(err))
  }
}
