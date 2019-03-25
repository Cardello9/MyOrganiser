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

export default class Dates extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      date1Date: "",
      date1Hour: "",
      date1Name: "",
      date1Desc: "",
      date2Date: "",
      date2Hour: "",
      date2Name: "",
      date2Desc: "",
      date3Date: "",
      date3Hour: "",
      date3Name: "",
      date3Desc: "",
      date4Date: "",
      date4Hour: "",
      date4Name: "",
      date4Desc: "",
      date5Date: "",
      date5Hour: "",
      date5Name: "",
      date5Desc: "",
      date6Date: "",
      date6Hour: "",
      date6Name: "",
      date6Desc: "",
      date7Date: "",
      date7Hour: "",
      date7Name: "",
      date7Desc: "",
      date8Date: "",
      date8Hour: "",
      date8Name: "",
      date8Desc: "",
      date9Date: "",
      date9Hour: "",
      date9Name: "",
      date9Desc: "",
      date10Date: "",
      date10Hour: "",
      date10Name: "",
      date10Desc: "",
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  showDate = (id) => {
    var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

  var that = this;

  db.transaction(function(tx) {
    tx.executeSql(
      "SELECT * FROM dates WHERE id = ?;",
      [id],
      function (tx, results) {
       alert(results.rows.item(0).date + "\n\n" + 
       results.rows.item(0).hour + "\n\n" + 
       results.rows.item(0).name + "\n\n" +
       results.rows.item(0).description);
        }
    );
  });


    alert(this.state.note1Name + "\n\n" + this.state.note1Desc);
  }

  fetchData() {
    var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

    var that = this;

  

    db.transaction(function(tx) {
      tx.executeSql(
        "SELECT * FROM dates;",
        [],
        function (tx, results) {
          that.setState({date1Date: results.rows.item(0).date});
          that.setState({date1Hour: results.rows.item(0).hour});
          that.setState({date1Name: results.rows.item(0).name});
          that.setState({date1Desc: results.rows.item(0).description});

          that.setState({date2Date: results.rows.item(1).date});
          that.setState({date2Hour: results.rows.item(1).hour});
          that.setState({date2Name: results.rows.item(1).name});
          that.setState({date2Desc: results.rows.item(1).description});

          that.setState({date3Date: results.rows.item(2).date});
          that.setState({date3Hour: results.rows.item(2).hour});
          that.setState({date3Name: results.rows.item(2).name});
          that.setState({date3Desc: results.rows.item(2).description});

          that.setState({date4Date: results.rows.item(3).date});
          that.setState({date4Hour: results.rows.item(3).hour});
          that.setState({date4Name: results.rows.item(3).name});
          that.setState({date4Desc: results.rows.item(3).description});

          that.setState({date5Date: results.rows.item(4).date});
          that.setState({date5Hour: results.rows.item(4).hour});
          that.setState({date5Name: results.rows.item(4).name});
          that.setState({date5Desc: results.rows.item(4).description});

          that.setState({date6Date: results.rows.item(5).date});
          that.setState({date6Hour: results.rows.item(5).hour});
          that.setState({date6Name: results.rows.item(5).name});
          that.setState({date6Desc: results.rows.item(5).description});

          that.setState({date7Date: results.rows.item(6).date});
          that.setState({date7Hour: results.rows.item(6).hour});
          that.setState({date7Name: results.rows.item(6).name});
          that.setState({date7Desc: results.rows.item(6).description});

          that.setState({date8Date: results.rows.item(7).date});
          that.setState({date8Hour: results.rows.item(7).hour});
          that.setState({date8Name: results.rows.item(7).name});
          that.setState({date8Desc: results.rows.item(7).description});

          that.setState({date9Date: results.rows.item(8).date});
          that.setState({date9Hour: results.rows.item(8).hour});
          that.setState({date9Name: results.rows.item(8).name});
          that.setState({date9Desc: results.rows.item(8).description});

          that.setState({date10Date: results.rows.item(9).date});
          that.setState({date10Hour: results.rows.item(9).hour});
          that.setState({date10Name: results.rows.item(9).name});
          that.setState({date10Desc: results.rows.item(9).description});
          }
      );
    });

    this.setState({refreshing: false});
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
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
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('1')}>
                  <Text style={styles.instructions}>1.</Text>
                  <Text style={styles.instructions}>{this.state.date1Name}</Text>
                  <Text style={styles.instructions}>{this.state.date1Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('2')}>
                  <Text style={styles.instructions}>2.</Text>
                  <Text style={styles.instructions}>{this.state.date2Name}</Text>
                  <Text style={styles.instructions}>{this.state.date2Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('3')}>
                  <Text style={styles.instructions}>3.</Text>
                  <Text style={styles.instructions}>{this.state.date3Name}</Text>
                  <Text style={styles.instructions}>{this.state.date3Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('4')}>
                  <Text style={styles.instructions}>4.</Text>
                  <Text style={styles.instructions}>{this.state.date4Name}</Text>
                  <Text style={styles.instructions}>{this.state.date4Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('5')}>
                  <Text style={styles.instructions}>5.</Text>
                  <Text style={styles.instructions}>{this.state.date5Name}</Text>
                  <Text style={styles.instructions}>{this.state.date5Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('6')}>
                  <Text style={styles.instructions}>6.</Text>
                  <Text style={styles.instructions}>{this.state.date6Name}</Text>
                  <Text style={styles.instructions}>{this.state.date6Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('7')}>
                  <Text style={styles.instructions}>7.</Text>
                  <Text style={styles.instructions}>{this.state.date7Name}</Text>
                  <Text style={styles.instructions}>{this.state.date7Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('8')}>
                  <Text style={styles.instructions}>8.</Text>
                  <Text style={styles.instructions}>{this.state.date8Name}</Text>
                  <Text style={styles.instructions}>{this.state.date8Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('9')}>
                  <Text style={styles.instructions}>9.</Text>
                  <Text style={styles.instructions}>{this.state.date9Name}</Text>
                  <Text style={styles.instructions}>{this.state.date9Date}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={()=>this.showDate('10')}>
                  <Text style={styles.instructions}>10.</Text>
                  <Text style={styles.instructions}>{this.state.date10Name}</Text>
                  <Text style={styles.instructions}>{this.state.date10Date}</Text>
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
