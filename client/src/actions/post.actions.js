import axios from 'axios'

// Posts
export const GET_POSTS = 'GET_POSTS'

export const LIKE_POST = 'LIKE_POST'

export const UNLIKE_POST = 'UNLIKE_POST'

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data })
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
