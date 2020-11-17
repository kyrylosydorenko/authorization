import axios from 'axios'

const GET_UESRS = 'GET_UESRS'

const initialState = {
  online: [],
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_UESRS:
      return {
        ...state,
        users: action.data
      }
    default:
      return state
  }
}

export function getUsers() {
  return async (dispatch) => {
    axios({
      method: 'get',
      url: '/api/stat/users'
    })
      .then(({ data }) => {
        dispatch({
          type: GET_UESRS,
          data
        })
      })
      .catch((error) => {
        console.log('GET_UESRS catch error', error)
      })
  }
}
