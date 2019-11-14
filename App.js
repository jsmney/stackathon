import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Link, Route, Switch } from 'react-router-native';
import { Main, Camera } from './Components';

export default function App() {
  return (
    <NativeRouter>
      <Route path="/camera" component={Camera} />
      <Route exact path="/" component={Main} />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
