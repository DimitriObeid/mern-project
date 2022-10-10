import axios from 'axios'

// Posts
export const GET_POSTS = 'GET_POSTS'

export const LIKE_POST = 'LIKE_POST'

export const UNLIKE_POST = 'UNLIKE_POST'

// "num" : nombre de posts à charger (infinite scroll).
export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        // En passant '0' en premier argument de la méthode "slice()", cette dernière commence à lire le contenu du postReducer, et coupe le reste après l'index n°4 du tableau.
        const array = res.data.slice(0, num)
        dispatch({ type: GET_POSTS, payload: array })
      })
      .catch((err) => console.log(err))
  }
}

// Paramètres : l'ID du post, l'ID de la personne qui l'aime.
export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      // Données envoyées en back via une requête.
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } })
      })
      .catch((err) => console.log(err))
  }
}

// Paramètres : l'ID du post, l'ID de la personne qui ne l'aime plus.
export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      // Données envoyées en back via une requête.
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } })
      })
      .catch((err) => console.log(err))
  }
}

// Commentaires
