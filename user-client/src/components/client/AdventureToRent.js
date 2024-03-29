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

class AdventureToRent extends React.Component{
    constructor(props){
        super(props)

        let adventure = {
            id: -1,
            name: "",
            address: "",
            description: "",
            instructorId:"",
            fishingEquipment: "",
            rules: "",
            price: 0,
            latitude: 0, 
            longitude: 0,
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
        let subscribed = false;

        this.state = {
            adventure: adventure,
            user: user,
            additionalContent: [],
            reservation: reservation,
            subscribed: subscribed
        }
    }

    componentDidMount(){

         this.getAdventureById(this.props.params.id)
         this.getAdditionalContentByAdventureId(this.props.params.id)
         this.getClientId()

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

    async getClientId(){
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
        }
        try{
			let result = await Axios.get("/users/profile", config);
			this.setState({
				user: result.data
			});
            this.check()
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

    goToCalendar(adventureId){
        this.props.navigate('/calendar/' + adventureId);
    }
    setToImage(image){
        return "data:image/png;base64," + image;
      }

    goToAdditionalContent(){
        this.props.navigate('/additionalContent/' + this.state.adventure.id)
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

     specialOffers(id){
        this.props.navigate('/adventure/specialOffers/' + id);
    }

    check(){
        Axios.get('/subscriptions/check/' + this.state.user.id + '/' + this.props.params.id)
            .then( res =>{
                this.setState({subscribed: true})
                console.log(this.state.subscribed)
            }).catch(err =>{
                console.log(err)
                this.setState({subscribed: false})
            })
    }

    subscribe(id){
        Axios.get('/subscriptions/' + this.state.user.id + '/' + this.state.adventure.id)
            .then( res =>{
                alert('Successfully subscribed!')
                this.setState({subscribed: true})
                console.log(this.state.subscribed)
            }).catch(err =>{
                console.log(err)
                alert('Failed to subscribe')
            })
    }

    unsubscribe(id){
        Axios.delete('/subscriptions/' + this.state.user.id + '/' + this.state.adventure.id)
            .then( res =>{
                alert('Successfully unsubscribed!')
                this.setState({subscribed: false})
                console.log(this.state.subscribed)
            }).catch(err =>{
                console.log(err)
                alert('Failed to unsubscribe')
            })
    }
 
     makeReservation(id){
         this.state.reservation.numberOfDays = this.getDifferenceInDays(this.state.reservation.startDate, this.state.reservation.endDate)
         this.state.reservation.price = this.state.adventure.price * this.state.reservation.numberOfDays;
         this.state.reservation.entityId = this.state.adventure.id
         this.state.reservation.clientId = this.state.user.id
         
 
         let reser = this.state.reservation
         reser.ownerId = this.state.adventure.instructorId
         this.setState({reservation: reser})
         console.log(this.state)
         if(this.state.adventure.maxNumberOfPeople >= this.state.reservation.numberOfPeople){
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
                    <br></br>
                    {this.state.user.type === 'CLIENT' && !this.state.subscribed ?
                    [<Button onClick={() => this.subscribe(this.state.adventure.id)}>Subscribe</Button>] : null}
                    {this.state.user.type === 'CLIENT' && this.state.subscribed ?
                    [<button class="btn btn-danger" onClick={() => this.unsubscribe(this.state.adventure.id)}>Unsubscribe</button>] : null}
                </Col>

                <Col md={4}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control disabled readonly name="name" value={this.state.adventure.name} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control disabled readonly name="address" value={this.state.adventure.address} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    
                    
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control disabled readonly name="price" value={this.state.adventure.price} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>

                      
                    <br></br>
                    <Form.Label htmlFor="fishingEquipment">Fishing equipment:</Form.Label>
                    <Form.Control disabled readonly name="fishingEquipment" value={this.state.adventure.fishingEquipment} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="maxNumberOfPeople">Max Number of People:</Form.Label>
                    <Form.Control disabled readonly name="maxNumberOfPeople" value={this.state.adventure.maxNumberOfPeople} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="cancellationPolicy">Cancellation policy:</Form.Label>
                    <Form.Control disabled readonly name="cancellationPolicy" value={this.state.adventure.cancellationPolicy} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                    </Form.Group>
                </Col>
                <Col md={4}>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control disabled readonly as="textarea" name="description" value={this.state.adventure.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">Adventure rules:</Form.Label>
                                <Form.Control disabled readonly as="textarea" name="rules" value={this.state.adventure.rules} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
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
                                <br></br>
                                
                                {this.state.user.type === 'CLIENT' && this.state.user.approved === true  ?
                                [<Button onClick={() => this.makeReservation(this.state.adventure.id)}>Make reservation</Button>] : null}
                                {this.state.user.type === 'CLIENT' && this.state.user.approved === true  ?
                                [<Button style={ {marginLeft:"10%"}} onClick={() => this.specialOffers(this.state.adventure.id)}>Special offers</Button>] : null}
                                </Form.Group>     
                    </Col >                
            </Row>
        )
    }
}

export default withNavigation(withParams(AdventureToRent))