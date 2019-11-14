import React from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import {Link} from 'react-router-native'
import styles from '../styles'
import Photo from './Photo'

export default class CameraPage extends React.Component {
  camera = null
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      captures: []
    }
    this.handleCapture = this.handleCapture.bind(this)
  }

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
  }

  handleCamera(camera) {
    // if (this.state.camera !== camera) {
    //   // this.setState({camera: camera})
    // }
  }

  async handleCapture() {
    const photoData = await this.camera.takePictureAsync()
    this.setState({
      captures: [photoData, ...this.state.captures]
    })
  }

  render() {
    const {hasCameraPermission} = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera
            style={{flex: 1}}
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  })
                }}
              >
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={this.handleCapture}
              >
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                  {' '}
                  Click{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.3,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
              ></TouchableOpacity>
            </View>
          </Camera>
          {this.state.captures.length > 0 && (
            <>
              <Text>
                A photo! {this.state.captures[0].uri}{' '}
                {this.state.captures[0].width} {this.state.captures[0].height}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {this.state.captures.map(capture => (
                  <Image
                    key={capture.uri}
                    style={{width: 50, height: 50}}
                    source={{uri: capture.uri}}
                  />
                ))}
              </View>
            </>
          )}
          <View
            style={{
              height: 100,
              padding: 15,
              backgroundColor: 'pink'
            }}
          >
            <Link to="/">
              <Text>Home</Text>
            </Link>
            <Text>This is some stuff {this.state.captures.length + 'hi'}</Text>
          </View>
        </View>
      )
    }
  }
}
