/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { App } from '../App';
import SQLite from 'react-native-sqlite-storage';

export default class Devices extends Component {

    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
          numDevices: 0,
          deviceName1: "+",
          devicePlace1: "",
          deviceName2: "+",
          devicePlace2: "",
          deviceName3: "+",
          devicePlace3: "",
          deviceName4: "+",
          devicePlace4: "",
          deviceName5: "+",
          devicePlace5: "",
          deviceName6: "+",
          devicePlace6: ""
        }

    }

    componentDidMount() {
      this._onRefresh();
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
            //alert(that.state.numDevices2);
          }
        );
      });

      alert("deleted devices");
    }

    fetchData() {
      //alert("test");
      //var db = SQLite.openDatabase({name: 'md.db'});
      var db = SQLite.openDatabase({name: 'md.db', createFromLocation: 1});

      var that = this;

      db.transaction(function(tx) {
        tx.executeSql(
          "SELECT * FROM devices;",
          [],
          function (tx, results) {
            //alert(results.rows.item(0).no);
            //alert(results.rows.item(0).name);
            //alert(results.rows.item(0).command);

            /*
            this.setState({
              deviceName1: results.rows.item(0).name,
              devicePlace1: results.rows.item(0).place
            });
            */

           that.setState({deviceName1: results.rows.item(0).name});
           that.setState({devicePlace1: results.rows.item(0).place});

           that.setState({deviceName2: results.rows.item(1).name});
           that.setState({devicePlace2: results.rows.item(1).place});

           that.setState({deviceName3: results.rows.item(2).name});
           that.setState({devicePlace3: results.rows.item(2).place});

           that.setState({deviceName4: results.rows.item(3).name});
           that.setState({devicePlace4: results.rows.item(3).place});

           that.setState({deviceName5: results.rows.item(4).name});
           that.setState({devicePlace5: results.rows.item(4).place});

           that.setState({deviceName6: results.rows.item(5).name});
           that.setState({devicePlace6: results.rows.item(5).place});
            //alert("success");

            }
        );
      });

      db.transaction(function(tx) {
        tx.executeSql(
          "SELECT no FROM devices WHERE no = (SELECT MAX(no) FROM devices);",
          [],
          function (tx, results) {
            alert("Number of devices: " + results.rows.item(0).no);
            that.setState({numDevices: results.rows.item(0).no});
          }
        );
      });

      this.setState({refreshing: false});

    }


    _onRefresh = () => {
      this.setState({refreshing: true});

      this.fetchData();
      /*
      fetchData().then(() => {
        this.setState({refreshing: false});
      });
*/
      //this.setState({refreshing: false});

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

    static testAlert() {
      alert("HELLO WORLD");
    }

    showModal() {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'ModalScreen',
            passProps: {
              text: 'stack with one child'
            },
            options: {
              topBar: {
                title: {
                  text: 'Add a device'
                }
              }
            }
          }
        }]
      }
    });
  }

  showModalEdit(deviceID) {
  Navigation.showModal({
    stack: {
      children: [{
        component: {
          name: 'ModalEdit',
          passProps: {
            text: 'stack with one child',
            deviceID: deviceID
          },
          options: {
            topBar: {
              title: {
                text: 'Edit a device'
              }
            }
          }
        }
      }]
    }
  });
}

  render() {
    if(this.state.numDevices == 0) {
          return (
            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <View style={styles.container}>
              <View style={styles.nextRow}>

                <TouchableOpacity style={styles.button1} onPress={this.showModal}>
                  <Text style={styles.textButton1}>+</Text>
                  <Text style={styles.textButton2}></Text>
                </TouchableOpacity>

              </View>
            </View>
            </ScrollView>
          );
          }

          else if(this.state.numDevices == 1) {
            return (
              <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }>
              <View style={styles.container}>
                <View style={styles.nextRow}>

                  <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(1)}}>
                    <Text style={styles.textButton1}>{this.state.deviceName1}</Text>
                    <Text style={styles.textButton2}>{this.state.devicePlace1}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button1} onPress={this.showModal}>
                    <Text style={styles.textButton1}>+</Text>
                    <Text style={styles.textButton2}></Text>
                  </TouchableOpacity>

                </View>
              </View>
              </ScrollView>
            );
            }

            else if(this.state.numDevices == 2) {
              return (
                <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                <View style={styles.container}>
                  <View style={styles.nextRow}>

                    <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(1)}}>
                      <Text style={styles.textButton1}>{this.state.deviceName1}</Text>
                      <Text style={styles.textButton2}>{this.state.devicePlace1}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(2)}}>
                      <Text style={styles.textButton1}>{this.state.deviceName2}</Text>
                      <Text style={styles.textButton2}>{this.state.devicePlace2}</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={styles.nextRow}>

                    <TouchableOpacity style={styles.button1} onPress={this.showModal}>
                      <Text style={styles.textButton1}>+</Text>
                      <Text style={styles.textButton2}></Text>
                    </TouchableOpacity>

                  </View>
                </View>


                </ScrollView>
              );
              }

            else if(this.state.numDevices == 3) {
              return (
                <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }>
                <View style={styles.container}>
                  <View style={styles.nextRow}>

                    <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(1)}}>
                      <Text style={styles.textButton1}>{this.state.deviceName1}</Text>
                      <Text style={styles.textButton2}>{this.state.devicePlace1}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(2)}}>
                      <Text style={styles.textButton1}>{this.state.deviceName2}</Text>
                      <Text style={styles.textButton2}>{this.state.devicePlace2}</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={styles.nextRow}>

                    <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(3)}}>
                      <Text style={styles.textButton1}>{this.state.deviceName3}</Text>
                      <Text style={styles.textButton2}>{this.state.devicePlace3}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button1} onPress={this.showModal}>
                      <Text style={styles.textButton1}>+</Text>
                      <Text style={styles.textButton2}></Text>
                    </TouchableOpacity>

                  </View>
                </View>


                </ScrollView>
              );
              }
              else if(this.state.numDevices == 4) {
                return (
                  <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                  <View style={styles.container}>
                    <View style={styles.nextRow}>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(1)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName1}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace1}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(2)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName2}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace2}</Text>
                      </TouchableOpacity>

                    </View>

                    <View style={styles.nextRow}>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(3)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName3}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace3}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(4)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName4}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace4}</Text>
                      </TouchableOpacity>

                    </View>

                    <View style={styles.nextRow}>

                      <TouchableOpacity style={styles.button1} onPress={this.showModal}>
                        <Text style={styles.textButton1}>+</Text>
                        <Text style={styles.textButton2}></Text>
                      </TouchableOpacity>

                    </View>
                  </View>


                  </ScrollView>
                );
                }
              else if(this.state.numDevices == 5) {
                return (
                  <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                  <View style={styles.container}>
                    <View style={styles.nextRow}>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(1)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName1}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace1}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(2)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName2}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace2}</Text>
                      </TouchableOpacity>

                    </View>

                    <View style={styles.nextRow}>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(3)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName3}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace3}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(4)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName4}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace4}</Text>
                      </TouchableOpacity>

                    </View>

                    <View style={styles.nextRow}>

                      <TouchableOpacity style={styles.button1} onPress={() => {this.showModalEdit(5)}}>
                        <Text style={styles.textButton1}>{this.state.deviceName5}</Text>
                        <Text style={styles.textButton2}>{this.state.devicePlace5}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button1} onPress={this.deleteDevices}>
                        <Text style={styles.textButton1}>-</Text>
                        <Text style={styles.textButton2}>delete devices</Text>
                      </TouchableOpacity>

                    </View>
                  </View>


                  </ScrollView>
                );
                }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff9021',
    margin: 10
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
  textButton1: {
    fontFamily: "Merriweather-Regular",
    fontSize: 30,
    textAlign: 'center',
    marginTop: 35
  },
  textButton2: {
    fontFamily: "Merriweather-Regular",
    fontSize: 20,
    textAlign: 'center',
    marginTop: 0
  },
  button1: {
    width: 150,
    height: 150,
    backgroundColor: '#ffc421',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  nextRow: {
    flexDirection: 'row'
}
});
