import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

//layout elements
import {
  Container,
  Header,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Icon
} from 'native-base'
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  CameraRoll
} from 'react-native'

import {addPhoto} from '../config/firebase'
// import ImagePickerRN from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

export const uploadImage = (uri, mime = 'application/octet-stream') => {
  return () => {
    return new Promise((resolve, reject) => {
      // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const uploadUri = uri.replace('file://', '')
      const sessionId = new Date().getTime()
      let uploadBlob = null
      //create ref in firebase storate for file
      const imageRef = firebase
        .storage()
        .ref('photos')
        .child(sessionId)
      //encode data with base64 prior to upload
      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, {type: `${mime};BASE64`})
        })
        //place blob into storage ref
        .then(blob => {
          uploadBlob = blob
          return imageRef.put(blob, {contentType: mime})
        })
        //then you can get download url of img
        //store as ref to in database
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then(url => {
          resolve(url)
          //this storeRef function is an optional helper
          //to refer to download url in database
          storeReference(url, sessionId)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const storeReference = (downloadUrl, sessionId) => {
  // let imageRef = firebase
  //   .storage()
  //   .ref('photos')
  //   .child(sessionId)
  // let currentUser = firebase.auth().currentUser
  let image = {
    type: 'image',
    url: downloadUrl,
    createdAt: sessionId
    //user: currentUser
  }
  firebase
    .database()
    .ref('photos')
    .push(image)
}

// for saving canvas
import {captureRef} from 'react-native-view-shot'

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

//photos fade in
import FadeInView from './FadeInView'

// on click: modal zooms in on image. facedetector adds shit.
const Photo = props => {
  const dispatch = useDispatch()

  const initFaceState = {
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
  }
  const captures = useSelector(state => state.captures)
  const [modalVisible, setModalVisible] = useState(false)
  const [face, setFace] = useState(initFaceState)
  const [hasSaved, setHasSaved] = useState(false)
  const [activeImage, setActiveImage] = useState({
    uri: ''
  })
  const [leftEye, setLeftEye] = useState(require('../assets/clear.png'))
  const [rightEye, setRightEye] = useState(require('../assets/clear.png'))
  const [nose, setNose] = useState(require('../assets/clear.png'))
  const [mouth, setMouth] = useState(require('../assets/clear.png'))

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
    <Container>
      <Header style={styles.headerContainer}>
        <Text style={styles.header}>PHOTOS</Text>
      </Header>
      <Content>
        <ScrollView style={styles.gallery}>
          <FadeInView
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
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
                        height: 110,
                        width: 110,
                        margin: 10
                      }}
                      source={{uri: capture.uri}}
                    />
                  </TouchableOpacity>
                )
              })}
          </FadeInView>

          <View style={{marginTop: 22}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
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
                        (face.noseBasePosition.y / activeImage.height) * 550 -
                        30,
                      left:
                        (face.noseBasePosition.x / activeImage.width) * 400 -
                        30,
                      transform: [{rotate: `${face.rollAngle}deg` || '0deg'}],
                      zIndex: 100
                    }}
                    source={nose}
                    resizeMode="contain"
                  />
                  <Image
                    style={{
                      width: 80,
                      height: 100,
                      position: 'absolute',
                      top:
                        (face.rightEyePosition.y / activeImage.height) * 550 -
                        50,
                      left:
                        (face.rightEyePosition.x / activeImage.width) * 400 -
                        10,
                      transform: [
                        {rotate: `${face.rollAngle * -1}deg` || '0deg'}
                      ],
                      zIndex: 98
                    }}
                    source={rightEye}
                    resizeMode="contain"
                  />
                  <Image
                    style={{
                      width: 80,
                      height: 100,
                      position: 'absolute',
                      top:
                        (face.leftEyePosition.y / activeImage.height) * 550 -
                        50,
                      left:
                        (face.leftEyePosition.x / activeImage.width) * 400 - 60,
                      transform: [{rotate: `-${face.rollAngle}deg` || '0deg'}],
                      zIndex: 90
                    }}
                    source={leftEye}
                    resizeMode="contain"
                  />
                  <Image
                    style={{
                      width: 150,
                      height: 55,
                      position: 'absolute',
                      top:
                        (face.bottomMouthPosition.y / activeImage.height) *
                          550 -
                        35,
                      left:
                        (face.bottomMouthPosition.x / activeImage.width) * 400 -
                        60,
                      transform: [{rotate: `-${face.rollAngle}deg` || '0deg'}],
                      zIndex: 99
                    }}
                    source={mouth}
                    resizeMode="contain"
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
                  <Text style={styles.msg}>{hasSaved && 'saved!'}</Text>
                </View>
                <Footer>
                  <FooterTab>
                    <Button
                      onPress={() => {
                        setLeftEye(require('../assets/clear.png'))
                        setRightEye(require('../assets/clear.png'))
                        setNose(require('../assets/clear.png'))
                        setMouth(require('../assets/clear.png'))
                      }}
                    >
                      <Icon type="Entypo" name="eraser" />
                    </Button>
                    <Button
                      onPress={() => {
                        setLeftEye(require('../assets/heart.png'))
                        setRightEye(require('../assets/heart.png'))
                        setNose(require('../assets/clear.png'))
                        setMouth(require('../assets/rosem.png'))
                      }}
                    >
                      <Icon type="Entypo" name="heart" />
                    </Button>
                    <Button
                      onPress={() => {
                        setLeftEye(require('../assets/lefteyeb.png'))
                        setRightEye(require('../assets/righteyeb.png'))
                        setNose(require('../assets/nose.png'))
                        setMouth(require('../assets/mouth.png'))
                      }}
                    >
                      <Icon type="Entypo" name="emoji-happy" />
                    </Button>
                    <Button
                      onPress={() => {
                        setLeftEye(require('../assets/lefteyeb.png'))
                        setRightEye(require('../assets/winkright.png'))
                        setNose(require('../assets/nose.png'))
                        setMouth(require('../assets/mouth.png'))
                      }}
                    >
                      <Icon type="Entypo" name="emoji-flirt" />
                    </Button>
                    <Button
                      onPress={() => {
                        setLeftEye(require('../assets/shinyeye.png'))
                        setRightEye(require('../assets/shinyeye.png'))
                        setNose(require('../assets/clear.png'))
                        setMouth(require('../assets/animem.png'))
                      }}
                    >
                      <Icon type="Entypo" name="eye" />
                    </Button>
                    {/* <Button
                      onPress={() => {
                        setLeftEye(require('../assets/lefteyeb.png'))
                        setRightEye(require('../assets/righteyeb.png'))
                        setNose(require('../assets/nose.png'))
                        setMouth(require('../assets/mouth.png'))
                      }}
                    >
                      <Icon type="Entypo" name="pencil" />
                    </Button> */}
                  </FooterTab>
                </Footer>
                <Footer>
                  <FooterTab>
                    <Button
                      onPress={() => {
                        setFace(initFaceState)
                        setHasSaved(false)
                        setModalVisible(!modalVisible)
                        setLeftEye(require('../assets/clear.png'))
                        setRightEye(require('../assets/clear.png'))
                        setNose(require('../assets/clear.png'))
                        setMouth(require('../assets/clear.png'))
                      }}
                    >
                      <Icon ios="ios-close" android="md-close" />
                      <Text>Close</Text>
                    </Button>
                    <Button
                      onPress={async () => {
                        captureRef(canvas, {
                          format: 'jpg',
                          quality: 0.9
                        }).then(
                          uri => {
                            CameraRoll.saveToCameraRoll(uri)
                          },
                          error => console.error('oops', error)
                        )

                        setHasSaved(true)
                      }}
                    >
                      <Icon ios="ios-save" android="md-save" />
                      <Text>Save Modified</Text>
                    </Button>
                    <Button
                      onPress={async () => {
                        await CameraRoll.saveToCameraRoll(activeImage.uri)

                        setHasSaved(true)
                      }}
                    >
                      <Icon ios="ios-save" android="md-save" />
                      <Text>Save Original</Text>
                    </Button>
                    <Button
                      onPress={async () => {
                        captureRef(canvas, {
                          format: 'jpg',
                          quality: 0.9
                        }).then(
                          uri => {
                            uploadImage(uri)
                          },
                          error => console.error('oops', error)
                        )
                      }}
                    >
                      <Icon ios="ios-upload" android="md-upload" />
                      <Text>Upload</Text>
                    </Button>
                  </FooterTab>
                </Footer>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => props.history.push('/')}>
            <Icon ios="ios-home" android="md-home" />
            <Text>Home</Text>
          </Button>

          <Button onPress={() => props.history.push('/camera')}>
            <Icon ios="ios-camera" android="md-camera" />
            <Text>Camera</Text>
          </Button>

          <Button onPress={_pickImage}>
            <Icon type="MaterialIcons" name="camera-roll" />
            <Text>Camera Roll</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default Photo
