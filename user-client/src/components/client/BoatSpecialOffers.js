import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import { wait } from "@testing-library/user-event/dist/utils";

class BoatSpecialOffers extends React.Component{

    constructor(props){
        super(props)

        // let search = {
        //     name: "",
        //     price: -1
        // }

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
        this.state = {
             specialOffers: [],
             user: user,
             boat: boat,
             reservation: reservation
        }
    }

   async componentDidMount(){

     await  this.getUser();
        this.getSpecialOffers(this.props.params.id)
        this.getBoatById(this.props.params.id)

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
    getSpecialOffers(entityId){
        Axios.get('/available/period/specialOffers/' + entityId)
            .then(res => {
                this.setState({specialOffers: res.data})
                console.log(this.state.specialOffers)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    getBoatById(id){

        Axios.get('/boats/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({boat: res.data})
                
                console.log(this.state.boat)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    makeReservation(s){
        var selected = this.state.specialOffers.find(el => el.id = s.id)
        console.log(selected)
        this.state.reservation.startDate = new Date(selected.start)
        this.state.reservation.endDate = new Date(selected.end)
        this.state.reservation.numberOfDays = this.getDifferenceInDays(this.state.reservation.startDate, this.state.reservation.endDate)
        this.state.reservation.price = selected.specialPrice
        this.state.reservation.entityId = this.state.boat.id
        this.state.reservation.clientId = this.state.user.id
        this.state.reservation.numberOfPeople = this.state.boat.maxNumOfPeople
        
        console.log(this.state.reservation)
        let reser = this.state.reservation
        reser.ownerId = this.state.boat.boatOwnerId
        this.setState({reservation: reser})

        Axios.post('/reservations/book' , this.state.reservation)
            .then( res =>{
                Axios.delete('/available/period/' + selected.id).then(res =>{console.log(res)}).catch(err =>{console.log(err)})
                alert('Successfully made a reservation!')
                this.props.navigate('/boats/boattorent/' + this.state.boat.id)
            }).catch(err =>{
                console.log(err)
                alert('Failed to reserve entity')
            })

    }

    getDifferenceInDays(date1, date2){
        console.log(date1, date2)
        const diffInMs = Math.abs(date2 - date1);
        return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    }

    renderSpecialOffers(){
        return this.state.specialOffers.map((h) =>{
            return(
                <li class="list-group-item" key={h.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a>From {h.start} to {h.end}</a></h5>
                        <h6 class="font-italic my-2">Number of people: {this.state.boat.maxNumOfPeople}</h6>
                        <p class="font-italic text-muted mb-0 small">Regular price: {this.state.boat.price}$</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h5 class="font-weight-bold my-2">Special Price: {h.specialPrice}$</h5>
                            <button type="button" class="btn btn-outline-primary" onClick={() => this.makeReservation(h)}>Make reservation</button>
                         </div>
                    </div>
                </div> 
        
            </li> 
            )
        })
    }


    render(){
        return(
            <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4" style={{color: "black"}}>Special Offers</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        {/* <div className="form-inline">
                            <Form.Label style={{marginRight: "2%"}}>Name:</Form.Label>
                            <Form.Control name="name" placeholder="Search by name" style={{width: "25%", marginRight: "2%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Form.Label style={{marginRight: "2%"}}>Max price:</Form.Label>
                            <Form.Control name="price" placeholder="Search by price" style={{width: "25%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                            <Button onClick={()=> this.goToAddHouse()} style={{marginLeft: "7%"}}>Add new</Button>
                        </div>
                        <br></br> */}
                        <ul class="list-group shadow">
                            {this.renderSpecialOffers()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}



export default withNavigation(withParams(BoatSpecialOffers));