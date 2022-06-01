import { Component } from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";
import MapPicker from 'react-google-map-picker';
import { InfoWindow } from "google-maps-react";
import { Axios } from "axios";

class MapContainer extends Component {
    constructor(props){
    
        super(props);

        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            zoom: 15
       }
    }

    handleChangeLocation (lat, lng){

        this.setState({lat: lat})
        this.setState({lng: lng})
        window.localStorage.setItem('lat', lat)
        window.localStorage.setItem('long', lng)
      }

      handleChangeZoom (newZoom){

        this.setState({zoom: newZoom})
      }

    render(){
        return(
                <MapPicker
                    google= {this.props.google}
                    defaultLocation={{ lat: this.state.lat, lng: this.state.lng}}
                    zoom={15}
                    style={{height: "300px", width: "90%", marginTop: "5%"}}
                    onChangeLocation= {(lat, lng) => this.handleChangeLocation(lat, lng)}
                    onChangeZoom= {(zoom)=> this.handleChangeZoom(zoom)}
                    apiKey='AIzaSyAGcSN4JMNPgb4rQZ5QpoHoCZHj2h3b_eM'></MapPicker>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAGcSN4JMNPgb4rQZ5QpoHoCZHj2h3b_eM"
})(MapContainer);