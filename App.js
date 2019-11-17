import React, {useState, useEffect} from 'react'
import {AppLoading, Asset, Icon} from 'expo'
import {Container, Text} from 'native-base'
import * as Font from 'expo-font'
import {Ionicons} from '@expo/vector-icons'
import {NativeRouter, Route} from 'react-router-native'
import {Provider} from 'react-redux'
import {Root} from 'native-base'
import {Main, CameraWindow, Photo, About} from './Components'
import store, {setClient, authClient} from './store'

import {Platform, StatusBar, StyleSheet, View} from 'react-native'
import {Stitch, AnonymousCredential} from 'mongodb-stitch-react-native-sdk'

const App = () => {
  const [client, setClient] = useState(null)
  const [currentUserId, setCurrentUserId] = useState(undefined)

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
  }

  const _loadClient = async () => {
    // Stitch.initializeDefaultAppClient('fsa-stackathon-ajmxk')
    const app = Stitch.hasAppClient('fsa-stackathon-ajmxk')
      ? await Stitch.getAppClient('fsa-stackathon-ajmxk')
      : Stitch.initializeAppClient('fsa-stackathon-ajmxk').then(client => {
          setClient(client)
          client.auth
            .loginWithCredential(new AnonymousCredential())
            .then(user => {
              console.log(`Successfully logged in as user ${user.id}`)
              setCurrentUserId(user.id)
              setCurrentUserId(client.auth.user.id)
            })
            .catch(err => {
              console.log(`Failed to log in anonymously: ${err}`)
              setCurrentUserId(undefined)
            })
        })
  }

  useEffect(() => {
    loadFonts()
    _loadClient()
  }, [])

  return (
    <Provider store={store}>
      <Root>
        <NativeRouter>
          <Route path="/camera" component={CameraWindow} />
          <Route path="/photo" component={Photo} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Main} />
        </NativeRouter>
      </Root>
    </Provider>
  )
}

export default App
