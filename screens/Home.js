/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to QUIZ</Text>
        <Button title='Test' onPress={() => this.goToScreen('test-screen')}></Button>
        <Text style={styles.welcome}>get to know your results:</Text>
        <Button title='Results' onPress={() => this.goToScreen('results-screen')}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
