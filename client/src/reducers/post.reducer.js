import {
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
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
        if ((post._id = action.payload.postId)) {
          return {
            ...post,
            message: action.payload.message,
          }
        } else return post
      })

    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId)

    case EDIT_COMMENT:
      return state.map((post) => {
        // On fait d'abord une recherche pour trouver le post où le commentaire a été écrit.
        if (post._id === action.payload.postId) {
          return {
            // On évite d'écraser tous les autres posts.
            ...post,
            comments: post.comments.map((comment) => {
              // On effectue une recherche supplémentaire pour trouver le commentaire à éditer.
              if (comment._id === action.payload.commentId) {
                return {
                  // On évite d'écraser tous les autres commentaires.
                  ...comment,
                  text: action.payload.text,
                }
              }
              // Sinon, si le commentaire ne correspond pas à celui que l'on souhaite éditer, on retourne tout de même le commentaire.
              else {
                return comment
              }
            }),
          }
        }
        // Sinon, si le post ne correspond pas, on retourne tout de même le post.
        else {
          return post
        }
      })

    case DELETE_COMMENT:
      // On mappe le poste.
      return state.map((post) => {
        // On identifie le post dans lequel se situe le commentaire à supprimer.
        if (post._id === action.payload.postId) {
          return {
            ...post,
            // Dans le filtre, on garde tous les commentaires qui ne correspondent pas à l'ID du commentaire à supprimer.
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          }
        } else return post
      })

    default:
      return state
  }
}
