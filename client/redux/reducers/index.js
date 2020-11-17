import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import users from './users'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    users
  })

export default createRootReducer
