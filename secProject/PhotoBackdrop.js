import React, { Component } from "react";

import { Image, CameraRoll } from "react-native";
import Permissions from 'react-native-permissions';

import styles from "./style";

class PhotoBackdrop extends Component {
  constructor(props) {
    super(props);
    this.state = { photoSource: null,
                   photoPermission: null	};
  }

  componentDidMount() {
	  
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response });
	  console.log("permission: " + response);
    });
  
	  
    CameraRoll.getPhotos({ first: 1 }).then(data => {
      this.setState({ photoSource: { uri: data.edges[3].node.image.uri } });
    }, error => {
      console.warn(error);
    });
  }

  render() {
    return (
      <Image
        style={styles.backdrop}
        source={this.state.photoSource}
        resizeMode="cover"
      >
        {this.props.children}
      </Image>
    );
  }
}


export default PhotoBackdrop;
