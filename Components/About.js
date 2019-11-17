import React, {useState, useEffect} from 'react'
import {
  H2,
  Text,
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Textarea,
  Input,
  Card,
  CardItem
} from 'native-base'
import {View, TouchableOpacity, Keyboard, TextInput} from 'react-native'

//mongo?
import Confetti from 'react-native-confetti'
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from 'mongodb-stitch-react-native-sdk'
import {useSelector} from 'react-redux'

import styles from '../styles'
import {getGuestbook} from '../store'

const About = props => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  let [theDocs, setTheDocs] = useState([])
  let _confettiView = null
  const APP_ID = 'fsa-stackathon-ajmxk'

  const getGuestBook = async () => {
    const client = Stitch.hasAppClient(APP_ID)
      ? await Stitch.getAppClient(APP_ID)
      : await Stitch.initializeAppClient(APP_ID)

    const db = await client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('facestuff')

    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() =>
        db
          .collection('guestbook')
          .find()
          .asArray()
      )
      .then(docs => {
        console.log('found docs!', docs)
        setTheDocs(docs)
      })
      .catch(err => {
        console.error('mongo error :(', err)
      })
  }

  useEffect(() => {
    getGuestBook()
  }, [])

  const handleSubmit = async () => {
    Keyboard.dismiss()
    if (_confettiView) {
      _confettiView.startConfetti()
    }

    const client = Stitch.hasAppClient(APP_ID)
      ? await Stitch.getAppClient(APP_ID)
      : await Stitch.initializeAppClient(APP_ID)

    const db = await client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('facestuff')

    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(user => {
        console.log('stuff', message, name)
        db.collection('guestbook').insertOne({Name: name, Message: message})
      })
      .then(() =>
        db
          .collection('guestbook')
          .find()
          .asArray()
      )
      .then(docs => {
        console.log('found docs!', docs)
        setTheDocs(docs)
      })
      .catch(err => {
        console.error('mongo error :(', err)
      })
  }

  // i made this to delete all the useless gibberish I had added to the db until i got it working

  // const deleteAll = async () => {
  //   const client = Stitch.hasAppClient(APP_ID)
  //     ? await Stitch.getAppClient(APP_ID)
  //     : await Stitch.initializeAppClient(APP_ID)

  //   const db = await client
  //     .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
  //     .db('facestuff')

  //   client.auth
  //     .loginWithCredential(new AnonymousCredential())
  //     .then(user => {
  //       console.log('stuff', message, name)
  //       db.collection('guestbook').deleteMany()
  //     })
  //     .then(() =>
  //       db
  //         .collection('guestbook')
  //         .find()
  //         .asArray()
  //     )
  //     .then(docs => {
  //       console.log('found docs!', docs)
  //       setTheDocs(docs)
  //     })
  //     .catch(err => {
  //       console.error('mongo error :(', err)
  //     })
  // }

  return (
    <Container>
      <Header style={styles.headerContainer}>
        <Text style={styles.header}>ABOUT</Text>
      </Header>
      <Content padder>
        <Content padder>
          <Confetti
            confettiCount={50}
            timeout={10}
            duration={2000}
            ref={node => (_confettiView = node)}
          />
          <H2>Leave a message!</H2>
          <Input
            style={{
              fontSize: 20
            }}
            placeholder="Enter name..."
            onChangeText={text => setName(text)}
            value={name}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Content padder />
          <Textarea
            rowSpan={5}
            bordered
            style={{
              fontSize: 15
            }}
            placeholder="Enter message..."
            onChangeText={text => setMessage(text)}
            value={message}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <Content padder />
          <Button onPress={() => handleSubmit()}>
            <Text>Submit</Text>
          </Button>
          <Content padder />
          <Text>Guestbook entries: {theDocs.length}</Text>
          <Content>
            {theDocs.length ? (
              theDocs.map(doc => {
                return (
                  <Text key={doc.id}>
                    "{doc.Message}" - {doc.Name}
                  </Text>
                )
              })
            ) : (
              <Text></Text>
            )}
            <Button onPress={() => deleteAll()}>
              <Text>DELETE</Text>
            </Button>
          </Content>
          <Content padder />
          <Text styles={styles.homeText}>
            Made in November 2019 with React Native and Expo by @jsmney as a
            Stackathon project for Grace Hopper / Fullstack Academy 1909.
          </Text>
          <Text style={styles.msg}>
            <Icon type="AntDesign" name="smileo" />
          </Text>
        </Content>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => props.history.push('/')}>
            <Icon ios="ios-home" android="md-home" />
          </Button>
          <Button onPress={() => props.history.push('/camera')}>
            <Icon ios="ios-camera" android="md-camera" />
          </Button>
          <Button onPress={() => props.history.push('/photo')}>
            <Icon ios="ios-images" android="md-photos" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default About
