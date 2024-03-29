import React from 'react'
import Axios from '../../utils/Axios'
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
   
            reservation: reservation,
             house: house,
             user: user,
             additionalContent: [],
             selected: [],
             subscribed : subscribed
        }
    }

    componentDidMount(){
        console.log('Uso sam u ovu komp')
        this.getHouseById(this.props.params.id)
        this.getClientId()
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

    specialOffers(id){
        this.props.navigate('/house/specialOffers/' + id);
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
        Axios.get('/subscriptions/' + this.state.user.id + '/' + this.state.house.id)
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
        Axios.delete('/subscriptions/' + this.state.user.id + '/' + this.state.house.id)
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
        this.state.reservation.price = this.state.house.price * this.state.reservation.numberOfDays;
        this.state.reservation.entityId = this.state.house.id
        this.state.reservation.clientId = this.state.user.id
        

        let reser = this.state.reservation
        reser.ownerId = this.state.house.houseOwnerId
        this.setState({reservation: reser})
        console.log(this.state)

        if(this.state.house.numberOfBeds >= this.state.reservation.numberOfPeople){
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
                    <h1 style={{color: "black", width: "75%"}}>House profile</h1>
                    <br></br>
                    <img style={{width: "90%", height:"30%", borderRadius: "8px"}} src={require('../../images/homePage.jpg')} alt="Image placeholder"/>
                    <MapContainer lat={this.state.house.latitude} lng={this.state.house.longitude}></MapContainer>
                    <br></br>
                    {this.state.user.type === 'CLIENT' && !this.state.subscribed ?
                    [<Button onClick={() => this.subscribe(this.state.house.id)}>Subscribe</Button>] : null}
                    {this.state.user.type === 'CLIENT' && this.state.subscribed ?
                    [<button class="btn btn-danger" onClick={() => this.unsubscribe(this.state.house.id)}>Unsubscribe</button>] : null}
                </Col>

                <Col md={4}>
                    <Form.Group>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control disabled readonly name="name" value={this.state.house.name} style={ {width: "100%"}} />
                    <br></br>
                    <Form.Label htmlFor="address">Address:</Form.Label>
                    <Form.Control disabled readonly name="address" value={this.state.house.address} style={ {width: "100%"}} />
                    
                    <br></br>
                    <Form.Label htmlFor="numberOfRooms">Number of rooms:</Form.Label>
                    <Form.Control disabled readonly name="numberOfRooms" value={this.state.house.numberOfRooms} style={ {width: "50%"}} />
                    <br></br>
                    <Form.Label htmlFor="numberOfBeds">Number of beds:</Form.Label>
                    <Form.Control disabled readonly name="numberOfBeds" value={this.state.house.numberOfBeds} style={ {width: "50%"}} />
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control disabled readonly name="price" value={this.state.house.price} style={ {width: "50%"}} />
                    </Form.Group>
                </Col>
                <Col md={4}>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Form.Group>
                            <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control disabled readonly as="textarea" name="description" value={this.state.house.description} style={ {width: "100%", height: "20%"}} />
                                <br></br>
                                <Form.Label htmlFor="rules">House rules:</Form.Label>
                                <Form.Control disabled readonly as="textarea" name="rules" value={this.state.house.rules} style={ {width: "100%", height: "20%"}} />
                                <br></br>
                                <ul class="list-group list-group-light list-group-small" style={{width: "100%"}}>
                                {
                                    this.state.additionalContent.map((c) => {
                                        return (
                                            // <ListGroup.Item width="100">{c.name} {c.price}$</ListGroup.Item>
                                            <li class="list-group-item list-group-item-action">{c.name} {c.price}$</li>
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
                                [<Button onClick={() => this.makeReservation(this.state.house.id)}>Make reservation</Button>] : null}
                                {this.state.user.type === 'CLIENT' && this.state.user.approved === true ?
                                [<Button style={ {marginLeft:"10%"}} onClick={() => this.specialOffers(this.state.house.id)}>Special offers</Button>] : null}
                            </Form.Group>      
                    </Col >               
            </Row>
        )
    }

}

export default withNavigation(withParams(HouseToRent))