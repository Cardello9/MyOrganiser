/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Navigation } from 'react-native-navigation';

export default class AddDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      day: "",
      month: "",
      year: ""
    };
  }

  showModal() {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'AddDateModal',
            passProps: {
              day: this.state.day,
              month: this.state.month,
              year: this.state.year
            },
            options: {
              topBar: {
                title: {
                  text: 'Add a date'
                }
              }
            }
          }
        }]
      }
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>ADD / EDIT DATES</Text>
          <Calendar
          onDayPress={(day)=>{
            this.setState({
              day: day.day.toString(),
              month: day.month.toString(),
              year: day.year.toString()
          }, () => {
              this.showModal();
          });
            }}>
          </Calendar>
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
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
