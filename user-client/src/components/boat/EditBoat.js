import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf';
import MapContainer from "../maps/MapContainer";


class EditBoat extends React.Component{

    constructor(props){
        super(props)

        let boat = {
            id: -1,
            name: "",
            address: "",
            description: "",
            rentingRules: "",
            price: 0,
            latitude: 0, 
            longitude: 0,
            type: '',
            length: 0,
            engineNumber: '',
            enginePower: 0,
            maxSpeed: 0,
            navigation: '',
            maxNumOfPeople: 0,
            fishingEquipment: '',
            cancellationPolicy: '',
            boatOwnerId: -1
        }

        this.state = {
             boat: boat,
             additionalContent: []
        }
    }

    componentDidMount(){

         this.getBoatById(this.props.params.id)
         this.getAdditionalContentByBoatId(this.props.params.id)


    }

    getAdditionalContentByBoatId(id){
        Axios.get('/additionalContents/' + id)
            .then(res => {
                this.setState({additionalContent: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    getBoatById(id){

        Axios.get('/boats/' + id)
            .then(res => {
                this.setState({boat: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    editBoat(){
        let boat = this.state.boat
        boat.latitude = window.localStorage['lat']
        boat.longitude = window.localStorage['long']
        this.setState({boat: boat})

        Axios.put('/boats/' + this.state.boat.id, this.state.boat)
            .then(res => {
                alert("Successfully edited!")
                this.props.navigate('/boats')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    deleteBoat(){
        Axios.delete('/boats/' + this.state.boat.id)
            .then(res =>{
                alert("Successfully deleted!")
                this.props.navigate('/boats')
            })
            .catch(err=>{
                alert("Failed!")
                console.log(err)
            })
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let boat = this.state.boat
        boat[name] = value

        this.setState({boat: boat})
    }

    goToCalendar(boatId){
        this.props.navigate('/calendar/' + boatId);
    }


    goToAdditionalContent(){
        this.props.navigate('/additionalContent/' + this.state.boat.id)
    }

    render(){
        return(
            <Row className="justify-content-center">
                <Col md={3}>
                    <h1 style={{color: "black", width: "75%"}}>Boat profile</h1>
                    <br></br>
                    <img style={{width: "90%", height:"20%", borderRadius: "8px"}} src={require('../../images/boat.jpg')} alt="Image placeholder"/>
                    <MapContainer lat={this.state.boat.latitude} lng={this.state.boat.longitude}></MapContainer>
                </Col>

                <Col md={3}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control name="name" value={this.state.boat.name} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control name="address" value={this.state.boat.address} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    
                    <br></br>
                    <Form.Label htmlFor="type">Type:</Form.Label>
                    <Form.Control  name="type" value={this.state.boat.type} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="length">Length:</Form.Label>
                    <Form.Control name="length" value={this.state.boat.length} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control name="price" value={this.state.boat.price} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="maxNumOfPeople">Max number od people:</Form.Label>
                    <Form.Control name="maxNumOfPeople" value={this.state.boat.maxNumOfPeople} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    </Form.Group>
                </Col>
                <Col md={3}>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="engineNumber">Engine number:</Form.Label>
                                <Form.Control name="engineNumber" value={this.state.boat.engineNumber} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="enginePower">Engine power:</Form.Label>
                                <Form.Control name="enginePower" value={this.state.boat.enginePower} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                            <br></br>
                            <Form.Label htmlFor="maxSpeed">Max speed:</Form.Label>
                                <Form.Control name="maxSpeed" value={this.state.boat.maxSpeed} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="navigation">Navigation:</Form.Label>
                                <Form.Control name="navigation" value={this.state.boat.navigation} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="fishingEquipment">Fishing equipment:</Form.Label>
                                <Form.Control name="fishingEquipment" value={this.state.boat.fishingEquipment} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                                <Form.Control name="cancellationPolicy" value={this.state.boat.cancellationPolicy} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                          
                                </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <button type="button" class="btn btn-outline-light" style={{marginLeft: "40%"}} onClick={() => this.goToCalendar(this.state.boat.id)}>View calendar</button>
                                <Form.Label htmlFor="description" style={{marginTop: "5%"}}>Description:</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.boat.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rentingRules">Boat rules:</Form.Label>
                                <Form.Control as="textarea" name="rentingRules" value={this.state.boat.rentingRules} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                        
                                <Form.Label htmlFor="additionalContent"><button type="button" class="btn btn-outline-light btn-sm" onClick={()=> this.goToAdditionalContent()}>+</button>    Additional content (per day):</Form.Label>
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
                                <button type="button" class="btn btn-primary" style={{marginTop: "10%", width: "100%"}} onClick={()=>{ this.editBoat() }}>Edit</button>
                                <button type="button" class="btn btn-outline-danger" style={{ width: "100%", marginTop: "5%"}}  onClick={()=>{ this.deleteBoat() }}>Delete</button>
                    
                            </Form.Group>
                            
                    </Col >

            </Row>
        )
    }
}

export default withNavigation(withParams(EditBoat));