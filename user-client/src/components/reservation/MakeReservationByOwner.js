import React from 'react'
import Axios from '../../utils/Axios'
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MakeReservationByOwner extends React.Component{
    constructor(props){
        super(props)

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
            reservation: reservation,
            house: house
        }
    }
    componentDidMount(){
        //this.getHouseById()
    }
    getHouseById(){

        Axios.get('/houses/' + this.props.params.entityId)
            .then(res => {
                this.setState({house: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
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
     makeReservation(){
        this.state.reservation.numberOfDays = this.getDifferenceInDays(this.state.reservation.startDate, this.state.reservation.endDate)
        this.state.reservation.price = this.state.house.price * this.state.reservation.numberOfDays;
        this.state.reservation.entityId = this.state.house.id
        this.state.reservation.clientId = this.state.user.id
        

        let reser = this.state.reservation
        reser.ownerId = this.state.house.houseOwnerId
        this.setState({reservation: reser})
        console.log(this.state)

        Axios.post('/reservations/book' , this.state.reservation)
        .then( res =>{
            alert('Successfully made a reservation!')
            this.props.navigate('')


        }).catch(err =>{
            console.log(err)
            alert('Failed to reserve entity')
        })
    }
    getDifferenceInDays(date1, date2){
        const diffInMs = Math.abs(date2 - date1);
        return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    }
    render(){
        return(
            <div>
            <h1 style={{color: "black"}}>Add new reservation</h1>
            <br></br>
            <Form.Label htmlFor="startDate">Reservation start date:</Form.Label>
            <DatePicker name="startDate" selected={this.state.reservation.startDate} onChange={(e) => this.handleStartChange(e)}/>
            
                <Form.Label htmlFor="endDate">Reservation start date:</Form.Label>
                
                
                <DatePicker name="endDate" selected={this.state.reservation.endDate} onChange={(e) => this.handleEndChange(e)}></DatePicker>
                <Form.Label htmlFor="numberOfPeople">Number of people:</Form.Label>
            <Form.Control style={{width: "20%"}} name="numberOfPeople" value={this.state.reservation.numberOfPeople} onChange={(e) => this.changeInputValue(e)}/>
            <br></br>
            <Button onClick={() => this.makeReservation()}>Make reservation</Button>
        </div>
        )
    }
}

export default MakeReservationByOwner;
    