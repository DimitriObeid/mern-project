import axios from 'axios'

// Posts
export const GET_POSTS = 'GET_POSTS'

// On met 'ADD_POST' le plus haut possible, car c'est une requête importante.
export const ADD_POST = 'ADD_POST'

export const LIKE_POST = 'LIKE_POST'

export const UNLIKE_POST = 'UNLIKE_POST'

export const UPDATE_POST = 'UPDATE_POST'

export const DELETE_POST = 'DELETE_POST'

// Erreurs
export const GET_POST_ERRORS = 'GET_POST_ERRORS'

// Commentaires
export const ADD_COMMENT = 'ADD_COMMENT'

export const EDIT_COMMENT = 'EDIT_COMMENT'

export const DELETE_COMMENT = 'DELETE_COMMENT'

// CRUD posts.

// Param : num (nombre de posts à charger (infinite scroll)).
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

// On envoie nos données, puis on réinterroge notre BDD pour mettre à jour le store. Normalement, on ne fait pas ça dans Redux, mais vu qu'on ne connaît pas les ID spéciaux, c'est comme ça qu'il faut faire.
// Params : DataForm.
export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors })
        } else {
          // On envoie un payload vide pour supprimer le message d'erreur.
          dispatch({ type: GET_POST_ERRORS, payload: '' })
        }
      })
  }
}

// Params : ID du post, ID de la personne qui l'aime.
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

// Params : ID du post, l'ID de la personne qui ne l'aime plus.
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

// Params : ID du post à éditer, message à mettre à jour.
export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } })
      })
      .catch((err) => console.log(err))
  }
}

// Param : ID du post à supprimer.
export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } })
      })
      .catch((err) => console.log(err))
  }
}

// CRUD commentaires

// Params : ID du post cible, ID de son auteur, corps de texte, pseudo du commentateur.
export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      // On ne passe pas le paramètre "postId" ici, car on le passe déjà précédemment (en faisant "req.params" en back).
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        // On ne passe que le "postId" en payload, C-À-D dans le store, car on aura besoin d'infos que seule MongoDB a.
        // MongoDB crée un ID unique pour le commentaire, et comme on a besoin de lui pour faire notre map, l'éditer, etc... On ne peut donc pas mettre à jour le store si on n'a pas cet ID.
        // Notre action va se résumer à relancer la fonction "getPosts()", comme ça on aura l'ID du commentaire qui sera mis à jour. Pour cela, il faut refaire un appel au serveur, sinon on ne pourra pas travailler avec les ID.
        dispatch({ type: ADD_COMMENT, payload: { postId } })
      })
      .catch((err) => console.log(err))
  }
}

// Params : ID du post cible, ID du commentaire, corps de texte.
export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
      // On ne passe pas le paramètre "postId" ici, car on le passe déjà précédemment (en faisant "req.params" en back).
      data: { commentId, text },
    })
      .then((res) => {
        // On ne passe que le "postId" en payload, C-À-D dans le store, car on aura besoin d'infos que seule MongoDB a.
        // MongoDB crée un ID unique pour le commentaire, et comme on a besoin de lui pour faire notre map, l'éditer, etc... On ne peut donc pas mettre à jour le store si on n'a pas cet ID.
        // Notre action va se résumer à relancer la fonction "getPosts()", comme ça on aura l'ID du commentaire qui sera mis à jour. Pour cela, il faut refaire un appel au serveur, sinon on ne pourra pas travailler avec les ID.
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } })
      })
      .catch((err) => console.log(err))
  }
}

// Params : ID du post cible, ID du commentaire.
export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      // On n'effectue pas de requête DELETE à l'intérieur d'un tableau, mais bien une requête PATCH !
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      // On ne passe pas le paramètre "postId" ici, car on le passe déjà précédemment (en faisant "req.params" en back).
      data: { commentId },
    })
      .then((res) => {
        // On ne passe que le "postId" en payload, C-À-D dans le store, car on aura besoin d'infos que seule MongoDB a.
        // MongoDB crée un ID unique pour le commentaire, et comme on a besoin de lui pour faire notre map, l'éditer, etc... On ne peut donc pas mettre à jour le store si on n'a pas cet ID.
        // Notre action va se résumer à relancer la fonction "getPosts()", comme ça on aura l'ID du commentaire qui sera mis à jour. Pour cela, il faut refaire un appel au serveur, sinon on ne pourra pas travailler avec les ID.
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } })
      })
      .catch((err) => console.log(err))
  }
}
