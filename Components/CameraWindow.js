import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {View, TouchableOpacity, Image} from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Toast
} from 'native-base'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import {Link} from 'react-router-native'
import {addCapture} from '../store'
import styles from '../styles'
import Photo from './Photo'
import FadeInView from './FadeInView'

// CameraRoll.saveToCameraRoll(tag, [type]);
const CameraWindow = props => {
  const dispatch = useDispatch()

  //local state
  const [hasCameraPermission, setCameraPermission] = useState(true)
  //camera flip state
  const [type, setType] = useState(Camera.Constants.Type.back)
  //camra flash
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  let camera = null
  //global state
  const captures = useSelector(state => state.captures)

  // useEffect(async () => {
  //   cameraPermissionRequest()
  // }, []) //componentDidMount

  // const cameraPermissionRequest = async () => {
  //   const {status} = await Permissions.askAsync(Permissions.CAMERA)
  //   setCameraPermission(status === 'granted')
  //   return 0
  // }

  const handleCapture = async () => {
    // console.log('cap', props)
    const photoData = await camera.takePictureAsync()
    dispatch(addCapture(photoData))

    // props.history.push('/photo')
  }

  if (hasCameraPermission === null) {
    return <View />
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  } else {
    return (
      <FadeInView style={{flex: 1}}>
        <Header transparent>
          <Left>
            <TouchableOpacity
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }}
            >
              {flash ? (
                <Icon ios="ios-flash" android="md-flash" />
              ) : (
                <Icon ios="ios-flash-off" android="md-flash-off" />
              )}
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>Camera</Title>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <Icon ios="ios-swap" android="md-sync" />
            </TouchableOpacity>
          </Right>
        </Header>
        <Camera
          style={{flex: 1}}
          type={type}
          ref={ref => {
            camera = ref
          }}
          flashMode={flash}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          ></View>
        </Camera>
        <Footer>
          <FooterTab>
            <Button onPress={() => props.history.push('/')}>
              <Icon ios="ios-home" android="md-home" />
            </Button>
            <Button
              onPress={() => {
                handleCapture()
                Toast.show({
                  text: 'Photo captured!',
                  buttonText: 'Okay',
                  position: "top",
                  type: "success"
                })
              }}
            >
              <Icon name="camera" />
            </Button>
            <Button onPress={() => props.history.push('/photo')}>
              <Icon ios="ios-images" android="md-photos" />
            </Button>
          </FooterTab>
        </Footer>
      </FadeInView>
    )
  }
}

export default CameraWindow

// export default class CameraWindow extends React.Component {
//   camera = null
//   // const captures = useSelector(state=>state.captures)
//   constructor(props) {
//     super(props)
//     this.state = {
//       hasCameraPermission: null,
//       type: Camera.Constants.Type.back,
//       captures: []
//     }
//     this.handleCapture = this.handleCapture.bind(this)
//   }

//   async componentDidMount() {
//     const {status} = await Permissions.askAsync(Permissions.CAMERA)
//     this.setState({hasCameraPermission: status === 'granted'})
//   }

//   async handleCapture() {
//     console.log('cap', this.props)
//     const photoData = await this.camera.takePictureAsync()
//     this.setState({
//       captures: [photoData, ...this.state.captures]
//     })
//     // this.props.history.push('/photo')
//   }

//   render() {
//     const {hasCameraPermission} = this.state
//     if (hasCameraPermission === null) {
//       return <View />
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>
//     } else {
//       return (
//         <View style={{flex: 1}}>
//           <Camera
//             style={{flex: 1}}
//             type={this.state.type}
//             ref={ref => {
//               this.camera = ref
//             }}
//           >
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row'
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center'
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type:
//                       this.state.type === Camera.Constants.Type.back
//                         ? Camera.Constants.Type.front
//                         : Camera.Constants.Type.back
//                   })
//                 }}
//               >
//                 <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
//                   {' '}
//                   Flip{' '}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center'
//                 }}
//                 onPress={this.handleCapture}
//               >
//                 <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
//                   {' '}
//                   Click{' '}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.3,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center'
//                 }}
//               ></TouchableOpacity>
//             </View>
//           </Camera>
//           {this.state.captures.length > 0 && (
//             <>
//               <Text>
//                 A photo! {this.state.captures[0].uri}{' '}
//                 {this.state.captures[0].width} {this.state.captures[0].height}{' '}
//                 {console.log(Array.isArray(this.state.captures))}
//               </Text>
//               <View style={{flexDirection: 'row'}}>
//                 {this.state.captures.map(capture => (
//                   <Image
//                     key={capture.uri}
//                     style={{width: 50, height: 50}}
//                     source={{uri: capture.uri}}
//                   />
//                 ))}
//               </View>
//               {/* <Photo captures={this.state.captures} /> */}
//             </>
//           )}
//           <View
//             style={{
//               height: 100,
//               padding: 15,
//               backgroundColor: 'pink'
//             }}
//           >
//             <Link to="/">
//               <Text>Home</Text>
//             </Link>
//             <Text>This is some stuff {this.state.captures.length + 'hi'}</Text>
//           </View>
//         </View>
//       )
//     }
//   }
// }
