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
import { Navigation } from 'react-native-navigation';

export default class AddNote extends Component {

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

    showModal = (id, name, description) => {
      Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: 'EditNoteModal',
              passProps: {
                id: id,
                name: name,
                description: description
              },
              options: {
                topBar: {
                  title: {
                    text: 'Edit a note'
                  }
                }
              }
            }
          }]
        }
      });
    }

    showModalDelete = (id) => {
      Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: 'DeleteNoteModal',
              passProps: {
                id: id
              },
              options: {
                topBar: {
                  title: {
                    text: 'Delete a modal'
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
          <Text style={styles.welcome}>ADD / EDIT NOTES</Text>
          <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('1', this.state.note1Name, this.state.note1Desc)}}>
                    <Text style={styles.instructions2}>1.</Text>
                    <Text style={styles.instructions2}>{this.state.note1Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('1')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('2', this.state.note2Name, this.state.note2Desc)}}>
                    <Text style={styles.instructions2}>2.</Text>
                    <Text style={styles.instructions2}>{this.state.note2Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('2')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('3', this.state.note3Name, this.state.note3Desc)}}>
                    <Text style={styles.instructions2}>3.</Text>
                    <Text style={styles.instructions2}>{this.state.note3Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('3')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('4', this.state.note4Name, this.state.note4Desc)}}>
                    <Text style={styles.instructions2}>4.</Text>
                    <Text style={styles.instructions2}>{this.state.note4Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('4')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('5', this.state.note5Name, this.state.note5Desc)}}>
                    <Text style={styles.instructions2}>5.</Text>
                    <Text style={styles.instructions2}>{this.state.note5Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('5')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('6', this.state.note6Name, this.state.note6Desc)}}>
                    <Text style={styles.instructions2}>6.</Text>
                    <Text style={styles.instructions2}>{this.state.note6Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('6')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('7', this.state.note7Name, this.state.note7Desc)}}>
                    <Text style={styles.instructions2}>7.</Text>
                    <Text style={styles.instructions2}>{this.state.note7Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('7')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('8', this.state.note8Name, this.state.note8Desc)}}>
                    <Text style={styles.instructions2}>8.</Text>
                    <Text style={styles.instructions2}>{this.state.note8Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('8')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('9', this.state.note9Name, this.state.note9Desc)}}>
                    <Text style={styles.instructions2}>9.</Text>
                    <Text style={styles.instructions2}>{this.state.note9Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('9')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
                </View>
                <View style={styles.nextRow}>
                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModal('10', this.state.note10Name, this.state.note10Desc)}}>
                    <Text style={styles.instructions2}>10.</Text>
                    <Text style={styles.instructions2}>{this.state.note10Name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonDelete} onPress={() => this.showModalDelete('10')}><Text style={styles.instructions}>delete</Text></TouchableOpacity>
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
    fontFamily: "Fresca",
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 15,
    fontFamily: "Lobster",
    textAlign: 'center',
    color: '#333333',
    marginTop: 35
  },
  instructions2: {
    fontSize: 20,
    fontFamily: "Merriweather-Regular",
    textAlign: 'center',
    color: '#333333',
    marginTop: 5
  },
  button1: {
    
    backgroundColor: '#4ba3c7',
    width: 200,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  borderWidth: 1,
  borderColor: '#fff'
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
