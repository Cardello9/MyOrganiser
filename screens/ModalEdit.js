import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { App } from '../App';
import SQLite from 'react-native-sqlite-storage';


export default class ModalEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "name",
          place: "place",
          command: "command",
          numDevices: 0,
          numDevices2: 0
        }
        this.saveDeviceData = this.saveDeviceData.bind(this);
        this.editDeviceData = this.editDeviceData.bind(this);
        //alert(this.props.deviceID);
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

    editDeviceData() {
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      var that = this;

      //alert(this.state.command);

      //alert(that.state.name + that.state.place + that.state.command + that.props.deviceID);
      

      db.transaction(txn => {
        txn.executeSql(
          "UPDATE devices SET name = ?, place = ?, command = ? WHERE no = ?;",
          [that.state.name, that.state.place, that.state.command, that.props.deviceID],
          (tx, res) => {
            alert("success!");
          }
        );
      });
      this.dismissModal();
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


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>name:</Text>
        <TextInput style={styles.textInput} onChangeText={(text1) => this.setState({name: text1})}></TextInput>
        <Text style={styles.welcome}>place:</Text>
        <TextInput style={styles.textInput} onChangeText={(text2) => this.setState({place: text2})}></TextInput>
        <Text style={styles.welcome}>command:</Text>
        <TextInput style={styles.textInput} onChangeText={(text3) => this.setState({command: text3})}></TextInput>
        <TouchableOpacity style={styles.button1} onPress={this.editDeviceData}>
                  <Text style={styles.welcome}>edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={this.dismissModal}>
                  <Text style={styles.welcome}>cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={this.deleteDevices}>
                  <Text style={styles.welcome}>delete</Text>
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
    backgroundColor: '#ff9021',
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
    backgroundColor: '#ffc421'
  }
});
