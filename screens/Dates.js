/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Dates extends Component {
  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button1}></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81d4fa',
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
  button1: {
      backgroundColor: '#4ba3c7',
      width: 300,
      height: 100,
      marginRight: 10,
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10
  }
});
