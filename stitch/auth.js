import {AnonymousCredential} from 'mongodb-stitch-browser-sdk'
import {app} from './index.js'

export function loginAnonymous() {
  // TODO: Allow users to log in anonymously
  const credential = new AnonymousCredential()
  return app.auth.loginWithCredential(credential)
}

export function hasLoggedInUser() {
  // TODO: Check if there is currently a logged in user
  return app.auth.isLoggedIn
}

export function getCurrentUser() {
  // TODO: Return the user object of the currently logged in user
  return app.auth.isLoggedIn ? app.auth.user : null
}

export function logoutCurrentUser() {
  // TODO: Logout the currently logged in user
  const user = getCurrentUser()
  if (user) {
    return app.auth.logoutUserWithId(user.id)
  }
}
