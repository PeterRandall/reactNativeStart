import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';



export default class App extends Component {
    
     constructor(props){
         super(props);
         
         this.state = {
             min: 0,
             sec: 0,
             started: false
             
         }
     }
    
     componentWillMount = () => {
            setInterval( this.timerEvent, 1000);
	 }
     
       timerEvent = () => {
            let num = this.state.sec;
            let count = this.state.min; 
            let started = true;
           if(num == 59){
               min = count + 1;
               num = 0;
           }
		   else {
			   num = num + 1;
		   }
           
           this.setState({
               min: count,
               sec: num,
           });
       }
  
  
    reset = () => {
        this.setState({
          
            min: this.state.min * 0,
            sec: this.state.sec * 0,
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                   {this.state.min}:{this.state.sec}
                </Text>
                
            
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress = {this.reset}
                    >
                        <Text style={styles.buttonText}>
                            Start
                        </Text>
                    </TouchableHighlight>
                    
                 </View>
                 <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress = {this.componentWillMount}
                    >
                        <Text style={styles.buttonText}>
                            Start
                        </Text>
                    </TouchableHighlight>
                 </View>
               
                
                
                
            </View>
        );
  
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
     buttonContainer: {
        flexDirection: 'row',
        
    },
    button: {
        height: 50,
        width: 200,
        backgroundColor: 'green',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
    },
});

