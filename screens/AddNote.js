/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';

export default class AddNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>ADD / EDIT NOTES</Text>
          <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1}></TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1}></TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1}></TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
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
    fontSize: 15,
    fontFamily: "Merriweather-Regular",
    textAlign: 'center',
    color: '#333333',
    marginTop: 10
  },
  button1: {
      backgroundColor: '#4ba3c7',
      width: 200,
      height: 100,
      //marginLeft: 10
      marginTop: 10,
      marginBottom: 10
  },
  buttonDelete: {
    backgroundColor: '#A4D7ED',
    width: 100,
    height: 100,
    marginTop: 10,
    marginBottom: 10
  },
  nextRow: {
    flexDirection: 'row'
  }
});
