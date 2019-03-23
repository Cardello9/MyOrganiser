/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage'

//var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

const getRulesAccepted = async () => {
  let rulesAccepted = '';
  try {
    rulesAccepted = await AsyncStorage.getItem('rulesAccepted') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

  return rulesAccepted;
};

const removeItem = async () => {
  try {
    await AsyncStorage.removeItem('rulesAccepted');
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

  return rulesAccepted;
};

const saveQuestions = async (questions) => {
  try {
    await AsyncStorage.setItem('questions', questions);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

const saveUpdateTime = async (updateTime) => {
  try {
    await AsyncStorage.setItem('updateTime', updateTime);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

const getUpdateTime = async () => {
  let updateTime = '';
  try {
    updateTime = await AsyncStorage.getItem('updateTime') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

  return updateTime;
};

const saveTests = async (tests) => {
  try {
    await AsyncStorage.setItem('tests', tests);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};

let DB;
const getDB = () => DB ? DB : DB = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

var indexInterval = 0;


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      'rAcc': 'none'
    };


    //let db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});
/*
    db.transaction((tx) => {
      tx.executeSql("select questions from questions;"), (tx, results) => {
        alert(results);
      };
      alert("test");
    });
    */

    //this.getAllTests(db).then((value) => alert(value));
    //alert(this.testsJSON);
    //alert(this.testsJSON.toString());

    var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT questions FROM questions;",
        [],
        function(tx, res) {
          //alert(res.rows.item(0).questions);
          saveQuestions(res.rows.item(0).questions);
        }
      );
    });


  }

  getTestsAsync() {
    return fetch('https://pwsz-quiz-api.herokuapp.com/api/tests')
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(JSON.stringify(responseJson));

        var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

        /*
    db.transaction(function(txn) {
      txn.executeSql(
        "UPDATE tests SET tests = '" + JSON.stringify(responseJson) + "';"
      );
    });
    */

   var today = new Date();
   var yyyy = today.getFullYear();
   var mm = today.getMonth() + 1;
   var dd = today.getDate() + 1;
   var date = yyyy + '-' + mm + '-' + dd;

   if (date != getUpdateTime()) {
    const query1 = `UPDATE tests SET tests = '${JSON.stringify(responseJson)}';`;
    db.executeSql(query1);
  
    
    for(var i=0;i<responseJson.length;i++) {
      //j = i-1;
      //alert(JSON.stringify(responseJson[i]));
      this.getTestsDetailsAsync(responseJson[i].id, i);
      //setTimeout(this.getTestsDetailsAsync, 5000, responseJson[i].id, i);
      //alert("5 sec passed");
    }
    

   //this.getTestsDetailsAsync(responseJson[0].id, 0).then(this.getTestsDetailsAsync(responseJson[1].id, 1)).then(this.getTestsDetailsAsync(responseJson[2].id, 2)).then(this.getTestsDetailsAsync(responseJson[3].id, 3));


    saveUpdateTime(date);
   }

        return responseJson;
      })
      .catch((error) => {
        alert(error);
      });
  }


  getTestsDetailsAsync(id, number) {
    return fetch('https://pwsz-quiz-api.herokuapp.com/api/test/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        //alert("id :" + id + " number: " + number + JSON.stringify(responseJson));

        //var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});
        var db = SQLite.openDatabase({name: 'md.db'});

        var stringifiedJson = JSON.stringify(responseJson);
     
       /*
    db.transaction(function(txn) {
      txn.executeSql(
        `UPDATE testsDetails SET details = '${stringifiedJson}' WHERE id = ${number};`
      );
    });
     */
/*
    db.transaction(function(tx) {
      tx.executeSql('UPDATE testsDetails SET details = ? WHERE id = ?;', 
      [stringifiedJson, number], 
      (tx, results) => {alert("success");}
    }
*/
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE testsDetails SET details = ? WHERE id = ?;',
        [stringifiedJson, number],
        (tx, results) => {
          //alert("success");
        }
      );
    });
   
   
    //const query2 = `UPDATE testsDetails SET details = '${JSON.stringify(responseJson)}' WHERE id = ${number};`;
      //const query2 = `UPDATE testsDetails SET details = '${stringifiedJson}' WHERE id = ${number};`;
    //alert(query2);
      //db.executeSql(query2);

        return responseJson;

       

      })
      .catch((error) => {
        alert(error);
      });
  }



  componentDidMount() {
    getRulesAccepted().then((value) => this.setState({ 'rAcc': value }));
    this.getTestsAsync();
    /*
    .then((valueJson) => {
      //var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      for(var i=0;i<valueJson.length;i++) {
        //j = i-1;
        //alert(JSON.stringify(responseJson[i]));
        this.getTestsDetailsAsync(valueJson[i].id, i);
        //setTimeout(this.getTestsDetailsAsync, 5000, responseJson[i].id, i);
        //alert("5 sec passed");
      }

    });
    */
   //this.goToScreen('rules-screen');

    //getDB();
    //this.getAllTests(getDB());
    
  }

  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })

  }


  getAllTests(DB) {
    //var db = SQLite.openDatabase({name: 'md.db', createFromLocation: "~md.db"});
    const query = "SELECT questions FROM questions;";
    return DB.executeSql(query).then(([results]) => {
      return JSON.parse(results.rows.item(0).questios || '{}');
      //return (results.rows.item(0).data || '{}');
    });
  };




  render() {
    return (
      <View style={styles.container}>

      <View style={styles.buttonView}>
        <Text style={styles.welcome}>1: zagadki matematyczne</Text>
        <Button title='Test 1' onPress={() => this.goToScreen('testDB1-screen')}></Button>
        </View>

        <View style={styles.buttonView}>
        <Text style={styles.welcome}>2: moda na sukces</Text>
        <Button title='Test 2' onPress={() => this.goToScreen('testDB2-screen')}></Button>
        </View>

        <View style={styles.buttonView}>
        <Text style={styles.welcome}>3: tranzystor bipolarny i polowy</Text>
        <Button title='Test 3' onPress={() => this.goToScreen('testDB3-screen')}></Button>
        </View>

        <View style={styles.buttonView}>
        <Text style={styles.welcome}>4: wodzowie i dowodcy starozytnego Rzymu</Text>
        <Button title='Test 4' onPress={() => this.goToScreen('testDB4-screen')}></Button>
        </View>

<View style={styles.buttonView}>
        <Text style={styles.welcome}>get to know your results:</Text>
        <Button title='Results' onPress={() => this.goToScreen('results-screen')}></Button>
        </View>
        <Text style={styles.welcome}>I want to see the rules screen again!</Text>
        <Button title='I disagree with the rules' onPress={() => removeItem()}></Button>
        <Text style={styles.welcome}>Go to settings:</Text>
        <Button title='Settings' onPress={() => this.goToScreen('settings-screen')}></Button>
      </View>
    );
  }

}

//<Text style={styles.welcome}>{this.state.Questions}</Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
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
  buttonView: {
  }
});
