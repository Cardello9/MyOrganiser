/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';

export default class Dates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>VIEW DATES</Text>
          <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
          </ScrollView>
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
    fontFamily: "Merriweather-Regular",
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
