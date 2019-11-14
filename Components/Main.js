import React from 'react'
import {View} from 'react-native'
import {Container, Header, Content, Button, Text} from 'native-base'

import styles from '../styles'

const Main = props => {
  return (
    <Container>
      <Header>
        <Text>WELCOME</Text>
      </Header>
      <Content>
        <Button success>
          <Text> Light </Text>
        </Button>
      </Content>
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
