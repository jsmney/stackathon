import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Link} from 'react-router-native'

import styles from '../styles'

const Main = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'powderblue',
          alignItems: 'center'
        }}
      >
        <Text style={styles.header}>Welcome</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'skyblue', alignItems: 'center'}}>
        <Link to="/camera">
          <Text style={styles.header}>Camera</Text>
        </Link>
      </View>
      <View
        style={{flex: 1, backgroundColor: 'steelblue', alignItems: 'center'}}
      >
        <Link to="/Photo">
          <Text style={styles.header}>Photo</Text>
        </Link>
      </View>
      <View
        style={{flex: 1, backgroundColor: 'slateblue', alignItems: 'center'}}
      >
        <Link to="/">
          <Text style={styles.header}>Home (here!)</Text>
        </Link>
      </View>
    </View>
  )
}
export default Main
