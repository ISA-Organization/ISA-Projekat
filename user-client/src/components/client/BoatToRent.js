import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf';
import MapContainer from "../maps/MapContainer";
import Swal from "sweetalert2";
import { Carousel, CarouselItem } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BoatToRent extends React.Component{
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
            boatOwnerId: -1,
           pictures: []

        }
        let reservation = {
            startDate: new Date(),
            endDate: new Date(),
            numberOfPeople: 0,
            numberOfDays: 0,
            price: 0.0,
            cancelled: false,
            entityId: -1,
            clientId: -1,
            ownerId: -1
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
             user: user,
             additionalContent: [],
             reservation: reservation
        }
    }
    setToImage(image){
            return "data:image/png;base64," + image;
          }
    componentDidMount(){

         this.getBoatById(this.props.params.id)
         this.getAdditionalContentByBoatId(this.props.params.id)
         this.getClientId()
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
                console.log(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    async getClientId(){
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

    goToCalendar(boatId){
        this.props.navigate('/calendar/' + boatId);
    }


    goToAdditionalContent(){
        this.props.navigate('/additionalContent/' + this.state.boat.id)
    }

    handleStartChange(e){
        console.log(e)
         this.setState({startDate: e})
         this.state.reservation.startDate = e;
         console.log(this.state.reservation)
     }

     handleEndChange(e){
         console.log(e)
         this.setState({endDate: e})
 
          this.state.reservation.endDate = e;
          console.log(this.state.reservation)
      }
  
      changeInputValue(e){
         const name = e.target.name
         const value = e.target.value
 
         let reservation = this.state.reservation
         reservation[name] = value
 
         this.setState({reservation: reservation})
         console.log(reservation)
     }
 
     makeReservation(id){
         this.state.reservation.numberOfDays = this.getDifferenceInDays(this.state.reservation.startDate, this.state.reservation.endDate)
         this.state.reservation.price = this.state.boat.price * this.state.reservation.numberOfDays;
         this.state.reservation.entityId = this.state.boat.id
         this.state.reservation.clientId = this.state.user.id
         
 
         let reser = this.state.reservation
         reser.ownerId = this.state.boat.boatOwnerId
         this.setState({reservation: reser})
         console.log(this.state)
         if(this.state.boat.maxNumOfPeople >= this.state.reservation.numberOfPeople){
            Axios.post('/reservations/book' , this.state.reservation)
            .then( res =>{
                alert('Successfully made a reservation!')
                this.props.navigate('')
    
    
            }).catch(err =>{
                console.log(err)
                alert('Failed to reserve entity')
            })
         }
         else{
            alert('Exceeded max number of people')
         }

     }
     
     getDifferenceInDays(date1, date2){
         const diffInMs = Math.abs(date2 - date1);
         return Math.round(diffInMs / (1000 * 60 * 60 * 24));
     }

    render(){
        return(
            <Row className="justify-content-center">
                <Col md={3}>
                    <h1 style={{color: "black", width: "75%"}}>Boat profile</h1>
                    <br></br>
                    <Carousel>
                        {
                            this.state.boat.pictures.map((p) => {
                                console.log(this.state.boat)
                                return(
                                    <CarouselItem>
                                        <img className="d-block w-100"  src={this.setToImage(p)}/>

                                    </CarouselItem>
                                )
                            })
                        }
                    </Carousel>
                                       <MapContainer lat={this.state.boat.latitude} lng={this.state.boat.longitude}></MapContainer>
                </Col>

                <Col md={3}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control disabled readonly name="name" value={this.state.boat.name} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control disabled readonly name="address" value={this.state.boat.address} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    
                    <br></br>
                    <Form.Label htmlFor="type">Type:</Form.Label>
                    <Form.Control disabled readonly name="type" value={this.state.boat.type} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="length">Length:</Form.Label>
                    <Form.Control disabled readonly name="length" value={this.state.boat.length} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control disabled readonly name="price" value={this.state.boat.price} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="maxNumOfPeople">Max number od people:</Form.Label>
                    <Form.Control disabled readonly name="maxNumOfPeople" value={this.state.boat.maxNumOfPeople} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
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
                                <Form.Control disabled readonly name="enginePower" value={this.state.boat.enginePower} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                            <br></br>
                            <Form.Label htmlFor="maxSpeed">Max speed:</Form.Label>
                                <Form.Control disabled readonly name="maxSpeed" value={this.state.boat.maxSpeed} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="navigation">Navigation:</Form.Label>
                                <Form.Control disabled readonly name="navigation" value={this.state.boat.navigation} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="fishingEquipment">Fishing equipment:</Form.Label>
                                <Form.Control disabled readonly name="fishingEquipment" value={this.state.boat.fishingEquipment} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                                <Form.Control disabled readonly name="cancellationPolicy" value={this.state.boat.cancellationPolicy} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                          
                                </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <button type="button" class="btn btn-outline-light" style={{marginLeft: "40%"}} onClick={() => this.goToCalendar(this.state.boat.id)}>View calendar</button>
                                <Form.Label htmlFor="description" style={{marginTop: "5%"}}>Description:</Form.Label>
                                <Form.Control disabled readonly as="textarea" name="description" value={this.state.boat.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rentingRules">Boat rules:</Form.Label>
                                <Form.Control disabled readonly as="textarea" name="rentingRules" value={this.state.boat.rentingRules} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
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
                               
                                <Form.Label htmlFor="startDate">Reservation start date:</Form.Label>
                                <DatePicker name="startDate" selected={this.state.reservation.startDate} minDate={new Date()} onChange={(e) => this.handleStartChange(e)}/>
                                
                                    <Form.Label htmlFor="endDate">Reservation start date:</Form.Label>
                                    
                                    
                                    <DatePicker name="endDate" selected={this.state.reservation.endDate} minDate={this.state.reservation.startDate} onChange={(e) => this.handleEndChange(e)}></DatePicker>
                                    <Form.Label htmlFor="numberOfPeople">Number of people:</Form.Label>
                                <Form.Control name="numberOfPeople" value={this.state.reservation.numberOfPeople} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                {this.state.user.type === 'CLIENT' ?
                               [<Button onClick={() => this.makeReservation(this.state.boat.id)}>Make reservation</Button>] : null}                
                            </Form.Group>
                            
                    </Col >

            </Row>
        )
    }
}

export default withNavigation(withParams(BoatToRent));