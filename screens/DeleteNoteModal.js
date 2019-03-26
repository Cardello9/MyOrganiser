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


export default class DeleteNoteModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          id: this.props.id,
          name: "",
          description: ""
        }
        this.deleteNote = this.deleteNote.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});
  
      var that = this;
  
      db.transaction(function(tx) {
        tx.executeSql(
          "SELECT * FROM notes WHERE id = ?;",
          [that.state.id],
          function (tx, results) {
           that.setState({name: results.rows.item(0).name});
           that.setState({description: results.rows.item(0).description});
            }
        );
      });
    }

    goToScreen = (screenName) => {
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

    deleteNote() {
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      var that = this;

      //alert(this.state.name);

      db.transaction(txn => {
        txn.executeSql(
          "UPDATE notes SET name = ?, description = ? WHERE id = ?",
          ["note " + that.state.id, "description " + that.state.id, that.state.id],
          (tx, res) => {
            alert("success!");
          }
        );
      });

     this.dismissModal();
    }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Are you sure?</Text>
        <Text style={styles.welcome}>id:</Text>
        <Text style={styles.noteData}>{this.state.id}</Text>
        <Text style={styles.welcome}>name:</Text>
        <Text style={styles.noteData}>{this.state.name}</Text>
        <Text style={styles.welcome}>description:</Text>
        <Text style={styles.noteData}>{this.state.description}</Text>
        <TouchableOpacity style={styles.button1} onPress={this.deleteNote}>
                  <Text style={styles.welcome}>delete</Text>
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
  noteData: {
    fontFamily: "Merriweather-Regular",
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
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
