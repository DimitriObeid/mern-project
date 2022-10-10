import {
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from '../actions/post.actions'

const initialState = {}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload

    case LIKE_POST:
      return state.map((post) => {
        // On repère le bon post dont le bouton j'aime est à aimer.
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          }
        }
        // Si on ne lui retourne rien en dehors de la condition, le store nous renvoie des données nulles. On lui demande donc juste de nous renvoyer ce qu'il a déjà traité
        return post
      })

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          // Si l'ID de la personne qui n'aime plus le post.
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          }
        }

        return post
      })

    case UPDATE_POST:
      return state.map((post) => {
        if ((post.id = action.payload.postId)) {
          return {
            ...post,
            message: action.payload.message,
          }
        } else return post
      })

    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId)

    default:
      return state
  }
}
