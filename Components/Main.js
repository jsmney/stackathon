import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Hello?</Text>
      <Link to="/camera">
        <Text>Camera</Text>
      </Link>
    </View>
  );
};
export default Main;
