// Ce fichier sert en tant que regroupement de nos reducers.

import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import usersReducer from './users.reducer'

export default combineReducers({
  userReducer,
  usersReducer,
})
