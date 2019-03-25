/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { App } from '../App';
import SQLite from 'react-native-sqlite-storage';


export default class AddDateModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id: "1",
          day: this.props.day,
          month: this.props.month,
          year: this.props.year,
          hour: "",
          name: "",
          description: "",
          date: this.props.day + "." + this.props.month + "." + this.props.year
        }
        this.saveDeviceData = this.saveDeviceData.bind(this);
        this.addDate = this.addDate.bind(this);
    }

    goToScreen = (screenName) => {
      /*
      Navigation.push(this.props.componentId, {
        component: {
          name: screenName
        }
      })
*/
/*
      Navigation.showModal({
        component: {
          name: screenName
        }
      });
      */
      Navigation.push('MAIN_STACK', {
        component: {
          name: screenName
        }
      })
    }

    dismissModal() {
      Navigation.dismissAllModals();
    }

    deleteDevices() {
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      var that = this;

      db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM devices WHERE no > 1;",
          //"DELETE FROM devices WHERE name = 'asd';",
          [],
          (tx, results) => {
            that.setState({numDevices: 1});
            that.setState({numDevices2: 2});
            //alert(that.state.numDevices2);
          }
        );
      });

      alert("deleted devices");
    }

    saveDeviceData() {
      //alert(this.state.name + this.state.place + this.state.command);
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      var that = this;

      db.transaction(tx => {
        tx.executeSql(
          'SELECT no FROM devices WHERE no = (SELECT MAX(no) FROM devices);',
          [],
          (tx, results) => {
            //alert("Number of devices: " + results.rows.item(0).no);
            that.setState({numDevices: results.rows.item(0).no});
            //alert(parseInt(parseInt(that.state.numDevices) + 1));
            that.setState({numDevices2: (parseInt(parseInt(that.state.numDevices) + 1))});
            //alert(that.state.numDevices2);
          }
        );
      });

      //var numDevices2 = parseInt(parseInt(that.state.numDevices) + 1);
      //alert(numDevices2);

      db.transaction(txn => {
        txn.executeSql(
          'INSERT INTO devices VALUES (?, ?, ?, ?);',
          [that.state.numDevices2, that.state.name, that.state.place, that.state.command],
          (tx, res) => {
            alert("success!");
          }
        );
      });

/*
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE testsDetails SET details = ? WHERE id = ?;',
          [stringifiedJson, number],
          (tx, results) => {
            //alert("success");
          }
        );
      });
      */
     this.dismissModal();
    }

    addDate() {
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      var that = this;

      //alert(this.state.date);

      db.transaction(txn => {
        txn.executeSql(
          'UPDATE dates SET date = ?, hour = ?, name = ?, description = ? WHERE id = ?;',
          [that.state.date, that.state.hour, that.state.name, that.state.description, that.state.id],
          (tx, res) => {
            alert("success!");
            //alert(that.state.date);
          }
        );
      });
     this.dismissModal();
    }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>id:</Text>
        <TextInput style={styles.textInput} defaultValue={"1"} onChangeText={(textID) => this.setState({id: textID})}></TextInput>
        <Text style={styles.welcome}>date:</Text>
        <TextInput style={styles.textInput} defaultValue={this.state.day + "." + this.state.month + "." + this.state.year} onChangeText={(text1) => this.setState({date: text1})}></TextInput>
        <Text style={styles.welcome}>hour:</Text>
        <TextInput style={styles.textInput} onChangeText={(text2) => this.setState({hour: text2})}></TextInput>
        <Text style={styles.welcome}>name:</Text>
        <TextInput style={styles.textInput} onChangeText={(text3) => this.setState({name: text3})}></TextInput>
        <Text style={styles.welcome}>description:</Text>
        <TextInput style={styles.textInput} onChangeText={(text4) => this.setState({description: text4})}></TextInput>
        <TouchableOpacity style={styles.button1} onPress={this.addDate}>
                  <Text style={styles.welcome}>save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={this.dismissModal}>
                  <Text style={styles.welcome}>cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//<Button color='#fff7b2' title='save'></Button>
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
    textAlign: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#FFFFFF'
  },
  button1: {
    width: 75,
    height: 30,
    backgroundColor: '#4ba3c7',
    marginTop: 10,
    marginBottom: 10
  }
});
