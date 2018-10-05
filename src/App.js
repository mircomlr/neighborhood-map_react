import React, { Component } from 'react';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from 'axios';
import Filter from './Components/Filter'

class App extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      venues: [],
      status: "initial",
      filteredVenues: [],
      kwery: ''
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onNameClick(coffeePlace) {
    console.log("onNameClick:", coffeePlace)
    this.setState({
      selectedPlace: coffeePlace.venue,
      filteredVenues: [coffeePlace]
    });
  }
  componentDidMount() {
    this.getVenues()
  }
  updateQuery = (kwery) => {
    this.setState({ kwery })
    if (kwery) {
      console.log('state.venues:', this.state.venues)
      console.log('query:', kwery)
      console.log('filtered:', this.state.filteredVenues)
      this.setState({
        filteredVenues: this.state.venues
        .filter((venue) => venue.venue.name
            .toLowerCase()
            .indexOf(kwery.toLowerCase()) === 0)
      })
    } else {
      this.setState({
        filteredVenues: this.state.venues,
        selectedPlace: {}
      })
    }
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
        <div className="box-container">
        <Map
          google={this.props.google}
          initialCenter={{
            lat: 52.529715,
            lng: 13.401338
          }}
          zoom={15}
          className='map'
        >         
          {console.log(this.state.selectedPlace)}             
              {this.state.filteredVenues.map( coffeePlace =>                
                <Marker
                key={coffeePlace.venue.id}
                position={{lat: coffeePlace.venue.location.lat, lng: coffeePlace.venue.location.lng}}
                onClick={this.onMarkerClick}
                name={coffeePlace.venue.name}
                address={coffeePlace.venue.location.address}                
                />
                )
              }
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <h4>{this.state.selectedPlace.address}</h4>
              <p>Data provided by www.foursquare.com.</p>
            </div>
          </InfoWindow>
        </Map>  
          <div>
          <Filter 
            updateQuery={this.updateQuery}> 
          </Filter>
            
                <div
                  className='venue-list'>
                  {console.log(this.state.filteredVenues)}
                    {this.state.filteredVenues.map( coffeePlace =>
                      <div
                        key={coffeePlace.venue.id}
                        onClick={() => {
                          this.onNameClick(coffeePlace)}}
                          className='venue-list-name'
                      >
                      {coffeePlace.venue.name}
                      </div>
                    )}
                </div>
              }
          </div>
        </div>
      </div>
    );
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "NPR0B5NCIDR2XXO5VKUCMVVCW5NLXOTKPR0QCV1XIEZ1XSY3",
      client_secret: "WGMEUGPZUFCS1RHYY4YMKWR4E53ZA02HZ1XIGZSV3O35GHBZ",
      query: "coffee",
      ll: "52.529715, 13.401338",
      v: "20180925",
      radius:	"250",
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
        venues: response.data.response.groups[0].items,
        filteredVenues: response.data.response.groups[0].items,
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
