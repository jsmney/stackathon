import React from 'react'
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

import styles from '../styles'

const About = props => {
  return (
    <Container>
      <Header style={styles.headerContainer}>
        <Text style={styles.header}>ABOUT</Text>
      </Header>
      <Content padder>
        <Content padder>
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
