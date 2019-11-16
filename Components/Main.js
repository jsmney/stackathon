import React from 'react'
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Icon
} from 'native-base'

import styles from '../styles'

const Main = props => {
  return (
    <Container>
      <Header style={styles.headerContainer}>
        <Text style={styles.header}>WELCOME</Text>
      </Header>
      <Content transparent styles={styles.container}>
        <Button
          dark
          style={styles.button}
          onPress={() => props.history.push('/camera')}
        >
          <Text> Camera </Text>
        </Button>
        <Button
          dark
          style={styles.button}
          onPress={() => props.history.push('/photo')}
        >
          <Text> Gallery </Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => props.history.push('/')}>
            <Icon ios="ios-heart" android="md-heart" />
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
export default Main
