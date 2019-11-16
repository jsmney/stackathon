import React from 'react'
import {View} from 'react-native'
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

    // <View style={styles.container}>
    //   <View
    //     style={{flex: 1, backgroundColor: 'lightblue', alignItems: 'center'}}
    //   >
    //     <Text style={styles.header}>WELCOME</Text>
    //   </View>
    //   <View style={{flex: 3, backgroundColor: 'skyblue', alignItems: 'center'}}>
    //     <View style={styles.buttonContain}>
    //       <Button
    //         style={styles.button}
    //         onPress={() => props.history.push('/camera')}
    //         title="Camera"
    //       />
    //     </View>
    //     <View style={styles.buttonContain}>
    //       <Button
    //         style={styles.button}
    //         onPress={() => props.history.push('/photo')}
    //         title="Photo"
    //       />
    //     </View>
    //   </View>
    //   <View
    //     style={{flex: 1, backgroundColor: 'lightblue', alignItems: 'center'}}
    //   >
    //     <Text style={styles.header}>Hello... ahhhh</Text>
    //   </View>
    // </View>
  )
}
export default Main
