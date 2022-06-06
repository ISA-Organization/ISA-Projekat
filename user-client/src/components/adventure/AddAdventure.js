import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";

class AddAdventure extends React.Component{

    constructor(props){
        super(props)

        let adventure = {
            name: "",
            address: "",
            description: "",
            rules: "",
            price: 0,
            type: "ADVENTURE",
            maxNumberOfPeople: 0,
            adventureOwnerId: 0, 
            fishingEquipment: '',
            cancellationPolicy: '',
            latitude: 45.267136, 
            longitude: 19.833549
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
             adventure: adventure,
             user: user
        }
    }

    componentDidMount(){
    }

    async addAdventure(){
        await this.getUser()

        let adventure = this.state.adventure
        adventure.instructorId = this.state.user.id
        this.setState({adventure: adventure})
        console.log(this.state.adventure)
        Axios.post('/adventures', this.state.adventure)
            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/adventures')
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

        let adventure = this.state.adventure
        adventure[name] = value

        this.setState({adventure: adventure})
    }

    render(){
        return(
            <Row>
                
                <Col md={4}>
                    <h1 style={{color: "black"}}>Add new adventure</h1>
                    <br></br>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Import picture</Card.Title>
                            <Card.Text>
                            Add profile picture here.
                            </Card.Text>
                            <Button variant="light">+</Button>
                        </Card.Body>
                    </Card>
                    <MapContainer lat={this.state.adventure.latitude} lng={this.state.adventure.longitude}></MapContainer>
                </Col>
                <Col md={4}>
                             <Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="name">Name:</Form.Label>
                                <Form.Control name="name" placeholder="Enter adventure name" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="address">Address:</Form.Label>
                                <Form.Control name="address"  placeholder="Enter adventure address" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>

                                <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                                <Form.Control as="textarea" name="cancellationPolicy" placeholder="Enter cancellation policy"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="fishingEquipment">Fishing Equipment:</Form.Label>
                                <Form.Control as="textarea" name="fishingEquipment" placeholder="Enter fishing equipment"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                
                            </Form.Group>
                </Col>
                <Col md={4}>
                            <Form.Group>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Form.Label htmlFor="price">Price:</Form.Label>
                                <Form.Control name="price" placeholder="Enter adventure price"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">Rules:</Form.Label>
                                <Form.Control as="textarea" name="rules" placeholder="Enter adventure rules"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Enter adventure description"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                
                                <button type="button" class="btn btn-primary" style={{marginTop: "2%", marginLeft: "80%"}} onClick={()=>{ this.addAdventure() }}>Add</button>
                            </Form.Group>
                </Col>
                        
                            
            </Row>
        )
    }
}

export default withNavigation(withParams(AddAdventure));