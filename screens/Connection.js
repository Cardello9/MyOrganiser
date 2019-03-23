/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ListView, RefreshControl, TouchableOpacity, AsyncStorage} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { App } from '../App';
import { BleManager } from 'react-native-ble-plx';


export default class Connection extends Component {

    constructor(props) {
        super(props);
        this.manager = new BleManager();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        const myDevices = [{
          name: 'Device1'
        }];

        this.state = {
          refreshing: false,
          dataSource: ds.cloneWithRows([JSON.stringify(myDevices)]),
          //dataSourceJSON: ds.cloneWithRows([results[0].nick, results[0].score, results[0].total, results[0].type, results[0].date, results[0].id])
          dataSourceJSON: ds
    };
    }

    componentDidMount() {
      //this._onRefresh();
  }

    checkBluetoothState() {
      console.log("Check BT state");
      const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          this.scanAndConnect();
          subscription.remove();
        } else {
          alert("bluetooth not powered on");
        }

      }, true);
    }

    scanAndConnect() {
      console.log("Scan and connect");
      this.manager.startDeviceScan(null, null, (error, device) => {
        console.log(device);
        if (error) {
          alert('error', error);
          return
        }
        //alert(device);
        if(device.name === 'MLT-BT05') {
          this.manager.stopDeviceScan();
          console.log(device);
          return device.connect().then((device) => {
            return device.discoverAllServicesAndCharacteristics();
            }).then((characteristics) => {
              const device = {
                id: characteristics.id,
                serviceUUID: 'FFE0',
                characteristicsUUID: 'FFE1'
              };
              return AsyncStorage.setItem('device', JSON.stringify(deivce)).then(()=> {
                /*
                Navigation.mergeOptions('Devices', {
                  bottomTab: {
                    badge: '+',
                  },
                  bottomTabs: {
                    currentTabId: 'Devices'
                  }
                  });
                  */
                });
              /* WAZNA CZESC KODU !!!
              return this.manager.writeCharacteristicWithResponseForDevice(
                device.id, device.serviceUUID, device.characteristicsUUID, btoa("red")
                ).then(response => {
                  console.log('response', response);
                  })
                  */
              }).catch((error) => {
                console.log('Error', error);
                });
        }
      });
    }

    changeDevice(command) {
      AsyncStorage.getItem('device').then(device => {
        device = JSON.parse(device);
        if (device) {
          return this.manager.writeCharacteristicWithResponseForDevice(
            device.id, device.serviceUUID, device.characteristicsUUID, btoa(command)
            ).then(response => {
              console.log('response', response);
              }).catch((error) => {
                console.log('Error', error);
                alert('Error', error);
                });
        }
        });
    }

    _onRefresh = () => {
      this.setState({refreshing: true});
      /*
      fetchData().then(() => {
        this.setState({refreshing: false});
      });
      */
      //this.getResultsAsync().then((value) => this.setState({dataSource: ds.cloneWithRows([JSON.stringify(value)])}));
      this.checkBluetoothState();
      this.setState({refreshing: false});
  }


  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to CONNECTION SCREEN!</Text>
<TouchableOpacity style={styles.button1} onPress={() => {this.checkBluetoothState()}}>
  <Text style={styles.welcome}>device scan</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button1} onPress={() => {this.changeDevice("blue")}}>
  <Text style={styles.welcome}>change device</Text>
</TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9021',
  },
  button1: {
    width: 200,
    height: 50,
    backgroundColor: '#ffc421',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
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
});
