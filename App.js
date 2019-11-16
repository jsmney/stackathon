import React, {useState, useEffect} from 'react'
import {AppLoading} from 'expo'
import {Container, Text} from 'native-base'
import * as Font from 'expo-font'
import {Ionicons} from '@expo/vector-icons'
import {NativeRouter, Route} from 'react-router-native'
import {Provider} from 'react-redux'
import {Main, CameraWindow, Photo} from './Components'
import store from './store'

import * as firebase from 'firebase'

//listener on if logged in
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     console.log('auth state changed is logged in', user)
//     store.dispatch(
//       logIn({
//         name: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//         id: user.uid
//       })
//     )
//   } else {
//     // No user is signed in.
//     store.dispatch(logOut())
//   }
// })

const App = () => {
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
  }
  useEffect(() => {
    loadFonts()
  }, [])

  return (
    <Provider store={store}>
      <NativeRouter>
        <Route path="/camera" component={CameraWindow} />
        <Route path="/photo" component={Photo} />
        <Route exact path="/" component={Main} />
      </NativeRouter>
    </Provider>
  )
}

export default App
