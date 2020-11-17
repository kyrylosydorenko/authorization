import axios from 'axios'
import Cookies from 'universal-cookie'

const LOGIN_USER = 'LOGIN_USER'
const VALIDATE_USER = 'VALIDATE_USER'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const UPDATE_ERROR = 'UPDATE_ERROR'
const CLEAR_ERROR_MESSAGE = 'CLEAR_ERROR_MESSAGE'
const LOG_OUT = 'LOG_OUT'

const cookies = new Cookies()

const initialState = {
  user: null,
  token: cookies.get('token') || null,
  message: null,
  error: null
}

const clearAuthCookie = () => cookies.remove('token')

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.data.token,
        user: action.data.user,
        message: action.data.message || null
      }
    case LOG_OUT:
      return {
        ...initialState
      }
    case VALIDATE_USER:
      return {
        ...state,
        user: action.data.user || null
      }
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.data || null
      }
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.data || null
      }
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
        message: null
      }
    default:
      return state
  }
}

export function signIn(user) {
  return async (dispatch) => {
    axios({
      method: 'post',
      url: '/api/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ ...user })
    })
      .then(({ data }) => {
        dispatch({
          type: LOGIN_USER,
          data
        })
      })
      .catch((error) => {
        console.log('LOGIN_USER catch error', error)
        dispatch({
          type: UPDATE_ERROR,
          data: error.response.data.error
        })
      })
  }
}

export function validateUser() {
  return async (dispatch) => {
    axios({
      method: 'get',
      url: '/api/auth/validate'
    })
      .then(({ data }) => {
        dispatch({
          type: VALIDATE_USER,
          data
        })
      })
      .catch((error) => {
        console.log('VALIDATE_USER catch error', error)
      })
  }
}

export function register(user) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/api/auth/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(user)
    })
      .then(({ data }) => {
        if (data.error) {
          throw new Error(data.error)
        }
        dispatch({
          type: UPDATE_MESSAGE,
          data: data.message
        })
        setTimeout(() => {
          dispatch({
            type: LOGIN_USER,
            data
          })
        }, 3000)
      })
      .catch((error) => {
        console.error('REGISTER error', error)
        dispatch({
          type: UPDATE_ERROR,
          data: error.response.data.error
        })
      })
  }
}

export function clearAuthErrorAndMessage() {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR_MESSAGE })
  }
}

export function LogOut() {
  clearAuthCookie()
  return (dispatch) => {
    dispatch({ type: LOG_OUT })
  }
}
