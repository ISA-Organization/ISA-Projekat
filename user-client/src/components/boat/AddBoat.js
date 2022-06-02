import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";

class AddBoat extends React.Component{

    constructor(props){
        super(props)

        let boat = {
            name: "",
            address: "",
            description: "",
            rentingRules: "",
            price: 0,
            latitude: 45.267136, 
            longitude: 19.833549,
            type: '',
            length: 0,
            engineNumber: '',
            enginePower: 0,
            maxSpeed: 0,
            navigation: '',
            maxNumOfPeople: 0,
            fishingEquipment: '',
            cancellationPolicy: '',
            rentingEntityType: "BOAT",
            boatOwnerId: -1
        }
        let user = {
            id: 0,
            address: '',
             city: '',
             email: '',
             name: '',
             phoneNumber:'',
             surname:'',
             approved : false,
             type: ''
        }

        this.state = {
             boat: boat,
             user: user
        }
    }

    componentDidMount(){
    }

    async addBoat(){
        await this.getUser()

        let boat = this.state.boat
        boat.boatOwnerId = this.state.user.id
        this.setState({boat: boat})
        console.log(this.state)
        Axios.post('/boats', this.state.boat)
            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/boats')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    async getUser(){
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        }
        try{
			let result = await Axios.get("/users/profile", config);
			this.setState({
				user: result.data
			});
		  }
		  catch (error){
			console.log(error);
		  }
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let boat = this.state.boat
        boat[name] = value

        this.setState({boat: boat})
    }

    render(){
        return(
            <Row>
                
                <Col md={3}>
                    <h1 style={{color: "black"}}>Add new boat</h1>
                    <br></br>
                    <Card style={{ width: "90%", height: "30%" }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Import picture</Card.Title>
                            <Card.Text>
                            Add profile picture here.
                            </Card.Text>
                            <Button variant="light">+</Button>
                        </Card.Body>
                    </Card>
                    <MapContainer lat={this.state.boat.latitude} lng={this.state.boat.longitude}></MapContainer>
                </Col>
                <Col md={3}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control name="name" style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control name="address"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    
                    <br></br>
                    <Form.Label htmlFor="type">Type:</Form.Label>
                    <Form.Control  name="type"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="length">Length:</Form.Label>
                    <Form.Control name="length" style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control name="price"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="maxNumOfPeople">Max number od people:</Form.Label>
                    <Form.Control name="maxNumOfPeople" style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    </Form.Group>
                </Col>
                <Col md={3}>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="engineNumber">Engine number:</Form.Label>
                                <Form.Control name="engineNumber"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="enginePower">Engine power:</Form.Label>
                                <Form.Control name="enginePower"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                            <br></br>
                            <Form.Label htmlFor="maxSpeed">Max speed:</Form.Label>
                                <Form.Control name="maxSpeed"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="navigation">Navigation:</Form.Label>
                                <Form.Control name="navigation"  style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="fishingEquipment">Fishing equipment:</Form.Label>
                                <Form.Control name="fishingEquipment" style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                                <Form.Control name="cancellationPolicy" style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                          
                                </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.boat.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rentingRules">Boat rules:</Form.Label>
                                <Form.Control as="textarea" name="rentingRules" value={this.state.boat.rentingRules} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <button type="button" class="btn btn-primary" style={{marginTop: "10%", width: "100%"}} onClick={()=>{ this.addBoat() }}>Add</button>
                             
                            </Form.Group>
                            
                    </Col >

            </Row>
        )
    }
}

export default withNavigation(withParams(AddBoat));