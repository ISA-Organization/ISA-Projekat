import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import { wait } from "@testing-library/user-event/dist/utils";

class SpecialOffers extends React.Component{

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
             specialOffers: [],
             user: user,
        }
    }

   async componentDidMount(){

     await  this.getUser();
        this.getSpecialOffers(this.props.params.id)

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
        Axios.get('/available/period/' + entityId)
            .then(res => {
                this.setState({specialOffers: res.data})
                console.log(this.state.specialOffers)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    makeReservation(offerId){

    }

    renderSpecialOffers(){
        return this.state.specialOffers.map((h) =>{
            return(
                <li class="list-group-item" key={h.id}>
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                        <h5 class="mt-0 font-weight-bold mb-2" style={{cursor:"pointer"}}><a>From {h.star} to {h.end}</a></h5>
                        <p class="font-italic text-muted mb-0 small">Special prica: {h.specialPrice}</p>
                        <div class="d-flex align-items-center justify-content-between mt-1">
                            <h6 class="font-weight-bold my-2">Price: $</h6>
                            <button type="button" class="btn btn-outline-primary" onClick={() => this.makeReservation(h.id)}>Make reservation</button>
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



export default withNavigation(withParams(SpecialOffers));