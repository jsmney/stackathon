import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

//layout elements
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ScrollView,
  Modal,
  Alert
} from 'react-native'

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
    noseBasePosition: {x: 0, y: 0}
  })
  const [noseX, setNoseX] = useState(0)
  const [noseY, setNoseY] = useState(0)
  const [activeImage, setActiveImage] = useState({
    uri:
      'https://66.media.tumblr.com/13bd026170835d5ecf50175dfbbb5b5a/f4d2966ad493a972-62/s1280x1920/ef8260ba55a047239aad85bf52517abf5b6fbc2d.jpg'
  })

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
    console.log('d', detected.faces.length, detected.faces[0])
    detected.faces.length && setFace(detected.faces[0])
    detected.faces.length && setNoseX(detected.faces[0].noseBasePosition.x)
    detected.faces.length && setNoseY(detected.faces[0].noseBasePosition.y)
    return detected
  }

  return (
    <ScrollView style={styles.gallery}>
      <Text style={styles.header}>Photo</Text>
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
            <View>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text>Close</Text>
              </TouchableHighlight>
              <Image
                style={{
                  borderRadius: 10,
                  height: 600,
                  width: 400,
                  margin: 10,
                  alignSelf: 'center',
                  zIndex: 1
                }}
                source={{uri: activeImage.uri}}
              />
              <View
                style={{
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: (noseY / activeImage.height) * 600,
                  left: (noseX / activeImage.width) * 400,
                  zIndex: 100
                }}
              />
              <View
                style={{
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  backgroundColor: 'green',
                  position: 'absolute',
                  top: (face.rightEyePosition.y / activeImage.height) * 600,
                  left: (face.rightEyePosition.x / activeImage.width) * 400,
                  zIndex: 98
                }}
              />
              <View
                style={{
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  backgroundColor: 'blue',
                  position: 'absolute',
                  top: (face.leftEyePosition.y / activeImage.height) * 600,
                  left: (face.leftEyePosition.x / activeImage.width) * 400,
                  zIndex: 90
                }}
              />
              <View
                style={{
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  backgroundColor: 'yellow',
                  position: 'absolute',
                  top: (face.bottomMouthPosition.y / activeImage.height) * 600,
                  left: (face.bottomMouthPosition.x / activeImage.width) * 400,
                  zIndex: 99
                }}
              />
              <Text>
                {activeImage.height} {activeImage.width} {noseX} {noseY}{' '}
                {(activeImage.height / 600) * noseY}
              </Text>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
      <Link to="/">
        <Text>Home</Text>
      </Link>
    </ScrollView>
  )
}

export default Photo

// onFacesDetected={this.handleFacesDetected}
// faceDetectorSettings={{
//   mode: FaceDetector.Constants.Mode.fast,
//   detectLandmarks: FaceDetector.Constants.Landmarks.all,
//   runClassifications: FaceDetector.Constants.Classifications.none,
//   minDetectionInterval: 100,
//   tracking: true,
// }}
{
  /* <View
              style={{
                borderRadius: 10,
                width: 20,
                height: 20,
                backgroundColor: 'red',
                position: 'absolute',
                top: { noseX },
                left: { noseY },
              }}
            ></View> */
}

// handleFacesDetected(evt) {
//   // evt {
//   //   type,
//   //   faces: [{facesbounds: {x, y}: {x, y},
//   //     leftEarPosition: {x, y},
//   //     leftEyePosition: {x, y},
//   //     yawAngle: {x, y},
//   //     rightEyePosition: {x, y},
//   //     leftbottomM {x, y},
//   //     rightEarPosition: {x, y},
//   //     leftCheekPosition: {x, y},
//   //     faceID: {x, y},
//   //     rightCheekPosition: {x, y},
//   //     rollAngle: {x, y},
//   //     rightMouthPosition: {x, y},
//   //     bottomMouthPosition: {x, y},
//   //     noseBasePosition: {x, y}}],
//   //   target
//   // }
//   !this.state.seeFace &&
//     this.setState({
//       seeFace: true,
//     });
//   evt.faces.noseBasePosition &&
//     this.setState({
//       noseX: Math.floor(evt.faces[0].noseBasePosition.x),
//       noseY: Math.floor(evt.faces[0].noseBasePosition.y),
//     });
//   // alert('type' + evt.type);
//   // facesbounds;
//   // leftEarPosition;
//   // leftEyePosition;
//   // yawAngle;
//   // rightEyePosition;
//   // leftMouthPosition;
//   // rightEarPosition;
//   // leftCheekPosition;
//   // faceID;
//   // rightCheekPosition;
//   // rollAngle;
//   // rightMouthPosition;
//   // bottomMouthPosition;
//   // noseBasePosition;
//   // alert('target' + evt.target);
// }
