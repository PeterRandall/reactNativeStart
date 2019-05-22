import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight, ScrollView, Button } from 'react-native';
 
class PhotoTest extends Component {
  constructor() {
    super();
    this.state = { minutes: 0, 
                   seconds: 0,
                   running: true};
  }
  
 _handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };
  

  render() {

    return (
	  <View>
         <Button title="Load Images" onPress={this._handleButtonPress} />
           <ScrollView>
              {this.state.photos.map((p, i) => {
                return (
                 <Image
                    key={i}
                    style={{
                      width: 300,
                      height: 100,
                    }}
                    source={{ uri: p.node.image.uri }}
                 />
                );
              })}
           </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: 'center',
    justifyContent: 'space-around',
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
  buttonStyle: {
        height: 90,
        width:300,
        fontSize: 70,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
  },
});

export default PhotoTest;