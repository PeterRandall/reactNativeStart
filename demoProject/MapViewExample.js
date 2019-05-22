import React from 'react';
import { MapView } from 'expo';

export default class App extends React.Component {
  constructor() {
       super();
       this.state = { lon: -77.4289,
                      lat: 38.8404 };
                   
    }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.lon,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      />
    );
  }
}