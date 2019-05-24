import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Constants} from 'expo';




class Button extends Component {


  render () {
    return (
      <TouchableHighlight
        style={{
          width: '100%',
          height: '90%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: this.props.color,
          margin: 4,
          borderRadius: 35,
        }}
        onPress={this.props.buttonFunc}
      >
        <Text style={{
          color: this.props.textColor,
          fontSize: 20,
        }}>
          {this.props.buttonTitle}
        </Text>
      </TouchableHighlight>
    );

  }
}


export default class App extends React.Component {



  state = {
        number: 0,
        number2: 0,
        operation: '',
        background: ['black', 'gray', 'white', 'black'],
        colors1: ['#a6a6a6', 'lightblue', 'red', 'gold'],
        colors2: ['#f09a36', 'blue', 'red', 'gold'],
        colors3: ['#333333', 'lightblue', 'black', 'gray'],
        screenBackground: ['black', 'lightgray', 'white', 'black'],
        screenText: ['white', 'white', 'black', 'gray'],
        text1: ['black', 'black', 'black', 'black'],
        text2: ['white', 'white', 'black', 'black'],
        text3: ['white', 'black', 'white', 'black'],
        index: 0,
    }

  onPressNumber = (val) => {

    if (String(this.state.number).length < 12) {
      if(isNaN(this.state.number)){
        this.setState({
          number: val,
        })
      }
      else if(val==0 && String(this.state.number).includes('.')) {
        this.setState({
          number: String(this.state.number) + String(val),
        })
      }
      else{
        this.setState({
          number: Number(String(this.state.number) + String(val)),
        })
      }
    }
  }

  onPressOp = (op) => {
    this.setState({
      number2: this.state.number,
      number: op,
      operation: op,
    })
  }

  onPressDec = () => {
    if(String(this.state.number).includes('.') != true){
      this.setState({
        number: String(this.state.number)+'.',
      })
    }
  }

  onPressSqrt = (op) => {
    this.setState({
      number: Math.sqrt(Number(this.state.number)),
    })
  }

  onPressNeg = (op) => {
    this.setState({
      number: Number(this.state.number) * -1,
    })
  }

  onPressClear = () => {
    this.setState({
      number2: 0,
      number: 0,
      operation: '',
    })
  }

  onPressTheme = () => {
    if(this.state.index<this.state.colors1.length-1){
      this.setState({
        index: this.state.index + 1,
      })
    }
    else{
      this.setState({
        index: 0,
      })
    }

  }



  onPressEquals = () => {
    tempResult = Number(this.state.number2);
    num1 = Number(this.state.number);
    if(this.state.operation=='+'){
      tempResult += num1;
    }
    if(this.state.operation=='-'){
      tempResult -= num1;
    }
    if(this.state.operation=='*'){
      tempResult *= num1;
    }
    if(this.state.operation=='/'){
      tempResult /= num1;
    }
    if(this.state.operation=='mod'){
      tempResult %= num1;
    }
    this.setState({
      operation: '',
      number2: 0,
      number: tempResult,
    })
  }



  render() {
    return (
      <View style={{
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          width: '100%',
          flex: 1,
          backgroundColor: this.state.background[this.state.index],
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            width: '100%',
            flex: 1,
            backgroundColor: this.state.screenBackground[this.state.index],
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontWeight: 'bold',
              color: this.state.screenText[this.state.index],
              fontSize: 45,
            }}>{String(this.state.number).substring(0,12)}</Text>
          </View>

          <View style={styles.row}>
            <Button buttonFunc={this.onPressClear.bind(this)} buttonTitle='C' color={this.state.colors1[this.state.index]} textColor={this.state.text1[this.state.index]}/>
            <Button buttonFunc={this.onPressSqrt.bind(this,'sqrt')} buttonTitle='&#x221A;' color={this.state.colors1[this.state.index]} textColor={this.state.text1[this.state.index]}/>
            <Button buttonFunc={this.onPressNeg.bind(this)} buttonTitle='+/-' color={this.state.colors1[this.state.index]} textColor={this.state.text1[this.state.index]}/>
            <Button buttonFunc={this.onPressOp.bind(this,'+')} buttonTitle='+' color={this.state.colors2[this.state.index]} textColor={this.state.text2[this.state.index]}/>
          </View>

          <View style={styles.row}>
            <Button buttonFunc={this.onPressNumber.bind(this,1)} buttonTitle='1' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,2)} buttonTitle='2' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,3)} buttonTitle='3' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressOp.bind(this,'-')} buttonTitle='-' color={this.state.colors2[this.state.index]} textColor={this.state.text2[this.state.index]}/>
          </View>

          <View style={styles.row}>
            <Button buttonFunc={this.onPressNumber.bind(this,4)} buttonTitle='4' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,5)} buttonTitle='5' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,6)} buttonTitle='6' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressOp.bind(this,'*')} buttonTitle='*' color={this.state.colors2[this.state.index]} textColor={this.state.text2[this.state.index]}/>
          </View>

          <View style={styles.row}>
            <Button buttonFunc={this.onPressNumber.bind(this,7)} buttonTitle='7' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,8)} buttonTitle='8' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,9)} buttonTitle='9' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressOp.bind(this,'/')} buttonTitle='/' color={this.state.colors2[this.state.index]} textColor={this.state.text2[this.state.index]}/>
          </View>

          <View style={styles.row}>
            <Button buttonFunc={this.onPressTheme.bind(this)} buttonTitle='Theme' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressNumber.bind(this,0)} buttonTitle='0' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressDec.bind(this)} buttonTitle='.' color={this.state.colors3[this.state.index]} textColor={this.state.text3[this.state.index]}/>
            <Button buttonFunc={this.onPressEquals.bind(this)} buttonTitle='=' color={this.state.colors2[this.state.index]} textColor={this.state.text2[this.state.index]}/>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {

  },
  screen: {

  },
  screenText: {

  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {

  }

});