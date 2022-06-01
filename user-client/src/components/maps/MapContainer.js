import { Component } from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";

class MapContainer extends Component {
    constructor(props){
    
        super(props);
        
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
       }
    }

    render(){
        return(
            <Map google= {this.props.google} 
                style={{width: "75%", height: "50%", marginTop: "5%"}}
                zoom= {10}
                initialCenter={
                    {
                        lat: this.state.lat,
                        lng: this.state.lng
                    }
                }></Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAGcSN4JMNPgb4rQZ5QpoHoCZHj2h3b_eM"
})(MapContainer);