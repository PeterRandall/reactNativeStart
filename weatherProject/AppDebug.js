import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
//import { StyleSheet, Text, View, TextInput } from "react-native";

 
class App extends Component {
  constructor() {
    super();
    this.state = { minutes: 0, 
                   seconds: 0,
                   running: true};
    
    /*
    let timerEvent = () => {
        if (this.state.running) {
          if (this.state.seconds > 59) {
              this.setState( {minutes: this.state.minutes + 1,
                              seconds: 0} );
          }
          else 
              this.setState( {seconds: this.state.seconds + 1} );
        }
    };
	
	
    // Toggle the state every second
    setInterval( timerEvent, 100 );
    */
  }
  /*
    setStyleColor(redOn) {
      if (redOn)
        return { backgroundColor: 'red' };
      else 
        return { backgroundColor: 'green' };
    };
   */

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
                  onPress={() => {
                      this.setState( {running : !this.state.running});
                  }}
              >
              
              <Text style={[styles.buttonStyle, {backgroundColor: 'red'}]}>
              Hey There
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
        height: 70,
        width:200,
        fontSize: 60,
        textAlign: 'center',
        backgroundColor: 'green',
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
  },
});