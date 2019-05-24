import React, { Component }  from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

class CalcNum extends Component {
  render() {
    return (
      <TouchableHighlight  style={styles.button} onPress={this.props.func}>
        <Text style={styles.buttonText}>{this.props.displayVal}</Text>
      </TouchableHighlight>
    );
  }
}

class CalcOp extends Component {
  render() {
    return (
      <TouchableHighlight  style={styles.opButton} onPress={this.props.func}>
        <Text style={styles.buttonText}>{this.props.displayVal}</Text>
      </TouchableHighlight>
    );
  }
}

class CalcEqual extends Component {
  render() {
    return (
      <TouchableHighlight  style={styles.equalButton} onPress={this.props.func}>
        <Text style={styles.buttonText}>{this.props.displayVal}</Text>
      </TouchableHighlight>
    );
  }
}

export default class App extends React.Component {
  //fix wrap number
  state = {
    number1: '',
    op: '',
    number2: '',
    result: '',
  }

  onPressNumber = (val) => {
    if(this.state.op == ''){
      this.setState ({
        number1: this.state.number1 + val,
        result: this.state.number1 + val,
      })
    }
    else{
      this.setState ({
        number2: this.state.number2 + val,
        result: this.state.number2 + val,
      })

    }
  }
  onPressOperator = (val) => {
    this.setState ({
      op: val,
      result: val,
    })
  }
  onPressClear = (val) => {
      this.setState ({
        number1: '',
        op: '',
        number2: '',
        result: '',
      })
  }
  onPressEval = (val) => {
      var operator = this.state.op;
      var num1 = parseFloat(this.state.number1);
      var num2 = parseFloat(this.state.number2);
      var res = '';

      if(operator == '+'){
        res = num1 + num2;
      }
      if(operator == '-'){
        res = num1 - num2;
      }
      if(operator == '*'){
        res = num1 * num2;
      }
      if(operator == '/'){
        res = num1 / num2;
      }

      const pow = Math.pow(10, 8);
      res = Math.trunc(res * pow) / pow;

      this.setState ({
        result: res,
        op: '',
        number1: String(res),
        number2: '',
      })

  }

  render() {
    return (
      <View style={styles.fullView}>
        <View style={styles.window}>
          <View style={styles.screen}>
            <Text style={styles.screenText}>{this.state.result}</Text>
          </View>
          <View style={styles.row}>
            <CalcNum displayVal='1' func={this.onPressNumber.bind(this,'1')}/>
            <CalcNum displayVal='2' func={this.onPressNumber.bind(this,'2')}/>
            <CalcNum displayVal='3' func={this.onPressNumber.bind(this,'3')}/>
            <CalcOp displayVal='&#43;' func={this.onPressOperator.bind(this,'+')}/>
          </View>
          <View style={styles.row}>
            <CalcNum displayVal='4' func={this.onPressNumber.bind(this,'4')}/>
            <CalcNum displayVal='5' func={this.onPressNumber.bind(this,'5')}/>
            <CalcNum displayVal='6' func={this.onPressNumber.bind(this,'6')}/>
            <CalcOp displayVal='&#45;' func={this.onPressOperator.bind(this,'-')}/>
          </View>
          <View style={styles.row}>
            <CalcNum displayVal='7' func={this.onPressNumber.bind(this,'7')}/>
            <CalcNum displayVal='8' func={this.onPressNumber.bind(this,'8')}/>
            <CalcNum displayVal='9' func={this.onPressNumber.bind(this,'9')}/>
            <CalcOp displayVal='&#215;' func={this.onPressOperator.bind(this,'*')}/>
          </View>
          <View style={styles.row}>
            <CalcNum displayVal='&#183;' func={this.onPressNumber.bind(this,'.')}/>
            <CalcNum displayVal='0' func={this.onPressNumber.bind(this,'0')}/>
            <CalcOp displayVal='C' func={this.onPressClear.bind(this,'')}/>
            <CalcOp displayVal='&#247;' func={this.onPressOperator.bind(this,'/')}/>
          </View>
          <View style={styles.row}>
            <CalcEqual displayVal="&#61;" func={this.onPressEval.bind(this,'=')}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullView: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  window: {
    flex: 1,
    width: "100%",
  },
  screen: {
    flex: 3,
    backgroundColor: '#adadad',
    width: "100%",
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  screenText: {
    fontSize: 60,
  },
  row: {
    flex: 2,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#fff',
    width: "22.5%",
    height: "85%",
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
  },
  opButton: {
    backgroundColor: '#3b40ed',
    width: "22.5%",
    height: "85%",
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
  },
  equalButton: {
    backgroundColor: '#54555e',
    width: "97.5%",
    height: "85%",
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 80,
  },
  buttonText: {
    fontSize: 42,
  }
});