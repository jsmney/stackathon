import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

//layout elements
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'

//link for router
import {Link} from 'react-router-native'

//image picker
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

//faceDetector
import * as FaceDetector from 'expo-face-detector'

//styles
import styles from '../styles'


// on click: modal zooms in on image. facedetector adds shit.
const Photo = props => {
  const captures = useSelector(state => state.captures)
  const [image, setImage] = useState(null)
  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)

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

  useEffect(() => {
    getPermissionAsync()
  }, [])

  return (
    <ScrollView style={styles.gallery}>
      <Text style={styles.header}>Photo</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {captures &&
          captures.map(capture => {
            return (
              <Image
                key={capture.uri}
                style={{borderRadius: 10, height: 200, width: 200, margin: 10}}
                source={{uri: capture.uri}}
              />
            )
          })}
      </View>
      <Button title="Pick an image from camera roll" onPress={_pickImage} />
      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
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
//   //     leftMouthPosition: {x, y},
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
