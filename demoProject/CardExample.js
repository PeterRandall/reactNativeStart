import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, PanResponder } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';


export default class App extends Component {
	
	
	items = [{ id: 1, 
	           text: 'Card #1', 
			   uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
			 { id: 2, 
	           text: 'Card #2', 
			   uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
			 { id: 3, 
	           text: 'Card #3', 
			   uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
			 { id: 4, 
	           text: 'Card #4', 
			   uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }
			];
			
	item = { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }
			 
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
		  index: 0
        };             
    }
	
	
	componentWillMount() {
    this.panResponderRef = PanResponder.create ( {
		  onStartShouldSetPanResponder: () => true,
		  onMoveShouldSetPanResponder: () => true,
		  onPanResponderGrant: this.doNothing, 
		  onPanResponderMove: this._handlePanResponderMove, 
		  onPanResponderRelease: this._handlePanResponderEnd, 
		  onPanResponderTerminate:this.doNothing
		  } );
  }
  
  
   _handlePanResponderMove = (event, gestureState) => {
    this.setState({
      stateID: gestureState.stateID,
      moveX: gestureState.moveX,
      moveY: gestureState.moveY,
      x0: gestureState.x0,
      y0: gestureState.y0,
      dx: gestureState.dx,
      dy: gestureState.dy,
      vx: gestureState.vx,
      vy: gestureState.vy,
      numberActiveTouches: gestureState.numberActiveTouches
    });
  };

  //onPanResponderRelease and onPanResponderTerminate Handler
  _handlePanResponderEnd = (event, gestureState) => {
	    let temp = this.state.index;
	    if (this.state.dx > 0)
			temp += 1;
		else  
			temp -= 1;
		
		this.setState({
			index: temp
		});
 
  };

  render() {
    return (
      <View style={styles.container}>
	    <View 
		   style= {styles.blankView} />
		   
	    <View 
		   style= {styles.cardView}
           {...this.panResponderRef.panHandlers}		   
		   >
           <Card
               title={this.items[this.state.index].text}
               image={ {uri: this.items[this.state.index].uri} }>
               <Text style={{marginBottom: 10}}>
				   {this.items[this.state.index].text}
               </Text>
			   
           </Card>
         </View>
		 <View style={styles.infoView}>
             <Text style = {styles.textCenter}>
                  dx: {Math.round(this.state.dx)} dy: {Math.round(this.state.dy)} index: {this.state.index}
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
  blankView: {
    flex: 1
  },
  cardView: {
    flex: 1
  },
  infoView: {
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
