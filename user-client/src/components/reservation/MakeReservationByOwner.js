import React from 'react'
import Axios from '../../utils/Axios'
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import MapContainer from "../maps/MapContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

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

        let selectedClient = {
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
            reservation: reservation,
            house: house,
            boat: boat,
            clients: [],
            selectedClient: selectedClient,
            entityType: ''
        }
    }
    componentDidMount(){

       this.getEntityType()
       this.getClients()
    }
        
    getEntityType(){
        Axios.get('/rentingEntities/' + this.props.params.entityId)
            .then(res => {
                this.setState({entityType: res.data})
                switch(res.data){
                    case "HOUSE":
                        this.getHouseById()
                    case "BOAT":
                        this.getBoatById()
                }
            })
            .catch(err =>{
                console.log(err)
            })
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
    getBoatById(){

        Axios.get('/boats/' + this.props.params.entityId)
            .then(res => {
                this.setState({boat: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }
    getClients(){

        Axios.get('/users/clients')
            .then(res => {
                this.setState({clients: res.data})
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
        this.state.reservation.clientId = this.state.selectedClient.id

        switch(this.state.entityType){
            case "HOUSE": 
                this.state.reservation.price = this.state.house.price * this.state.reservation.numberOfDays;
                this.state.reservation.entityId = this.state.house.id;
                let reserv1 = this.state.reservation;
                reserv1.ownerId = this.state.house.houseOwnerId;
                this.setState({reservation: reserv1});
                break;
               
            case "BOAT": 
                this.state.reservation.price = this.state.boat.price * this.state.reservation.numberOfDays;
                this.state.reservation.entityId = this.state.boat.id;
                let reserv2 = this.state.reservation
                reserv2.ownerId = this.state.boat.boatOwnerId
                this.setState({reservation: reserv2})
                break;
                
        }
        

        
        console.log(this.state.reservation)

        Axios.post('/reservations/book' , this.state.reservation)
        .then( res =>{
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Successfully made a reservation!'
            });
            this.props.navigate('/calendar/' + this.state.entityId )


        }).catch(err =>{
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to reserve entity!'
            });
        })
    }
    getDifferenceInDays(date1, date2){
        const diffInMs = Math.abs(date2 - date1);
        return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    }

    onChangeClient(e){

        let control = e.target;

        let name = control.name;
        let value = control.value;

        console.log(name)
        let client = this.state.selectedClient;
        client.id = value;
        this.setState({ selectedClient: client });
    }
    render(){
        return(
            <div>
            <h1 style={{color: "black"}}>Add new reservation</h1>
            <br></br>
             <Form.Group>    
                <Form.Label htmlFor="type">Client:</Form.Label>
                <Form.Control style={{width: "20%"}} as="select" name="id" value={this.state.selectedClient.id} onChange={(e)=> this.onChangeClient(e)}>
                    <option value={-1}></option>
                    {
                        this.state.clients.map((p) => {
                            return (
                                <option key = {p.id} value={p.id}>{p.name} {p.surname}</option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>   
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

export default withNavigation(withParams(MakeReservationByOwner));
    