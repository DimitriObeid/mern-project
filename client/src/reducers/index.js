// Ce fichier sert en tant que regroupement de nos reducers.

import { combineReducers } from 'redux'
import userReducer from './user.reducer'

export default combineReducers({
  userReducer,
})
