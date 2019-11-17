import {
  Stitch,
  getServiceClient,
  RemoteMongoClient
} from 'mongodb-stitch-react-native-sdk'
import initApp from './index'

// TODO: Initialize a MongoDB Service Client
const mongoClient = initApp().getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas'
)

// TODO: Instantiate a collection handle for todo.items
const items = mongoClient.db('facestuff').collection('guestbook')

export {items}
