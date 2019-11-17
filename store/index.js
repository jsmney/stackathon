import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {AnonymousCredential} from 'mongodb-stitch-react-native-sdk'

//action constants
const ADD_CAPTURE = 'ADD_CAPTURE'
const SET_CLIENT = 'SET_CLIENT'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const ADD_GUESTBOOK_ENTRY = 'ADD_GUESTBOOK_ENTRY'
const REMOVE_GUESTBOOK_ENTRY = 'REMOVE_GUESTBOOK_ENTRY'

//action creators
export const addCapture = capture => ({
  type: ADD_CAPTURE,
  capture
})

export const setClient = client => ({
  type: SET_CLIENT,
  client
})

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const addGuestbookEntry = entry => ({
  type: ADD_GUESTBOOK_ENTRY,
  entry
})

export const removeGuestbookEntry = entryId => ({
  type: REMOVE_GUESTBOOK_ENTRY,
  entryId
})

// //thunks(?)
export const authClient = client => dispatch => {
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(user => {
      console.log(`Successfully logged in as user ${user.id}`)
      dispatch(setCurrentUser(user.id))
      dispatch(setCurrentUser(client.auth.user.id))
    })
    .catch(err => {
      console.log(`Failed to log in anonymously: ${err}`)
      dispatch(setCurrentUser(undefined))
    })
}

//initial state
const initialState = {
  captures: [],
  currentUserId: undefined,
  client: undefined,
  entries: []
}

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAPTURE:
      return {...state, captures: [...state.captures, action.capture]}
    case SET_CLIENT:
      return {...state, client: action.client}
    case SET_CURRENT_USER:
      return {...state, currentUserId: action.user}
    case ADD_GUESTBOOK_ENTRY:
      return {...state, entries: [...state.entries, action.entry]}
    case REMOVE_GUESTBOOK_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.entryId)
      }
    default:
      return state
  }
}

//create store
const store = createStore(reducer, applyMiddleware(thunk))

//export it
export default store
