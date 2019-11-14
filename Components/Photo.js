import React from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {Link} from 'react-router-native'

import * as FaceDetector from 'expo-face-detector'
import styles from '../styles'

const Photo = (captures = []) => {
  console.log(captures)
  return (
    <ScrollView
      horizontal={true}
      style={[styles.bottomToolbar, styles.galleryContainer]}
    >
      {/* {captures.map(({uri}) => (
        <View style={styles.galleryImageContainer} key={uri}>
          <Image source={{uri}} style={styles.galleryImage} />
        </View>
      ))} */}

      <View>
        <Text>Photo</Text>
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Link to="/">
            <Text>Home</Text>
          </Link>
        </TouchableOpacity>
      </View>
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
