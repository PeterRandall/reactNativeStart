import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight } from 'react-native';

//ver4 - calls clearInterval()
 
class StopWatch extends Component {
  constructor() {
    super();
    this.state = { minutes: 0, 
                   seconds: 0,
                   running: true,
				   handle: null};
  }
  
    timerEvent = () => {
        if (this.state.running) {
          if (this.state.seconds > 59) {
              this.setState( {minutes: this.state.minutes + 1,
                              seconds: 0} );
          }
          else 
              this.setState( {seconds: this.state.seconds + 1} );
        }
    };
  
  componentDidMount() {
    let ref = setInterval( this.timerEvent, 100 ); 
    this.setState( {handle: ref} );
  }
  
  resetTimer = () => {
          this.setState( {minutes: 0,
                          seconds: 0,
                          running: false} );

    };
	
	startStopTimer = () => {
		if (this.state.running) {
			if (this.state.handle != null) {
				console.log("stopping the timer");
				clearInterval(this.state.handle);
				this.setState( {handle: null,
			                    running: false} );
			}
			else 
				console.log("time did not have a handle");
		}
		else {
			console.log("starting timer: " + this.state.handle);
			let ref = setInterval( this.timerEvent, 100 ); 
			this.setState( {handle: ref,
			                running: true} );
		}			
			
	};
  
    setStyleColor(redOn) {
      if (redOn)
        return { backgroundColor: 'red' };
      else 
        return { backgroundColor: 'green' };
    };
 
//<Text style={[styles.buttonStyle, this.setStyleColor(this.state.running)]}>
  render() {

    return (
	  <View style={styles.container}>
	      <View style={styles.timerView}>
             <Text style = {styles.textCenter}>
                  {this.state.minutes} : {this.state.seconds} 
              </Text>
          </View>
          <View style={styles.buttonView}>
          
              <TouchableHighlight
                  onPress={this.resetTimer}
              >
              
              <Text style={styles.buttonStyle}>
                  Reset
              </Text>
               
              
              </TouchableHighlight>
          </View>
          <View style={styles.buttonView}>
          
              <TouchableHighlight
                  onPress={this.startStopTimer}
              >
              
              <Text style={[styles.buttonStyle, this.setStyleColor(this.state.running)]}>
                  {this.state.running ?  <Text>Stop</Text> : <Text>Start</Text>}
              </Text>
               
              
              </TouchableHighlight>
          </View>
          
	  </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timerView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black',
    },
  buttonStyle: {
        height: 90,
        width:300,
        fontSize: 70,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
  },
});

export default StopWatch;