import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

class MoveBall extends React.Component {
	constructor() {
       super();
       this.state = { x: 50, 
	                  y: 50,
					  xInc: true,
					  yInc: true,
					  xSpeed: 10,
					  ySpeed: 15,
					  diameter: 60,
                      seconds: 0};
	}
	
	timerEvent = () => {
		//get the dimensions of the screen
		let deviceWidth = Dimensions.get('window').width;
		let deviceHeight = Dimensions.get('window').height;
		
		//update the current x coordinate
		let curX = this.state.x;
		let curXDir = this.state.xInc;
		if (curXDir) {
			curX += this.state.xSpeed;
			if (curX > deviceWidth-this.state.diameter) {
				curXDir = false;
			}
		}
		else  {
			curX -= this.state.xSpeed;
			if (curX < 0) {
				curXDir = true;
			}
		}
		
		let curY = this.state.y;
		let curYDir = this.state.yInc;
		if (curYDir) {
			curY += this.state.ySpeed;
			if (curY > deviceHeight) {
				curYDir = false;
			}
		}
		else  {
			curY -= this.state.ySpeed;
			if (curY < 0) {
				curYDir = true;
			}
		}
        this.setState( {x: curX, y: curY, xInc: curXDir, yInc: curYDir} );
    };
  
  componentDidMount() {
    setInterval( this.timerEvent, 50 );  
  }
  
  
  setXCoord() { 
      
      //return { right: this.state.seconds };  error
	  return  '{ right:' + this.state.seconds + '}';
      
    };
	
  getXValue() {
	  let curX = this.state.seconds;
  };
  ballStyle = function(options) {
     return {
      position: "absolute",
      right: this.state.x,
      top: this.state.y,
      height: 60,
	  width: 60,
	  borderRadius: 30,
	  backgroundColor: 'red',
     }
 }
  
   render() {
      return (
	    <View style={styles.container}>
		  <View style={styles.timerView}>
             <Text style = {styles.textCenter}>
                  x: {round(this.state.x)} y: {round(this.state.y)} 
              </Text>
          </View>
		   <View style={this.ballStyle()}>
		  </View>
		</View>
	  );
  }
}
function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n);
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
	  backgroundColor: 'blue',
	  },
	  helloMsg: {
      color: 'red',
	  },
   ball: {
	  position: "absolute",
      right: 50,
      top: 50,
      height: 60,
	  width: 60,
	  borderRadius: 30,
	  backgroundColor: 'red',
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
});

export default MoveBall;
