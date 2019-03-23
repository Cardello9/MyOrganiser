/** @format */

import {Navigation} from "react-native-navigation";
import { Dimensions } from 'react-native'
import App from './App';

import Connection from './screens/Connection';
import Devices from './screens/Devices';
import Modal from './screens/Modal';
import ModalEdit from './screens/ModalEdit';

import Dates from './screens/Dates';
import Notes from './screens/Notes';

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

Navigation.registerComponent('Devices', () => Devices);
Navigation.registerComponent('Connection', () => Connection);
Navigation.registerComponent('ModalScreen', () => Modal);
Navigation.registerComponent('ModalEdit', () => ModalEdit);

Navigation.registerComponent('Dates', () => Dates);
Navigation.registerComponent('Notes', () => Notes);

//Navigation.registerComponent('Devices', () => require('./screens/Devices').default);
//Navigation.registerComponent('Connection', () => require('./screens/Connection').default);

const { width } = Dimensions.get('window');

var React = require('react-native');
var SQLite = require('react-native-sqlite-storage')

/*
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'navigation.playground.WelcomeScreen'
      }
    },
  });
});
*/

Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'Dates',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'dates',
                icon: require('./add.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Notes',
            options: {
              bottomTab: {
                text: 'notes',
                fontSize: 12,
                icon: require('./add.png')
                //icon: require('./signup.png')
              }
            }
          },
        },
      ],
    }
  }
});
// */
/*
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [
          {
            component: {
              name: "navigation.playground.WelcomeScreen"
            },
          },
        ]
      }
    }
  });
});
*/


/*
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    topBar: {
      elevation: 0,
      visible: false,
      drawBehind: true,
      animate: false,
      buttonColor: 'white',
      title: {
        color: 'white',
        alignment: 'center'
      },
      background: {
        color: 'transparent'
      }
    }
  });
  */
  /*
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'drawerId',
            name: 'Drawer',
            fixedWidth: width
          }
        },
        center: {
          stack: {
            id: 'MAIN_STACK',
            children: [
              {
                component: {
                  name: 'navigation.playground.WelcomeScreen'
                }
              },
            ]
          }
        }
      },
    }
  });

*/
 /*
bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Home',
                  options: {
                    topBar: {
                      backButton: {
                        title: 'Back',
                      },
                      title: {
                        text: 'Home'
                      }
                    },
                    bottomTab: {
                      fontSize: 12,
                      text: 'Home',
                      icon: require('./src/assets/home.png'),
                      selectedIcon: require('./src/assets/home_active.png')
                    },
                  },
                },
              }
            ]
          }
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: 'Booking',
                  options: {
                    topBar: {
                      title: {
                        text: 'Booking'
                      }
                    },
                    bottomTab: {
                      text: 'Booking',
                      fontSize: 12,
                      icon: require('./src/assets/booking.png'),
                      selectedIcon: require('./src/assets/booking_active.png')
                    }
                  }
                },
              }
            ],
          },
        },
      ],
    },
    */
