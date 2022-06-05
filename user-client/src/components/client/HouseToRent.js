import React from 'react'
import Axios from '../../utils/Axios'
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";

class HouseToRent extends React.Component{
    
    constructor(props){
        super(props)

        let house = {
            id: -1,
            name: "",
            address: "",
            description: "",
            numberOfRooms: 0,
            numberOfBeds: 0,
            rules: "",
            price: 0,
            latitude: 0, 
            longitude: 0
        }

        this.state = {
             house: house,
             additionalContent: []
        }
    }

    componentDidMount(){
        console.log('Uso sam u ovu komp')
        this.getHouseById(this.props.params.id)
        this.getAdditionalContentByHouseId(this.props.params.id)
   }

   getAdditionalContentByHouseId(id){
    Axios.get('/additionalContents/' + id)
        .then(res => {
            console.log(res.data)
            this.setState({additionalContent: res.data})
        })
        .catch(err =>{
            console.log(err)
        })
    }
    getHouseById(id){

        Axios.get('/houses/housetorent/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({house: res.data})
                console.log(this.state)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    goToCalendar(houseId){
        this.props.navigate('/calendar/' + houseId);
    }
   
    goToReservation(houseId){
        this.props.navigate('/newreservation/' + houseId);
        window.location.reload()
    }

    render(){
        return(
            <Row className="justify-content-center">
                <Col>
                    <h1 style={{color: "black", width: "75%"}}>House profile</h1>
                    <br></br>
                    <img style={{width: "90%", height:"30%", borderRadius: "8px"}} src={require('../../images/homePage.jpg')} alt="Image placeholder"/>
                    <MapContainer lat={this.state.house.latitude} lng={this.state.house.longitude}></MapContainer>
                </Col>

                <Col md={4}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control name="name" value={this.state.house.name} style={ {width: "100%"}} />
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control name="address" value={this.state.house.address} style={ {width: "100%"}} />
                    
                    <br></br>
                    <Form.Label htmlFor="numberOfRooms">Number of rooms:</Form.Label>
                    <Form.Control  name="numberOfRooms" value={this.state.house.numberOfRooms} style={ {width: "50%"}} />
                    <br></br>
                    <Form.Label htmlFor="numberOfBeds">Number of beds:</Form.Label>
                    <Form.Control name="numberOfBeds" value={this.state.house.numberOfBeds} style={ {width: "50%"}} />
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control name="price" value={this.state.house.price} style={ {width: "50%"}} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                            <button type="button" class="btn btn-outline-light" style={{marginLeft: "60%", marginTop: "5%"}} onClick={() => this.goToCalendar(this.state.house.id)}>View calendar</button>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.house.description} style={ {width: "100%", height: "20%"}} />
                                <br></br>
                                <Form.Label htmlFor="rules">House rules:</Form.Label>
                                <Form.Control as="textarea" name="rules" value={this.state.house.rules} style={ {width: "100%", height: "20%"}} />
                                <br></br>
                                <ul class="list-group list-group-light list-group-small" style={{width: "100%"}}>
                                {
                                    this.state.additionalContent.map((c) => {
                                        return (
                                            // <ListGroup.Item width="100">{c.name} {c.price}$</ListGroup.Item>
                                            <li class="list-group-item">{c.name} {c.price}$</li>
                                        )
                                    })
                                }
                                </ul>
                                <br></br>
                               <Button onClick={() => this.goToReservation(this.state.house.id)}>Make reservation</Button>
                            </Form.Group>
                            
                    </Col >
                    
                
                
                        
                            
            </Row>
        )
    }

}

export default withNavigation(withParams(HouseToRent))