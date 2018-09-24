import React, { Component } from 'react';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
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
          <Marker
          position={{lat: 52.527635, lng: 13.396750}}
            onClick={this.onMarkerClick}
            name={"Strandbad Mitte"}
          />
          <Marker
          position={{lat: 52.5314220, lng: 13.402240}}
            onClick={this.onMarkerClick}
            name={"Café Fleury"}
          /> 
          <Marker
          position={{lat: 52.526263, lng: 13.387928}}
            onClick={this.onMarkerClick}
            name={"espresso-ambulanzz"}
          />
          <Marker
          position={{lat: 52.526230, lng: 13.400900}}
            onClick={this.onMarkerClick}
            name={"Barcomi's Deli"}
          />
          <Marker
          position={{lat: 52.529509, lng: 13.401927}}
            onClick={this.onMarkerClick}
            name={"St. Oberholz"}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAaMBXP1CkszdJ4cQalVTxyoJ5woUBD37Y"
})(App);
