// Adapted from https://github.com/facebook/react-native/blob/master/
// Examples/UIExplorer/PanResponderExample.js

"use strict";

import React, { Component } from "react";
import { StyleSheet, PanResponder, View, Text, Dimensions } from "react-native";

const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = "blue";
const CIRCLE_HIGHLIGHT_COLOR = "green";

class MyRow extends Component {
    constructor(props) {
       super(props);
    }
   setStyleColor(row, index) {
      let redOn = this.props.getFunc(row, index);
      if (redOn == 2)
        return { backgroundColor: 'red' };
	  else if (redOn == 1)
        return { backgroundColor: 'white' };
      else 
        return { backgroundColor: 'black' };
    };
    
  render() {
    return (
      <View style={styles.rowContainer}>
          <View style={[styles.voidView, this.setStyleColor(this.props.row, 0)]}/>  
          <View style={[styles.voidView, this.setStyleColor(this.props.row, 1)]}/> 
		  <View style={[styles.voidView, this.setStyleColor(this.props.row, 2)]}/>  
		  <View style={[styles.voidView, this.setStyleColor(this.props.row, 3)]}/> 
		  <View style={[styles.voidView, this.setStyleColor(this.props.row, 4)]}/>
      </View>
    );
  }
}


class PanRespSquares extends Component {
  // Set some initial values.
  _panResponder = {};
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
	  numRows: 2,
	  numCols: 2,
	  tileWidth: 0,
	  tileHeight: 0,
	  squares: [[0,0,1,1,0],
                [0,0,0,1,1],
                [0,1,1,1,1], 
				[0,0,0,1,0],
				[0,1,1,1,1],
                [1,1,0,0,1],
                [1,0,0,0,0]],
    };
  }
  
  getValue = (row, col) => {
	    let currLeft = Math.round((this._previousLeft + this.state.dx) / this.state.tileWidth);
		let currTop = Math.round((this._previousTop + this.state.dy) / this.state.tileHeight);
		if (this.state.squares[row][col] == 1 && currLeft == col && currTop == row)
			return 2;
		
        return this.state.squares[row][col];
        
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
    this._previousLeft = 0;
    this._previousTop = 0;
	
	var {height, width} = Dimensions.get('window');
	let tHeight = Math.round(height / this.state.squares.length);   //number of rows
	let tWidth = Math.round(width / this.state.squares[0].length);  //number of columns
	let tRadius = Math.round(tWidth/2);
	
	this._circleStyles = {
      style: { left: this._previousLeft, top: this._previousTop, 
               width: tWidth, height: tHeight, borderRadius: tRadius  }
    };
	
	this.setState({
      tileWidth: tWidth,
      tileHeight: tHeight,
    });
	
  }

  componentDidMount() {
    this._updatePosition();
	
  }

  render() {
    return (
      <View style={styles.container}>
        
           <View style={styles.voidView}>
               <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={0} />
               </View>
               <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={1} />
               </View>
               <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={2} />
               </View>
               <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={3} />
               </View>
               <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={4} />
               </View>
			   <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={5} />
               </View>
			   <View style={styles.rows}>
                   <MyRow getFunc={this.getValue.bind(this)} row={6} />
               </View>
                       
                        
           </View>
		<View
          ref={circle => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
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
    this._updatePosition();
  };

  _handlePanResponderEnd = (event, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
	
	this._circleStyles.style.left = this._previousLeft;
    this._circleStyles.style.top = this._previousTop;
    this._updatePosition();
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
  container: { 
     flex: 1, 
	 paddingTop: 0 
	}, 
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'stretch',
    justifyContent: 'center',
  },
  topPart: {
        flex: 1,
    },
    bottom: {
        flex: 5,
    },
    rows: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        fontSize: 30,
    },
    voidView: {
        flex:1,
        margin: 1,
        alignItems:'stretch',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
    },
    columnView: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default PanRespSquares;
