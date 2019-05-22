import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, PanResponder } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends Component {
	
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
		  index: 0
        };             
    }
	
	
	getObject = (index) => { 
      console.log('getObject: index: ' + index);	 
      return this.items[index];
    }
	setObject = (index, obj) => { 
      console.log('setObject: index: ' + index);	 
      return this.items[index] = obj;
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
	    let temp = this.state.index;
		if (this.state.dy > 100)
			navigate('Second', {index: temp, getFunc: this.getObject.bind(this,temp), setFunc: this.setObject.bind(this)});
	    else if (this.state.dx > 150)
			this.setState({ index: temp + 1 });
		else if (this.state.dx < -150 && temp > 0) 
			this.setState({ index: temp - 1 });
		
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
		       key={this.items[this.state.index].id}
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
		  setFunc: this.props.navigation.state.params.setFunc,
		  text: 'not set'
      };
  }
  componentWillMount() {
	  let dObj = this.state.getFunc(this.state.index);
      this.setState({text: dObj.text});
  }
   
  handleChangeInput = (inputText) => {
	  this.setState({text: inputText});
	  let dObj = this.state.getFunc(this.state.index);
      dObj.text = inputText;
      this.state.setFunc(this.state.index, dObj);
  }
  
  //video on text input:
  // https://video.search.yahoo.com/search/video?fr=mcafee&p=React+Native+TextInput#id=2&vid=50b7a926ca95425bd25afd326258a268&action=click
  render() {
   const {navigate} = this.props.navigation;
   //let dObj = this.state.getFunc(this.state.index);
   //this.setState({text: dObj.text});
   //dObj.text = 'hey' + this.state.index;
   //this.state.setFunc(this.state.index, dObj);
   
   return (
     <View style={styles.container}>
	  <Text style={styles.textCenter}>Welcome to Second</Text>
	  <Text style={styles.textCenter}>Index: {this.state.index} </Text>
	  <Text style={styles.textCenter}>text: {this.state.text} </Text>
	  <TextInput
	     placeholder={this.state.text}
		 onChangeText={this.handleChangeInput}
		 value={this.state.text}
		 />
    
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
