import React, {Component} from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

class Button extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.props.buttonFunc}
          style={[styles.button,this.props.customStyle]}
        >
          <Text style={styles.text}>
            {this.props.buttonTitle}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#4666FF',
    borderWidth: 1,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 35,
  },
  button: {
    flex: 1,
    borderColor: '#4666FF',
    borderWidth: 1,
    //backgroundColor: 'lightblue',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Button;