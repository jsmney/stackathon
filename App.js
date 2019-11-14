import React from 'react'
import {NativeRouter, Route} from 'react-router-native'
import {Provider} from 'react-redux'
import {Main, CameraWindow, Photo} from './Components'
import store from './store'

export default function App() {
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
