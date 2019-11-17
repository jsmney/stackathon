import {StyleSheet, Dimensions} from 'react-native'

const {width: winWidth, height: winHeight} = Dimensions.get('window')

export default StyleSheet.create({
  gallery: {
    flex: 1
  },

  headerContainer: {
    height: 150,
    backgroundColor: 'lightblue'
  },

  header: {
    fontSize: 35,
    padding: 40,
    fontFamily: 'Helvetica Neue',
    fontWeight: '200',
    letterSpacing: 8,
    margin: 10
  },

  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'lightblue'
    // alignItems: 'center'
  },

  msg: {
    textAlign: 'center',
    alignContent: 'center',
    padding: 5
  },

  homeText: {
    padding: 22
  },

  input: {
    height: 400,
    width: 200,
    backgroundColor: 'pink',
    flex: 1,
    alignContent: 'space-around'
  }
})
