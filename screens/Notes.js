/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default class Notes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      note1Name: "",
      note2Name: "",
      note3Name: "",
      note4Name: "",
      note5Name: "",
      note6Name: "",
      note7Name: "",
      note8Name: "",
      note9Name: "",
      note10Name: "",
      note1Desc: "",
      note2Desc: "",
      note3Desc: "",
      note4Desc: "",
      note5Desc: "",
      note6Desc: "",
      note7Desc: "",
      note8Desc: "",
      note9Desc: "",
      note10Desc: ""
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  fetchData() {
    var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

    var that = this;

    db.transaction(function(tx) {
      tx.executeSql(
        "SELECT * FROM notes;",
        [],
        function (tx, results) {
         that.setState({note1Name: results.rows.item(0).name});
         that.setState({note1Desc: results.rows.item(0).description});

         that.setState({note2Name: results.rows.item(1).name});
         that.setState({note2Desc: results.rows.item(1).description});

         that.setState({note3Name: results.rows.item(2).name});
         that.setState({note3Desc: results.rows.item(2).description});

         that.setState({note4Name: results.rows.item(3).name});
         that.setState({note4Desc: results.rows.item(3).description});

         that.setState({note5Name: results.rows.item(4).name});
         that.setState({note5Desc: results.rows.item(4).description});

         that.setState({note6Name: results.rows.item(5).name});
         that.setState({note6Desc: results.rows.item(5).description});

         that.setState({note7Name: results.rows.item(6).name});
         that.setState({note7Desc: results.rows.item(6).description});

         that.setState({note8Name: results.rows.item(7).name});
         that.setState({note8Desc: results.rows.item(7).description});

         that.setState({note9Name: results.rows.item(8).name});
         that.setState({note9Desc: results.rows.item(8).description});

         that.setState({note10Name: results.rows.item(9).name});
         that.setState({note10Desc: results.rows.item(9).description});
          }
      );
    });

    this.setState({refreshing: false});
  }

    _onRefresh = () => {
      this.setState({refreshing: true});
      this.fetchData();
    }

    showNote = (id) => {
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

    var that = this;

    db.transaction(function(tx) {
      tx.executeSql(
        "SELECT * FROM notes WHERE id = ?;",
        [id],
        function (tx, results) {
         alert(results.rows.item(0).name + "\n\n" + results.rows.item(0).description);
          }
      );
    });


      alert(this.state.note1Name + "\n\n" + this.state.note1Desc);
    }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>VIEW NOTES</Text>
            <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("1")}>
                  <Text style={styles.instructions}>1.</Text>
                  <Text style={styles.instructions}>{this.state.note1Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("2")}>
                  <Text style={styles.instructions}>2.</Text>
                  <Text style={styles.instructions}>{this.state.note2Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("3")}>
                  <Text style={styles.instructions}>3.</Text>
                  <Text style={styles.instructions}>{this.state.note3Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("4")}>
                  <Text style={styles.instructions}>4.</Text>
                  <Text style={styles.instructions}>{this.state.note4Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("5")}>
                  <Text style={styles.instructions}>5.</Text>
                  <Text style={styles.instructions}>{this.state.note5Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("6")}>
                  <Text style={styles.instructions}>6.</Text>
                  <Text style={styles.instructions}>{this.state.note6Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("7")}>
                  <Text style={styles.instructions}>7.</Text>
                  <Text style={styles.instructions}>{this.state.note7Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("8")}>
                  <Text style={styles.instructions}>8.</Text>
                  <Text style={styles.instructions}>{this.state.note8Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("9")}>
                  <Text style={styles.instructions}>9.</Text>
                  <Text style={styles.instructions}>{this.state.note9Name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showNote("10")}>
                  <Text style={styles.instructions}>10.</Text>
                  <Text style={styles.instructions}>{this.state.note10Name}</Text>
                </TouchableOpacity>
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
    fontSize: 20,
    fontFamily: "Merriweather-Regular",
    textAlign: 'center',
    color: '#333333',
    marginTop: 5
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
