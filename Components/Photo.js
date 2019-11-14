import React from 'react'
import {useSelector} from 'react-redux'
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {Link} from 'react-router-native'

import * as FaceDetector from 'expo-face-detector'
import styles from '../styles'

const Photo = props => {
  const captures = useSelector(state => state.captures)
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
