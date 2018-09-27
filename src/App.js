import React, { Component } from 'react';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      venues: [],
      status: "initial"
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  componentDidMount() {
    this.getVenues()
  }
  render() {
    if (this.state.status === "initial") {
      return null;
    }
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
         {/* <Marker
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
          /> */}
          <Marker
            position={{lat: this.state.venues[6].venue.location.lat, lng: this.state.venues[6].venue.location.lng}}
            onClick={this.onMarkerClick}
            name={this.state.venues[6].venue.name}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <img src="https://igx.4sqi.net/img/general/200x200/8uSHjM2c0CMLFVa8KRlNFiHNUHmY0TXP7CL60n_iXu8.jpg"></img>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "NPR0B5NCIDR2XXO5VKUCMVVCW5NLXOTKPR0QCV1XIEZ1XSY3",
      client_secret: "WGMEUGPZUFCS1RHYY4YMKWR4E53ZA02HZ1XIGZSV3O35GHBZ",
      query: "coffee",
      ll: "52.529186, 13.395621",
      v: "20180925",
      radius:	"1000"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
        venues: response.data.response.groups[0].items,
        status: "loaded" 
        })
      })
      .catch (error => {
        console.log("error!" + error)
      })
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAaMBXP1CkszdJ4cQalVTxyoJ5woUBD37Y"
})(App);
