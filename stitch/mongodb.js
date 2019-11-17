import {RemoteMongoClient} from 'mongodb-stitch-react-native-sdk'
import {app} from './index'

// TODO: Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  'mongodb-atlas'
)

// TODO: Instantiate a collection handle for todo.items
const items = mongoClient.db('facestuff').collection('guestbook')

export {items}
