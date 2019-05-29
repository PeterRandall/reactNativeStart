// Adapted from https://github.com/facebook/react-native/blob/master/
// Examples/UIExplorer/PanResponderExample.js

"use strict";

import React, { Component } from "react";
import { StyleSheet, PanResponder, View, Text, Dimensions } from "react-native";

const INNER_CIRCLE_SIZE = 80;
const CIRCLE_SIZE = 80;
const CIRCLE_COLOR = "blue";
const CIRCLE_HIGHLIGHT_COLOR = "green";

class PanResponderExample extends Component {
  // Set some initial values.
  _panResponder = {};
  _previousLeft = 0;
  _previousTop = 0;
  _circleStyles = {};
  circle = null;
  _circle2Styles = {};
  circle2 = null;

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
	  currX: 0,
	  currY: 0,
	  prevX: 0,
	  prevY: 0,
	  screenWidth: 0,
	  screenHeight: 0,
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
    this._previousLeft = this.state.currX;
    this._previousTop = this.state.currY;
	
	var {height, width} = Dimensions.get('window');
	let tHeight = Math.round(height);   //number of rows
	let tWidth = Math.round(width);  //number of columns
	this.setState({
      screenWidth: tWidth,
      screenHeight: tHeight,
    });
	
    this._circleStyles = {
      style: { left: this._previousLeft, top: this._previousTop }
    };
	this._circle2Styles = {
      style: { left: this._previousLeft, top: this._previousTop }
    };
  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text>
          {this.state.numberActiveTouches} touches,
		  x0: {Math.round(this.state.x0)},
		  y0: {Math.round(this.state.y0)},
          dx: {Math.round(this.state.dx)},
          dy: {Math.round(this.state.dy)},
          vx: {this.state.vx},
          vy: {this.state.vy}
        </Text>
		<Text>
          width: {this.state.screenWidth},height: {this.state.screenHeight}
        </Text>
		<Text>
           x: {Math.round(this.state.x0 + this.state.dx)},  y: {Math.round(this.state.y0 + this.state.dy)}
        </Text>
		<Text>
          cx: {Math.round(this._previousLeft + this.state.dx)}, cy: {Math.round(this._previousTop + this.state.dy)}
        </Text>
		
		<View
          ref={circle => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
        />
		<View
		  ref={circle2 => {
            this.circle2 = circle2;
          }}
          style={styles.circle2}
        />
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
	this.circle2 && this.circle2.setNativeProps(this._circle2Styles);
  };

  _handleStartShouldSetPanResponder = (event, gestureState) => {
    // Should we become active when the user presses down on the circle?
    return true;
  };

  _handleMoveShouldSetPanResponder = (event, gestureState) => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  };

  _handlePanResponderGrant = (event, gestureState) => {
    this._highlight();
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
	
	this._circle2Styles.style.left = this._previousLeft + gestureState.dx;
    this._circle2Styles.style.top = this._previousTop + gestureState.dy;
	
    this._updatePosition();
  };

  _handlePanResponderEnd = (event, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  };
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: "absolute",
    left: 0,
    top: 0
  },
  circle2: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    position: "absolute",
    left: 0,
    top: 0
  },
  container: { flex: 1, paddingTop: 64 }
});

export default PanResponderExample;
