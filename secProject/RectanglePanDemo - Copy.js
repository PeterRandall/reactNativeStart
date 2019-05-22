// Adapted from https://github.com/facebook/react-native/blob/master/
// Examples/UIExplorer/PanResponderExample.js

"use strict";

import React, { Component } from "react";
import { StyleSheet, PanResponder, View, Text } from "react-native";

const CIRCLE_SIZE = 80;
const CIRCLE_COLOR = "red";
const CIRCLE_HIGHLIGHT_COLOR = "green";

class RectanglePanDemo extends Component {
  // Set some initial values.
  panResponderRef = {};
  _previousLeft = 0;
  _previousTop = 0;
  _circleStyles = {};
  circle = null;

  constructor(props) {
    super(props);
	
	
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
	  tp: 0,
	  left: 0
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
		  
		  
		  
    this._previousLeft = 20;
    this._previousTop = 84;
	this.state.left = this._previousLeft;
	this.state.tp = this._previousTop;
    this._circleStyles = {
      style: { left: this._previousLeft, top: this._previousTop }
    };
  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          ref={circle => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this.panResponderRef.panHandlers}
        />
        <Text>
          {this.state.numberActiveTouches} touches,
          dx: {this.state.dx},
          dy: {this.state.dy},
          vx: {this.state.vx},
          vy: {this.state.vy}
        </Text>
		
		<View style={styles.timerView}>
             <Text style = {styles.textCenter}>
                  left: {Math.round(this.state.left)} top: {Math.round(this.state.tp)} 
             </Text>
        </View>
		<View style={styles.timerView}>
             <Text style = {styles.textCenter}>
                  dx: {Math.round(this.state.dx)} dy: {Math.round(this.state.dy)} 
             </Text>
        </View>
		  
      </View>
    );
  }

  // _highlight and _unHighlight get called by PanResponder methods,
  // providing visual feedback to the user.
  _highlight = () => {
    this.circle &&
      this.circle.setNativeProps({
        style: { backgroundColor: CIRCLE_HIGHLIGHT_COLOR }
      });
  };

  _unHighlight = () => {
    this.circle &&
      this.circle.setNativeProps({ style: { backgroundColor: CIRCLE_COLOR } });
  };

  // We're controlling the circle's position directly with setNativeProps.
  _updatePosition = () => {
    this.circle && this.circle.setNativeProps(this._circleStyles);
	//this.state.left = this._circleStyles.style.left;
	//this.state.tp = this._circleStyles.style.top;
  };

 
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

    // Calculate current position using deltas
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  };

  //onPanResponderRelease and onPanResponderTerminate Handler
  _handlePanResponderEnd = (event, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
	
	//this.state.left = this._previousLeft;
	//this.state.top = this._previousTop;
  };
  
  
  doNothing = () => {  };
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
	  backgroundColor: 'lightblue',
	  paddingTop: 64,
	  },
   circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: "absolute",
    left: 0,
    top: 0
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

export default RectanglePanDemo;
