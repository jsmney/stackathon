import React, {useState} from 'react'
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Dimensions
} from 'react-native'
import {
  H2,
  Text,
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base'
import Confetti from 'react-native-confetti'
import {Ionicons} from '@expo/vector-icons'

import {Stitch, RemoteMongoClient} from 'mongodb-stitch-react-native-sdk'
import {items} from '../stitch/mongodb'
import {
  hasLoggedInUser,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser
} from './../stitch/auth'

import {useDispatch} from 'react-redux'
import addGuestbookEntry from '../store'
import styles from '../styles'

const About = props => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  let _confettiView = null

  const [authState, setAuthState] = useState({
    isLoggedIn: hasLoggedInUser(),
    currentUser: getCurrentUser()
  })

  const handleAnonymousLogin = async () => {
    // Call the function we defined to log in to Stitch and then update
    // our authentication state
    if (!authState.isLoggedIn) {
      const loggedInUser = await loginAnonymous()
      setAuthState({
        ...authState,
        isLoggedIn: true,
        currentUser: loggedInUser
      })
    }
  }

  const handleLogout = async () => {
    // Call the function we defined to log out of Stitch and then update
    // our authentication state
    if (authState.isLoggedIn) {
      await logoutCurrentUser()
      setAuthState({
        ...authState,
        isLoggedIn: false,
        currentUser: null
      })
    }
  }

  const addEntry = async entry => {
    try {
      await items.insertOne(entry)
      dispatch(addGuestbookEntry(entry))
    } catch (err) {
      console.error(err)
    }
  }
  // const removeEntry = async entryId => {
  //   try {
  //     await items.deleteOne({_id: entryId})
  //     dispatch(removeGuestbookEntry(entry))
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const handleSubmit = () => {
    Keyboard.dismiss()

    if (text.length && name.length) {
      addEntry({
        message: text,
        name: name,
        createdOn: new Date()
      })

      if (_confettiView) {
        _confettiView.startConfetti()
      }
      setText('')
      setName('')
    }
  }

  return (
    <StitchAuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        currentUser: authState.currentUser,
        actions: {handleAnonymousLogin, handleLogout}
      }}
    >
      <Container>
        <Header style={styles.headerContainer}>
          <Text style={styles.header}>GUESTBOOK</Text>
        </Header>
        <Content padder>
          <Content padder>
            <Confetti
              confettiCount={50}
              timeout={10}
              duration={2000}
              ref={node => (_confettiView = node)}
            />
            <View style={styles.input}>
              <TextInput
                style={{
                  fontSize: 20
                }}
                placeholder="Enter Name"
                onChangeText={name => setName(name)}
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TextInput
                style={{
                  fontSize: 10
                }}
                placeholder="Enter Message..."
                onChangeText={text => setText(text)}
                value={text}
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text>Submit</Text>
              </TouchableOpacity>
              <ScrollView
                contentContainerStyle={{flex: 1}}
                keyboardShouldPersistTaps="handled"
              />
            </View>
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
    </StitchAuthContext.Provider>
  )
}

export default About
