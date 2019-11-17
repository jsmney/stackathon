import React, {useState} from 'react'
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
  Input
} from 'native-base'
import {View, TouchableOpacity, Keyboard, TextInput} from 'react-native'

//mongo?
import Confetti from 'react-native-confetti'
import {Stitch, RemoteMongoClient} from 'mongodb-stitch-react-native-sdk'

import styles from '../styles'

const About = props => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  let _confettiView = null

  const handleSubmit = () => {
    Keyboard.dismiss()
    if (_confettiView) {
      _confettiView.startConfetti()
    }
    const stitchAppClient = Stitch.defaultAppClient
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    )
    const db = mongoClient.db('facestuff')
    const entry = db.collection('guestbook')
    if (message !== '') {
      entry
        .insertOne({
          Name: name,
          Message: message,
          CreatedOn: new Date()
        })
        .then(() => {
          setMessage('')
          setName('')
        })
        .catch(err => {
          console.warn(err)
        })
    }
  }

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
