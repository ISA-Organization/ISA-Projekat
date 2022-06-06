import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf';
import MapContainer from "../maps/MapContainer";
import Swal from "sweetalert2";
import { Carousel, CarouselItem } from "react-bootstrap";
import ImageUploader from "react-images-upload";
class EditAdventure extends React.Component{

    constructor(props){
        super(props)

        let adventure = {
            id: -1,
            name: "",
            address: "",
            description: "",
            fishingEquipment: "",
            rules: "",
            price: 0,
            latitude: 0, 
            longitude: 0,
            pictures: []
        }

        this.state = {
            adventure: adventure,
             additionalContent: [],
             reservations: []

        }
    }

    componentDidMount(){

         this.getAdventureById(this.props.params.id)
         this.getAdditionalContentByAdventureId(this.props.params.id)
         this.getReservationsByAdventureId(this.props.params.id)


    }

    getAdditionalContentByAdventureId(id){
        Axios.get('/additionalContents/' + id)
            .then(res => {
                this.setState({additionalContent: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    getReservationsByAdventureId(id){
        Axios.get('/reservations/upcoming/byEntity/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({reservations: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }


    getAdventureById(id){
        console.log('dobavljam avanturu')
        Axios.get('/adventures/' + id)
            .then(res => {
                this.setState({adventure: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    editAdventure(){
        this.fileArrayToBase64(this.state.pictures)

        let adventure = this.state.adventure
        adventure.latitude = window.localStorage['lat']
        adventure.longitude = window.localStorage['long']
        this.setState({adventure: adventure})
        
        Axios.put('/adventures/' + this.state.adventure.id, this.state.adventure)
            .then(res => {
                alert("Successfully edited!")
                this.props.navigate('/adventures')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    deleteAdventure(){

        if(this.state.reservations.length === 0){
            console.log("smes da brises")
            Axios.delete('/adventures/' + this.state.adventure.id)
            .then(res =>{
                alert("Successfully deleted!")
                this.props.navigate('/adventures')
            })
            .catch(err=>{
                alert("Failed!")
                console.log(err)
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Adventure has upcoming reservations!'
            });
        }
        
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let adventure = this.state.adventure
        adventure[name] = value

        this.setState({adventure: adventure})
    }

    goToCalendar(adventureId){
        this.props.navigate('/calendar/' + adventureId);
    }
    setToImage(image){
        return "data:image/png;base64," + image;
      }

    goToAdditionalContent(){
        this.props.navigate('/additionalContent/' + this.state.adventure.id)
    }

    
   
    render(){
        return(
            

            <Row className="justify-content-center">
                    
                <Col>
                    <h1 style={{color: "black", width: "75%"}}>Adventure profile</h1>
                    <br></br>
                    <Carousel>
                        {
                            this.state.adventure.pictures.map((p) => {
                                console.log(this.state.adventure)
                                return(
                                    <CarouselItem>
                                        <img className="d-block w-100"  src={this.setToImage(p)}>

                                        </img>
                                    </CarouselItem>
                                )
                            })
                        }
                    </Carousel>                    
                    <MapContainer lat={this.state.adventure.latitude} lng={this.state.adventure.longitude}></MapContainer>
                </Col>

                <Col md={4}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control name="name" value={this.state.adventure.name} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control name="address" value={this.state.adventure.address} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    
                    
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control name="price" value={this.state.adventure.price} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>

                      
                    <br></br>
                    <Form.Label htmlFor="fishingEquipment">Fishing equipment:</Form.Label>
                    <Form.Control name="fishingEquipment" value={this.state.adventure.fishingEquipment} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="maxNumberOfPeople">Max Number of People:</Form.Label>
                    <Form.Control name="maxNumberOfPeople" value={this.state.adventure.maxNumberOfPeople} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                    <Form.Control name="cancellationPolicy" value={this.state.adventure.cancellationPolicy} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    </Form.Group>
                </Col>
                <Col md={4}>
                            <button type="button" class="btn btn-outline-light" style={{marginLeft: "60%", marginTop: "5%"}} onClick={() => this.goToCalendar(this.state.adventure.id)}>View calendar</button>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.adventure.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">Adventure rules:</Form.Label>
                                <Form.Control as="textarea" name="rules" value={this.state.adventure.rules} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
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
                                <button type="button" class="btn btn-primary" style={{marginTop: "10%", marginLeft: "55%"}} onClick={()=>{ this.editAdventure() }}>Edit</button>
                                <button type="button" class="btn btn-danger" style={{marginLeft: "5%", marginTop: "10%"}}  onClick={()=>{ this.deleteAdventure() }}>Delete</button>
                    
                            </Form.Group>
                            
                    </Col >
                   

                
                        
                            
            </Row>
        )
    }
}

export default withNavigation(withParams(EditAdventure));