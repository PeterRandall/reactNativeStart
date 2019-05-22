import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, PanResponder } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends Component {
	
			
	//item = { id: 1, name: 'Fred', address: '123 Main st.', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }		
	
	static navigationOptions = {
    title: 'Home',
  };
	
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
		  index: 0,
		  id: 1,
		  name: 'fred',
		  address: '123 Main Street',
		  uri:'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
        };             
    }
	
	
	getName = () => { 
      console.log('getName - returning: ' + this.state.name);	 
      return this.state.name;
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
	    const {navigate} = this.props.navigation;
	    let tIndex = this.state.index;
		if (this.state.dy > 100)
			navigate('Second', {index: tIndex, getFunc: this.getName.bind(this)});
	    else if (this.state.dx > 150)
			this.setState({ index: tIndex + 1 });
		else if (this.state.dx < -150 && tIndex > 0) 
			this.setState({ index: tIndex - 1 });
		
  };

    
  render() {
	//navigate is a function.  remove{} and navigate becomes an instance of an object
    const {navigate} = this.props.navigation;
	
    return (
      <View style={styles.container}>
	    <View 
		   style= {styles.blankView} />
		   
	    <View 
		   style= {styles.cardView}
           {...this.panResponderRef.panHandlers}		   
		   >
           <Card
		       key={this.state.id}
               title={this.state.name}
               image={ {uri: this.state.uri} }>
               <Text style={{marginBottom: 10}}>
				   {this.state.address}
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

//video on passing arguments
//https://www.youtube.com/watch?v=lDR0P_5Gs0k
class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'Second',
  };
  constructor (props) {
	  super(props)
      this.state = {
		  index: this.props.navigation.state.params.index,
		  getFunc: this.props.navigation.state.params.getFunc, 
		  name: 'not set'
      };
  }
  componentWillMount() {
	  let tName = this.state.getFunc(this.state.index);
      this.setState({name: tName});
  }
   
  
  //video on text input:
  // https://video.search.yahoo.com/search/video?fr=mcafee&p=React+Native+TextInput#id=2&vid=50b7a926ca95425bd25afd326258a268&action=click
  render() {
   const {navigate} = this.props.navigation;
   
   
   return (
     <View style={styles.container}>
	  <Text style={styles.textCenter}>Welcome to Second</Text>
	  <Text style={styles.textCenter}>Index: {this.state.index} </Text>
	  <Text style={styles.textCenter}>name: {this.state.name} </Text>
	  
      <Button
        title="Go to Home page"
        onPress={() => navigate('Home')}
      />
	  </View>
    );
  }
}

const NavigationApp = createStackNavigator (
   {
	   Home: { screen: HomeScreen },
	   Second: { screen: SecondScreen },
   }
); 

export default createAppContainer(NavigationApp);

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
  textCenter: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
    },
});
