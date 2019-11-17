export {default as CameraWindow} from './CameraWindow'
export {default as Main} from './Main'
export {default as Photo} from './Photo'
export {default as About} from './About'

// import {useDispatch} from 'react-redux'
// import {setClient} from '../store'
// import {Text} from 'react-native'
// const {
//   Stitch,
//   RemoteMongoClient,
//   AnonymousCredential
// } = require('mongodb-stitch-react-native-sdk')

// const doThing = async () => {
//   const client = await Stitch.initializeDefaultAppClient('fsa-stackathon-ajmxk')

//   // useDispatch(setClient(client))
//   const db = await client
//     .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
//     .db('facestuff')

//   client.auth
//     .loginWithCredential(new AnonymousCredential())
//     .then(user =>
//       db
//         .collection('guestbook')
//         .updateOne(
//           {owner_id: client.auth.user.id},
//           {$set: {number: 42}},
//           {upsert: true}
//         )
//     )
//     .then(() =>
//       db
//         .collection('guestbook')
//         .find({owner_id: client.auth.user.id}, {limit: 100})
//         .asArray()
//     )
//     .then(docs => {
//       console.log('Found docs', docs)
//       console.log('[MongoDB Stitch] Connected to Stitch')
//     })
//     .catch(err => {
//       console.error(err)
//     })
//   return <Text>hi</Text>
// }

// doThing()
