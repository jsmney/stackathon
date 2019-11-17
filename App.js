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
