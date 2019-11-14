import {createStore} from 'redux'

//action constants
const ADD_CAPTURE = 'ADD_CAPTURE'
const CLEAR_CAPTURES = 'CLEAR_CAPTURES'

//action creators
export const addCapture = capture => ({
  type: ADD_CAPTURE,
  capture
})

const clearCaptures = () => ({
  type: CLEAR_CAPTURES
})

//thunks(?)

//initial state
const initialState = {
  captures: []
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAPTURE:
      console.log('ADD CAP', state.captures)
      return {...state, captures: [...state.captures, action.capture]}
    case CLEAR_CAPTURES:
      return {...state, captures: []}
    default:
      return state
  }
}

//create store
const store = createStore(reducer)

//export it
export default store
