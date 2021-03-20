import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {vibrate} from './utils';

//main components
// - phone vibration function (alert to break or resume)
// - countdown timer (display min and seconds)
// - switch between 25 and 5 min (work/break) 
// - be able to start/stop, reset (buttons)

//stopped at customizing, reset button
//pick up at creating start and stop button first


export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      minutes: 25,
      seconds: 0,
      timerType: 'work'
    }
  }

  setWorkTimer = () => {
    this.setState({
      minutes: 25,
      seconds: 0,
      timerType: 'work'
    });
  }
  
  setBreakTimer = () => {
    this.setState({
      minutes: 5,
      seconds: 0,
      timerType: 'break'
    });
  }

  
  pressStart() {
    this.componentDidMount();
  }

  pressStop() {
    clearInterval(this.myInterval);
  }

  pressReset() {
    if (this.state.timerType === 'work') {
      this.setState({
        minutes: 25,
        seconds: 0,
        timerType: 'work'
      });
    }else if (this.state.timerType === 'break') {
      this.setState({
        minutes: 5,
        seconds: 0,
        timerType: 'break'
      });
    }
  }
  

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const {seconds, minutes} = this.state
      
      if (seconds > 0) {
        this.setState(({seconds}) => ({
          seconds: seconds-1
        }))
      }
      
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval) //stops the time
          vibrate();
        } else {
          this.setState(({minutes}) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }


  dec = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={{fontSize: 36, color: 'red'}}>Pomodoro Timer</Text>
          <View style={styles.timers}>
            <TouchableOpacity style={styles.timerButtons} onPress={this.setWorkTimer}>
              <Text style={styles.timerText}>Work Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.timerButtons} onPress={this.setBreakTimer}>
              <Text style={styles.timerText}>Break Time</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color:"#111", fontSize: 36}}>{this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.startStopReset} onPress={() => this.pressStart()}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startStopReset} onPress={() => this.pressStop()}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startStopReset} onPress={() => this.pressReset()}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  timerButtons: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  startButton: {
    backgroundColor: 'green',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  startStopReset: {
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  buttonText: {
    fontSize: 24,
  },


  timerText: {
    fontSize: 28,
  }

});
