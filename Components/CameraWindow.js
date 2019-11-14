import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {Camera} from 'expo-camera'
import {Link} from 'react-router-native'
import {addCapture} from '../store'
import styles from '../styles'
import Photo from './Photo'

const CameraWindow = props => {
  const dispatch = useDispatch()

  //local state
  const [hasCameraPermission, setCameraPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  let camera = null
  //global state
  const captures = useSelector(state => state.captures)

  useEffect(async () => {
    cameraPermissionRequest()
  }, []) //componentDidMount

  const cameraPermissionRequest = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    setCameraPermission(status === 'granted')
  }

  const handleCapture = async () => {
    console.log('cap', props)
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
      <View style={{flex: 1}}>
        <Camera
          style={{flex: 1}}
          type={type}
          ref={ref => {
            camera = ref
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
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}
            >
              <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                Flip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={handleCapture}
            >
              <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                {' '}
                Click{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {captures.length > 0 && (
          <>
            <Text>
              A photo! {captures[0].uri} {captures[0].width}{' '}
              {captures[0].height} {console.log(Array.isArray(captures))}
            </Text>
            <View style={{flexDirection: 'row'}}>
              {captures.map(capture => (
                <Image
                  key={capture.uri}
                  style={{width: 50, height: 50}}
                  source={{uri: capture.uri}}
                />
              ))}
            </View>
            {/* <Photo captures={captures} /> */}
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
          <Text>This is some stuff {captures.length + 'hi'}</Text>
        </View>
      </View>
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
