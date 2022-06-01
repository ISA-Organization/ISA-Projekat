import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf';
import MapContainer from "../maps/MapContainer";


class EditHouse extends React.Component{

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
            lat: 45.258800, //Stevana Milovanova 3
            lng: 19.850940
        }

        this.state = {
             house: house,
             additionalContent: []
        }
    }

    componentDidMount(){

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

        Axios.get('/houses/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({house: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    editHouse(){
        Axios.put('/houses/' + this.state.house.id, this.state.house)
            .then(res => {
                alert("Successfully edited!")
                this.props.navigate('/houses')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    deleteHouse(){
        Axios.delete('/houses/' + this.state.house.id)
            .then(res =>{
                alert("Successfully deleted!")
                this.props.navigate('/houses')
            })
            .catch(err=>{
                alert("Failed!")
                console.log(err)
            })
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let house = this.state.house
        house[name] = value

        this.setState({house: house})
    }

    goToCalendar(houseId){
        this.props.navigate('/calendar/' + houseId);
    }


    goToAdditionalContent(){
        this.props.navigate('/additionalContent/' + this.state.house.id)
    }

    render(){
        return(
            <Row className="justify-content-center">
                <Col>
                    <h1 style={{color: "black", width: "75%"}}>House profile</h1>
                    <br></br>
                    <img style={{width: "90%", height:"30%", borderRadius: "8px"}} src={require('../../images/homePage.jpg')} alt="Image placeholder"/>
                    <MapContainer lat={45.258800} lng={19.850940}></MapContainer>
                </Col>

                <Col md={4}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control name="name" value={this.state.house.name} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control name="address" value={this.state.house.address} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    
                    <br></br>
                    <Form.Label htmlFor="numberOfRooms">Number of rooms:</Form.Label>
                    <Form.Control  name="numberOfRooms" value={this.state.house.numberOfRooms} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="numberOfBeds">Number of beds:</Form.Label>
                    <Form.Control name="numberOfBeds" value={this.state.house.numberOfBeds} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control name="price" value={this.state.house.price} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    </Form.Group>
                </Col>
                <Col md={4}>
                            <button type="button" class="btn btn-outline-light" style={{marginLeft: "60%", marginTop: "5%"}} onClick={() => this.goToCalendar(this.state.house.id)}>View calendar</button>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.house.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">House rules:</Form.Label>
                                <Form.Control as="textarea" name="rules" value={this.state.house.rules} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="additionalContent"><button type="button" class="btn btn-outline-light btn-sm" onClick={()=> this.goToAdditionalContent()}>+</button>     Additional content (price per day):</Form.Label>
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
                                <button type="button" class="btn btn-primary" style={{marginTop: "10%", marginLeft: "55%"}} onClick={()=>{ this.editHouse() }}>Edit</button>
                                <button type="button" class="btn btn-danger" style={{marginLeft: "5%", marginTop: "10%"}}  onClick={()=>{ this.deleteHouse() }}>Delete</button>
                    
                            </Form.Group>
                            
                    </Col >
                    
                
                
                        
                            
            </Row>
        )
    }
}

export default withNavigation(withParams(EditHouse));