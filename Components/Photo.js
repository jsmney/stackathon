import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

//layout elements
import {Container, Header, Content, Button, Text} from 'native-base'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
  Modal,
  Alert,
  CameraRoll
} from 'react-native'

// possibly for saving canvas
// import {takeSnapshotAsync} from 'expo'
import ViewShot, {captureRef} from 'react-native-view-shot'

//link for router
import {Link} from 'react-router-native'

//image picker
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

//redux action to add photo
import {addCapture} from '../store'

//faceDetector
import * as FaceDetector from 'expo-face-detector'

//styles
import styles from '../styles'

// on click: modal zooms in on image. facedetector adds shit.
const Photo = props => {
  const dispatch = useDispatch()

  const captures = useSelector(state => state.captures)
  const [modalVisible, setModalVisible] = useState(false)
  const [face, setFace] = useState({
    leftEarPosition: {x: 0, y: 0},
    rightEarPosition: {x: 0, y: 0},
    leftEyePosition: {x: 0, y: 0},
    rightEyePosition: {x: 0, y: 0},
    leftCheekPosition: {x: 0, y: 0},
    rightCheekPosition: {x: 0, y: 0},
    bottomMouthPosition: {x: 0, y: 0},
    leftMouthPosition: {x: 0, y: 0},
    rightMouthPosition: {x: 0, y: 0},
    noseBasePosition: {x: 0, y: 0},
    bounds: {origin: {x: 0, y: 0}, size: {x: 0, y: 0}}
  })
  const [hasSaved, setHasSaved] = useState(false)
  const [activeImage, setActiveImage] = useState({
    uri: ''
  })

  //for saving image with stuff on it
  let canvas = null

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    // console.log(result)

    if (!result.cancelled) {
      dispatch(addCapture(result))
    }
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  //onload
  useEffect(() => {
    getPermissionAsync()
  }, [])

  const detectFaces = async imageUri => {
    const options = {
      mode: FaceDetector.Constants.Mode.fast,
      detectLandmarks: FaceDetector.Constants.Landmarks.all
    }
    const detected = await FaceDetector.detectFacesAsync(imageUri, options)
    // console.log('detected faces', detected.faces.length, detected.faces[0])

    detected.faces.length && setFace(detected.faces[0])
    return detected
  }

  return (
    <ScrollView style={styles.gallery}>
      <Header style={styles.headerContainer}>
        <Text style={styles.header}>Photo</Text>
      </Header>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {captures &&
          captures.map(capture => {
            return (
              <TouchableOpacity
                key={capture.uri}
                onPress={() => {
                  setActiveImage(capture)
                  setModalVisible(true)
                  detectFaces(capture.uri)
                }}
              >
                <Image
                  style={{
                    borderRadius: 10,
                    height: 200,
                    width: 200,
                    margin: 10
                  }}
                  source={{uri: capture.uri}}
                />
              </TouchableOpacity>
            )
          })}
      </View>
      <Button title="Add an image from camera roll" onPress={_pickImage} />

      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={{marginTop: 22}}>
            <View
              ref={ref => {
                canvas = ref
              }}
            >
              <Image
                style={{
                  borderRadius: 10,
                  height: 550,
                  width: 400,
                  margin: 10,
                  alignSelf: 'center',
                  zIndex: -1
                }}
                source={{uri: activeImage.uri}}
              />
              <Image
                style={{
                  width: 60,
                  height: 60,
                  position: 'absolute',
                  top:
                    (face.noseBasePosition.y / activeImage.height) * 550 - 30,
                  left:
                    (face.noseBasePosition.x / activeImage.width) * 400 - 30,
                  transform: [{rotate: `${face.rollAngle}deg` || '0deg'}],
                  zIndex: 100
                }}
                source={require('../assets/nose.png')}
              />
              <Image
                style={{
                  width: 80,
                  height: 90,
                  position: 'absolute',
                  top:
                    (face.rightEyePosition.y / activeImage.height) * 550 - 50,
                  left:
                    (face.rightEyePosition.x / activeImage.width) * 400 - 20,
                  transform: [{rotate: `${face.rollAngle * -1}deg` || '0deg'}],
                  zIndex: 98
                }}
                source={require('../assets/righteyeb.png')}
              />
              <Image
                style={{
                  width: 80,
                  height: 90,
                  position: 'absolute',
                  top: (face.leftEyePosition.y / activeImage.height) * 550 - 50,
                  left: (face.leftEyePosition.x / activeImage.width) * 400 - 60,
                  transform: [{rotate: `-${face.rollAngle}deg` || '0deg'}],
                  zIndex: 90
                }}
                source={require('../assets/lefteyeb.png')}
              />
              <Image
                style={{
                  width: 120,
                  height: 60,
                  position: 'absolute',
                  top:
                    (face.bottomMouthPosition.y / activeImage.height) * 550 -
                    50,
                  left:
                    (face.bottomMouthPosition.x / activeImage.width) * 400 - 60,
                  transform: [{rotate: `-${face.rollAngle}deg` || '0deg'}],
                  zIndex: 99
                }}
                source={require('../assets/mouth.png')}
              />
              {/* <View
                style={{
                  borderRadius: 10,
                  width:
                    (face.bounds.size.width / activeImage.width) * 550 || 10,
                  height:
                    (face.bounds.size.height / activeImage.height) * 400 || 10,
                  position: 'absolute',
                  top: (face.bounds.origin.y / activeImage.height) * 550,
                  left: (face.bounds.origin.x / activeImage.width) * 400,
                  backgroundColor: 'white',
                  opacity: 0.4
                }}
              /> */}
            </View>
            <TouchableHighlight
              onPress={async () => {
                captureRef(canvas, {
                  format: 'jpg',
                  quality: 0.9
                }).then(
                  uri => CameraRoll.saveToCameraRoll(uri),
                  error => console.error('oops', error)
                )
                setHasSaved(true)
              }}
              style={styles.button}
            >
              <Text>Save Photo (modified) {hasSaved && 'success!'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={async () => {
                await CameraRoll.saveToCameraRoll(activeImage.uri)
                setHasSaved(true)
              }}
              style={styles.button}
            >
              <Text>Save Photo (original) {hasSaved && 'success!'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                setFace({
                  leftEarPosition: {x: 0, y: 0},
                  rightEarPosition: {x: 0, y: 0},
                  leftEyePosition: {x: 0, y: 0},
                  rightEyePosition: {x: 0, y: 0},
                  leftCheekPosition: {x: 0, y: 0},
                  rightCheekPosition: {x: 0, y: 0},
                  bottomMouthPosition: {x: 0, y: 0},
                  leftMouthPosition: {x: 0, y: 0},
                  rightMouthPosition: {x: 0, y: 0},
                  noseBasePosition: {x: 0, y: 0},
                  bounds: {origin: {x: 0, y: 0}, size: {x: 0, y: 0}}
                })
                setHasSaved(false)
                setModalVisible(!modalVisible)
              }}
              style={styles.button}
            >
              <Text>Close</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
      <Link to="/">
        <Text>Home</Text>
      </Link>
    </ScrollView>
  )
}

export default Photo
