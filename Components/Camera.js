import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Link } from 'react-router-native';
import * as FaceDetector from 'expo-face-detector';

export default class CameraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      noseX: 0,
      noseY: 0,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleFacesDetected(evt) {
    // evt {
    //   type,
    //   faces: [{facesbounds: {x, y}: {x, y},
    //     leftEarPosition: {x, y},
    //     leftEyePosition: {x, y},
    //     yawAngle: {x, y},
    //     rightEyePosition: {x, y},
    //     leftMouthPosition: {x, y},
    //     rightEarPosition: {x, y},
    //     leftCheekPosition: {x, y},
    //     faceID: {x, y},
    //     rightCheekPosition: {x, y},
    //     rollAngle: {x, y},
    //     rightMouthPosition: {x, y},
    //     bottomMouthPosition: {x, y},
    //     noseBasePosition: {x, y}}],
    //   target
    // }
    evt.faces.noseBasePosition &&
      this.setState({
        noseX: Math.floor(evt.faces[0].noseBasePosition.x),
        noseY: Math.floor(evt.faces[0].noseBasePosition.y),
      });
    // alert('type' + evt.type);
    // facesbounds;
    // leftEarPosition;
    // leftEyePosition;
    // yawAngle;
    // rightEyePosition;
    // leftMouthPosition;
    // rightEarPosition;
    // leftCheekPosition;
    // faceID;
    // rightCheekPosition;
    // rollAngle;
    // rightMouthPosition;
    // bottomMouthPosition;
    // noseBasePosition;
    // alert('target' + evt.target);
  }

  render() {
    const { hasCameraPermission, noseX, noseY } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            onFacesDetected={this.handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            <View
              style={{
                borderRadius: 10,
                width: 20,
                height: 20,
                backgroundColor: 'red',
                position: 'absolute',
                top: { noseX },
                left: { noseY },
              }}
            ></View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  {' '}
                  Click{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.3,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
              ></TouchableOpacity>
            </View>
          </Camera>
          <View
            style={{
              height: 150,
              padding: 15,
              backgroundColor: 'pink',
            }}
          >
            <Link to="/">
              <Text>Home</Text>
            </Link>

            <Text>This is some stuff{Camera.Constants.pictureSize}</Text>
          </View>
        </View>
      );
    }
  }
}
