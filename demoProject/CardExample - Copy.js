import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';


export default class App extends Component {
    constructor() {
       super();
       this.state = {
          numberActiveTouches: 0,
          moveX: 0,
          moveY: 0,
          x0: 0,
          y0: 0,
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0, 
	      top: 0,
	      left: 0
        };             
    }
    item = { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }

  render() {
    return (
      <View style={styles.container}>
	    <View 
		   style= {styles.cardView} 
		   >
           <Card
		       key={this.item.id}
               title={this.item.text}
               image={ {uri: this.item.uri} }>
               <Text style={{marginBottom: 10}}>
				   {this.item.text}
               </Text>
			   
           </Card>
         </View>
		 <View style={styles.infoView}>
             <Text style = {styles.textCenter}>
                  dx: {Math.round(this.state.dx)} dy: {Math.round(this.state.dy)} 
             </Text>
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
  cardView: {
    flex: 1
  },
  cardView: {
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
