import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Button, AsyncStorage } from 'react-native';
import {Navigation} from 'react-native-navigation';

export class QuestionDB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainTitle: this.props.Questions.name,
            title: this.props.Questions.tasks[0].question,
            answerA: this.props.Questions.tasks[0].answers[0].content,
            answerB: this.props.Questions.tasks[0].answers[1].content,
            answerC: this.props.Questions.tasks[0].answers[2].content,

            ACorrect: this.props.Questions.tasks[0].answers[0].isCorrect,
            BCorrect: this.props.Questions.tasks[0].answers[1].isCorrect,
            CCorrect: this.props.Questions.tasks[0].answers[2].isCorrect,

            goodAnswers: 0
        };
        this.index = 0;
        this.questionLen = this.props.Questions.tasks.length;
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
                    title: this.props.Questions.tasks[this.index].question,
                    answerA: this.props.Questions.tasks[this.index].answers[0].content,
                    answerB: this.props.Questions.tasks[this.index].answers[1].content,
                    answerC: this.props.Questions.tasks[this.index].answers[2].content,
                    ACorrect: this.props.Questions.tasks[this.index].answers[0].isCorrect,
                    BCorrect: this.props.Questions.tasks[this.index].answers[1].isCorrect,
                    CCorrect: this.props.Questions.tasks[this.index].answers[2].isCorrect,
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

        giveAnswerA() {
            if(this.state.ACorrect == true) {
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
        }

        giveAnswerB() {
            if(this.state.BCorrect == true) {
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
        }

        giveAnswerC() {
            if(this.state.CCorrect == true) {
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
        }


    render() {
      return (
          <View style = {styles.container}>

          <Text style={styles.blackText}>{this.state.mainTitle}</Text>

          <Text style={styles.blackText}>{this.state.title}</Text>

<View style={styles.view1}>
          <Button title={this.state.answerA} onPress={() => this.giveAnswerA()}></Button>
          <Button title={this.state.answerB} onPress={() => this.giveAnswerB()}></Button>
          <Button title={this.state.answerC} onPress={() => this.giveAnswerC()}></Button>
          </View>

          <Text style={styles.blackText}>SCORE: {this.state.goodAnswers} / {this.questionLen}</Text>

        </View>
      );
    }
  }

export default QuestionDB;

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
