import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import {firebaseConfig} from './keys'

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
export default db

export function checkGoogleLogin() {
  firebase
    .auth()
    .getRedirectResult()
    .then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // ...
        // console.log('redirect result credential token', token);
      }
      // The signed-in user info.
      var user = result.user
      // console.log('redirect user', result.user);

      // console.log('firebase auth', firebase.auth());
      const logInUser = firebase.auth().currentUser
      if (!logInUser) {
        console.log('login status false', logInUser)
      } else console.log('login true', logInUser)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
      // ...
      console.error(error, errorCode, errorMessage, email, credential)
    })
}

export function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().signInWithRedirect(provider)
  // firebase
  //   .auth()
  //   .signInWithPopup(provider)
  //   .then(result => {
  //     const user = result.user;
  //     const token = result.credential.accessToken;
  //     // document.write(`Hello ${user.displayName}`);
  //     console.log('signin', user);
  //     return [user.displayName, token];
  //   })
  //   .catch(error => {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     console.error(error, errorCode, errorMessage, email, credential);
  // });
}

export function logOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      // reduxLogout();
      console.log('signed out')
    })
    .catch(function(error) {
      // An error happened.
      console.error(error)
    })
}

// export const loginStatus = () => {
//   const user = firebase.auth().currentUser;
//   if (!user) {
//     console.log('loginstatus false', user);
//     return false;
//   }
//   console.log('login true', user);
//   return true;
// };

export const addPhoto = async (id, url, user) => {
  db.collection('photos')
    .doc(id)
    .set({url: url, userId: user})
}

export const getPhotos = async () => {
  const result = []
  db.collection('photos')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
        result.push(doc.data())
      })
    })
    .catch(err => {
      console.log('Error getting documents', err)
    })
  console.log(result)
  return result
}
