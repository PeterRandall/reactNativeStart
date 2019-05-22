import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Accelerometer } from 'expo';

class AccelerometerSensor extends React.Component {
  state = {
    accelerometerData: {},
	xCord: 0,
	yCord: 0,
	diameter: 50,
  };

  componentDidMount() {
    this._toggle();
	Accelerometer.setUpdateInterval(5000);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };


  _subscribe = () => {
    this._subscription = Accelerometer.addListener(
      accelerometerData => {
        this.setState({ accelerometerData });
      }
    ); 
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove(); 
    this._subscription = null;
  };
  
  ballStyle = function(x, y, z) {
	  
	  if (Math.abs(x) < .05 && Math.abs(y) < .05 && Math.abs(z) > .95)
	  {
		  x = Dimensions.get('window').width/2;
		  y = Dimensions.get('window').height/2;
		  
		  //x,y: upper left hand corner
		  x = Math.round(x - this.state.diameter/2);
		  y = Math.round(y - this.state.diameter/2);
	  }
	  else 
	  {
		  x = 50;
		  y = 50;
	  }
	  console.log("x:" + x + " y:" + y + " z:" + z);
     return {
      position: "absolute",
      left: x,
      top: y,
      height: this.state.diameter,
	  width: this.state.diameter,
	  borderRadius: this.state.diameter/2,
	  backgroundColor: 'red',
     }
 }
 
 ballStyle2 = function(x, y, z) {
	  
	  if (Math.abs(x) < .05 && Math.abs(y) < .05 && Math.abs(z) > .95)
	  {
		  x = Math.round(Dimensions.get('window').width/2);
		  y = Math.round(Dimensions.get('window').height/2);
	  }
	  else 
	  {
		  x = 50;
		  y = 50;
	  }
	  console.log("x:" + x + " y:" + y + " z:" + z);
     return {
      position: "absolute",
      left: x,
      top: y,
      height: 4,
	  width: 4,
	  borderRadius: 2,
	  backgroundColor: 'black',
     }
 }

  render() {
    let {
      x,
      y,
      z,
    } = this.state.accelerometerData; 

    return (
      <View style={styles.container}>
        <Text>Accelerometer:</Text>
        <Text style={styles.textCenter}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
		<View style={this.ballStyle(x, y, z)}>
		  </View>
		  <View style={this.ballStyle2(x, y, z)}>
		  </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
	  backgroundColor: 'lightblue',
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

export default AccelerometerSensor;