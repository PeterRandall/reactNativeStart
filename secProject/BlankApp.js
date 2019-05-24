import React, { Component }  from 'react';
import { AppRegistry, StyleSheet, TouchableHighlight, Text, View, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { minutes: 0, 
                   seconds: 0,
                   running: true};
  
  }

  componentDidMount() {
     
  }
  

  render() {
    return (
	  <View style={styles.fullView } >
       <Image
           source={{ uri: 'https://static.codehs.com/img/courses/introkarel/2.png' }}
           style={{ height: 150, width: 150 }}
       />
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
  gif: {
    flex: 1,
    height: 200,
  },
});