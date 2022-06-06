import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import { wait } from "@testing-library/user-event/dist/utils";

class ClientReservationView extends React.Component{

    constructor(props){
        super(props)

        // let search = {
        //     name: "",
        //     price: -1
        // }
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
             reservations: [],
             user: user
        }
    }

   async componentDidMount(){

     await  this.getUser();
        this.getReservations()

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
    getReservations(){
        let id = this.state.user.id;
        console.log(this.state.user)
        Axios.get('/reservations/byClient/'+ id)
            .then(res => {
                this.setState({reservations: res.data})
                console.log(this.state.reservations)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    goToEntityRating(id){
        console.log(id)
        this.props.navigate('/entity/rate/' + id)
    }
    goToComplaint(id){
        console.log(id)
        this.props.navigate('/entity/complaint/' + id)
    }

    renderReservations(){
        return this.state.reservations.map((h) =>{
            return(
                <li class="list-group-item" key={h.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a>From {h.startDate} to {h.endDate}</a></h5>
                        <p class="font-italic text-muted mb-0 small">Number of people: {h.numberOfPeople}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">Price: ${h.price}</h6>
                            {
                                isReservationOver(h) ? 
                                <div>
                                <button type="button" class="btn btn-outline-primary" onClick={() => this.goToComplaint(h.id)}>Have a complaint?</button>
                                <button type="button" class="btn btn-outline-primary" onClick={() => this.goToEntityRating(h.id)}>Rate your stay</button>
                                </div>
                                : null
                            }
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
                        <h1 class="display-4" style={{color: "black"}}>Reservations history</h1>
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
                            {this.renderReservations()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}


function isReservationOver(reservation){
   
        let syear = reservation['endDate'].split('-')[0]
        let smonth = reservation['endDate'].split('-')[1]
        let sday1 = reservation['endDate'].split('-')[2]
        let endDate = new Date(syear, smonth, sday1)
        console.log(endDate)
        if(endDate < new Date()){
            console.log('Jeste')
            return true;
        }else{
            console.log('nije')

            return false;
        }
    }



export default withNavigation(withParams(ClientReservationView));