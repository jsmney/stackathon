import React, {useState, useEffect} from 'react'
import {AppLoading} from 'expo'
import {Container, Text} from 'native-base'
import * as Font from 'expo-font'
import {Ionicons} from '@expo/vector-icons'
import {NativeRouter, Route} from 'react-router-native'
import {Provider} from 'react-redux'
import {Root} from 'native-base'
import {Main, CameraWindow, Photo, About} from './Components'
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
    <Root>
      <Provider store={store}>
        <NativeRouter>
          <Route path="/camera" component={CameraWindow} />
          <Route path="/photo" component={Photo} />
          <Route path="/About" component={About} />
          <Route exact path="/" component={Main} />
        </NativeRouter>
      </Provider>
    </Root>
  )
}

export default App
