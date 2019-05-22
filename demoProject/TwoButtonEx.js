import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class MyButton extends Component {
    
    constructor(props) {
       super(props);
    }
    
    render() {
       return (
	      <View style={styles.buttonContainer}> 
              <TouchableHighlight
                  onPress={()=> {this.props.buttonFunc(this.props.buttonTitle)}}
				  style={styles.button2Style}
              >
			     
                    <Text style={styles.buttonText}> {this.props.buttonTitle} </Text>
				
              </TouchableHighlight>
          </View>
       );
    }
}

export default class App extends Component {
    constructor() {
       super();
       this.state = { oper: '+', 
                   sum: 0,
                   prev: 0, 
				   clearSumOnNumber: true};
       this.onPressNumber = this.onPressNumber.bind(this);              
    }

  onPressNumber = (val) => { 
      let num = parseInt(val);
      console.log('val:'+num);	  
      this.setState( { sum: num});
  }
  
  

  render() {
	console.log('in render');
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
           <Text style={styles.textCenter}>
              {this.state.sum}
           </Text>
        </View>
        <View style={styles.rowContainer}>
          <MyButton  buttonFunc={this.onPressNumber}   buttonTitle='1'  />
          <MyButton  buttonFunc={this.onPressNumber}   buttonTitle='2'  />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   backgroundColor: 'blue',
  },
  buttonContainer: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    margin: 1,
  },
  button2Style: {
    flex:1,
    margin: 1,
    alignItems:'stretch',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  textCenter: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
    },
   buttonText: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
    },
});
