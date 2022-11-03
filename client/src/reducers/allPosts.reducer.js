// Store contenant TOUS les posts pour les afficher dans la section "trending"

import { GET_ALL_POSTS } from '../actions/post.actions'

const initialState = {}

export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload

    default:
      return state
  }
}
