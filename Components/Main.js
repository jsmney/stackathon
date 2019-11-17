import React from 'react'
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Icon,
  H1,
  H2
} from 'native-base'

import styles from '../styles'

const Main = props => {
  return (
    <Container>
      <Header style={styles.headerContainer}>
        <Text style={styles.header}>FACESTUFF</Text>
      </Header>
      <Content padder>
        <Content padder styles={styles.container}>
          <H1>Welcome!</H1>
          <Text>
            Welcome to FACESTUFF, where you can take pictures and put things on
            a face in the picture.
          </Text>
          <Text>
            FACESTUFF will currently only do this to one face in the picture:
            the first face it finds (or to nothing if if can't find a face).
          </Text>
          <Text style={styles.msg}>
            <Icon type="AntDesign" name="star" />{' '}
            <Icon type="AntDesign" name="staro" />{' '}
            <Icon type="AntDesign" name="star" />{' '}
            <Icon type="AntDesign" name="staro" />{' '}
            <Icon type="AntDesign" name="star" />{' '}
            <Icon type="AntDesign" name="staro" />{' '}
            <Icon type="AntDesign" name="star" />
          </Text>
          <H2>Getting Started</H2>
          <Text styles={styles.homeText}>
            <Icon
              ios="ios-camera"
              android="md-camera"
              onPress={() => props.history.push('/camera')}
            />{' '}
            Take a photo (preferably of a face)
          </Text>
          <Text styles={styles.homeText}>
            <Icon
              ios="ios-images"
              android="md-photos"
              onPress={() => props.history.push('/photo')}
            />{' '}
            View your photos, and tap to edit.
          </Text>
          <Text styles={styles.homeText}>
            <Icon type="Foundation" name="burst" /> Have fun!
          </Text>
                </Content>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => props.history.push('/about')}>
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
