import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button, AsyncStorage } from 'react-native';
import {Navigation} from 'react-native-navigation';

export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.Questions[0].title,
            correctAnswer: this.props.Questions[0].correctAnswer,
            goodAnswers: 0
        };
        this.index = 0;
        this.questionLen = this.props.Questions.length;
        }

        saveLastScore = async () => {
            try {
              await AsyncStorage.setItem('lastScore', this.state.goodAnswers.toString());
              await AsyncStorage.setItem('lastTotal', this.questionLen.toString());
            } catch (error) {
              // Error retrieving data
              alert(error.message);
            }
          };


        nextQuestion() {
                this.index += 1;
                if(this.index == this.questionLen) {

                    this.saveLastScore().then(Navigation.pop('MAIN_STACK', {
                      component: {
                        name: 'test-screen'
                      }
                    })).then(Navigation.push('MAIN_STACK', {
                      component: {
                        name: 'single-result-screen'
                      }
                    }));

                    /*
                    Navigation.pop('MAIN_STACK', {
                        component: {
                          name: 'test-screen'
                        }
                      });
                      Navigation.push('MAIN_STACK', {
                        component: {
                          name: 'single-result-screen'
                        }
                      });
                      */
                      //return;
                } else {
                this.setState({
                    title: this.props.Questions[this.index].title,
                    correctAnswer: this.props.Questions[this.index].correctAnswer
                });
              }
            }


        giveAnswer(option) {
            if(option == this.state.correctAnswer) {
                alert("GOOD ANSWER!");
                this.setState({
                    goodAnswers: this.state.goodAnswers + 1
                }, () => {
                  this.nextQuestion();
              });
            }
            else {
                alert("BAD ANSWER!");
                this.nextQuestion();
            }
            //this.saveLastScore().then(this.nextQuestion());
            //this.nextQuestion();
        }

    render() {
      return (
          <View style = {styles.container}>

          <Text style={styles.blackText}>{this.state.title}</Text>

<View style={styles.view1}>
          <Button title="Answer A" onPress={() => this.giveAnswer('A')}></Button>
          <Button title="Answer B" onPress={() => this.giveAnswer('B')}></Button>
          <Button title="Answer C" onPress={() => this.giveAnswer('C')}></Button>
          <Button title="Answer D" onPress={() => this.giveAnswer('D')}></Button>
          </View>

          <Text style={styles.blackText}>SCORE: {this.state.goodAnswers} / {this.questionLen}</Text>

        </View>
      );
    }
  }

export default Question;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#ADD8E6',
        },
        nextRow: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#F5FCFF',
        },
        grayButton: {
            flex: 1,
            flexGrow: 1,
            backgroundColor: '#A9A9A9',
            borderWidth: 1,
            borderColor: '#000000'
        },
        blueButton: {
          flex: 1,
          flexGrow: 1,
          backgroundColor: '#0000e5',
          borderWidth: 1,
          borderColor: '#000000'
      },
        blackText: {
          fontFamily: "PT_Sans-Web-Regular",
          fontSize: 25,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: '#000000',
        },
        view1: {
          margin: 10

        }
      });
