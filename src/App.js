import React, { Component } from 'react';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Mirco´s favorite cafe spots in Berlin-Mitte</h1>
        </header>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: 52.529186,
            lng: 13.395621
          }}
          zoom={14}
        >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAaMBXP1CkszdJ4cQalVTxyoJ5woUBD37Y"
})(App);
