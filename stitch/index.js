import {Stitch} from 'mongodb-stitch-react-native-sdk'

// TODO: Add your Stitch app's App ID
const APP_ID = 'fsa-stackathon-ajmxk'

// TODO: Initialize the app client
export const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID)

const initApp = async () => {
  return await Stitch.initializeAppClient(APP_ID)
}

export default initApp //returns a promise...
