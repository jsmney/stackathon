import {StyleSheet, Dimensions} from 'react-native'

const {width: winWidth, height: winHeight} = Dimensions.get('window')

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF'
  },
  gallery: {
    flex: 1,
    backgroundColor: 'goldenrod'
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
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
    alignContent: 'center'
    // alignItems: 'center'
  },
  buttonContain: {
    margin: 20,
    backgroundColor: 'steelblue',
    borderRadius: 25,
    fontSize: 25,
    padding: 10,
    width: '80%',
    color: 'white'
  },
  button: {
    margin: 20
  }
})
