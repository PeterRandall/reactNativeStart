import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class MyButton extends Component {
    
    constructor(props) {
       super(props);
    }
    
    render() {
       return (
          <View style={styles.button2Style} >
          
              <TouchableHighlight
                  onPress={this.props.buttonFunc}
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
                   
    }

  _onPressNumber = (val) => { 
      let current = this.state.sum;
	  console.log('current:' + current);
      if (this.state.clearSumOnNumber) {
		 current = 0; 
		 console.log('sum:' + current);
      }	
	  current = current * 10 + val;
      console.log('sum:' + current + ', ' + this.state.clearSumOnNumber);	  
      this.setState( { sum: current,
                       msg: val,
					   clearSumOnNumber: false});
  }
  
  onPressEquals = () => {
	  if (this.state.oper === '+') {
              this.setState( { sum: this.state.prev + this.state.sum,
                               prev: 0});
      }
      if (this.state.oper === '-') {
              this.setState( { sum: this.state.prev - this.state.sum,
                               prev: 0});
      }
      if (this.state.oper === '/') {
              this.setState( { sum: this.state.prev / this.state.sum,
                               prev: 0});
      }
  }
  _onPressOperator = (val) => { 
      if (val === 'c') {
		  this.setState( { oper: '+',
		                   sum: 0,
                           prev: 0});
	  }
      else if (val === '=') {
          this.onPressEquals();
      }
      else  {
          this.onPressEquals();
          this.setState( { prev: this.state.sum,
                           clearSumOnNumber: true,
                           oper: val});
         
      }
  }
  
  _formatSum = (val) => {  
      //limit decimal places...
      let str = ""+val;
      if (str.length < 10)
          return str;
      
      let decPlace = str.indexOf(".");
      if (decPlace < 10)
          return val.toFixed(10-decPlace );
          
      return ""+val+"%";
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
           <Text style={styles.textCenter}>
              {this._formatSum(this.state.sum)}
           </Text>
        </View>
        <View style={styles.rowContainer}>
          <MyButton  buttonFunc={this._onPressNumber.bind(this,1)}   buttonTitle='1'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,2)}   buttonTitle='2'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,3)}   buttonTitle='3'  />
          <MyButton  buttonFunc={this._onPressOperator.bind(this,'+')}   buttonTitle='+'  />
        </View>
        
        <View style={styles.rowContainer}>
          <MyButton  buttonFunc={this._onPressNumber.bind(this,4)}   buttonTitle='4'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,5)}   buttonTitle='5'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,6)}   buttonTitle='6'  />
          <MyButton  buttonFunc={this._onPressOperator.bind(this,'-')}   buttonTitle='-'  />
        </View>
        
        <View style={styles.rowContainer}>
          <MyButton  buttonFunc={this._onPressNumber.bind(this,7)}   buttonTitle='7'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,8)}   buttonTitle='8'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,9)}   buttonTitle='9'  />
          <MyButton  buttonFunc={this._onPressOperator.bind(this,'/')}   buttonTitle='/'  />
        </View>
        
        <View style={styles.rowContainer}>
          <MyButton  buttonFunc={this._onPressOperator.bind(this,'c')}   buttonTitle='c'  />
          <MyButton  buttonFunc={this._onPressNumber.bind(this,0)}   buttonTitle='0'  />
          <View style={styles.button2Style} >
          </View>
          <MyButton  buttonFunc={this._onPressOperator.bind(this,'=')}   buttonTitle='='  />
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
    margin: 20
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
