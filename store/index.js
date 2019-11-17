import {createStore} from 'redux'

//action constants
const ADD_CAPTURE = 'ADD_CAPTURE'
const CLEAR_CAPTURES = 'CLEAR_CAPTURES'
const GET_GUESTBOOK = 'GET_GUESTBOOK'
const SET_CLIENT = 'SET_CLIENT'

//action creators
export const addCapture = capture => ({
  type: ADD_CAPTURE,
  capture
})

const clearCaptures = () => ({
  type: CLEAR_CAPTURES
})

export const getGuestbook = entries => ({
  type: GET_GUESTBOOK,
  entries
})

export const setClient = client => ({
  type: SET_CLIENT,
  client
})

//thunks(?)

//initial state
const initialState = {
  captures: [],
  guestbook: [],
  client: undefined
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAPTURE:
      return {...state, captures: [...state.captures, action.capture]}
    case CLEAR_CAPTURES:
      return {...state, captures: []}
    case GET_GUESTBOOK:
      return {...state, guestbook: action.entries}
    case SET_CLIENT:
      return {...state, client: action.client}
    default:
      return state
  }
}

//create store
const store = createStore(reducer)

//export it
export default store
