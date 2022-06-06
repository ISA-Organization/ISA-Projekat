import React from "react";
import '../../index.css';
import Axios from "../../utils/Axios";
import {Button, Card, CardGroup, Modal} from 'react-bootstrap';

import {withParams, withNavigation} from '../../utils/routeconf';
import { useEffect, useState } from "react";
import axios from "axios";


class PenaltyList extends React.Component{
    


    constructor(props){
        super(props)
        let declineReason = "";
        this.state = {
            reviews: [],
            declined: false,
        }
    }
    componentDidMount(){
        console.log('I have mounted')
        this.getReviews()
        console.log()
    }

    getReviews(){
        let config = { params:{}}

        Axios.get('/reviews')
            .then(res => {
                console.log(res.data)
                this.setState({reviews: res.data})
            })
            .catch( err =>{
                 console.log(err)
            })
    }
    approveReview(id){
        console.log(this.state.reviews)
        console.log(id) 
        Axios.get('/reviews/approve/' + id)
        .then(res =>{
            this.props.navigate('/allreviews')
            window.location.reload(); 
        })
        .catch(err =>{
            alert("Failed!")
            console.log(err)
        })
    }
   
    declineReview(id, r){
        console.log(id);
        Axios.get('/reviews/decline/' + id)
        .then(res =>{
            this.props.navigate('/allreviews')
            this.state.reviews.pop(r);
            window.location.reload(); 
        })
        .catch(err =>{
            alert("Failed!")
            console.log(err)
        })

        
    }
    changeInputValue(e){
        console.log(e.target.value)
      this.declineReason = e.target.value;
      console.log(this.declineReason)
    }
    renderReviews(){
        console.log('Usao sam u render requests')
        console.log(this.state.reqs)
        return this.state.reviews.map((r) => {
            return(
                <div>
                <li class="list-group-item" key={r.id}>
                <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{r.content + ' from ' + r.ownerId + ' wants a penalty ' + r.isBadComment + ' about ' + r.reservationId}</Card.Title>
                               <br></br>
                            
                            <Button variant="primary" class="mr-5" onClick={()=> this.approveReview(r.id)}>Approve</Button>
                            <Button variant="danger" onClick={()=> this.declineReview(r.id, r)}>Decline</Button>
                         
                           
                        </Card.Body>
                    </Card>
                  
                </li>
                <br></br>
                <br></br>
               
                </div>
                )
        })
    }

    render(){
        
        return(
            <div class="container py-5">
                <div class="row text-center text-white mb-5">
                    <div class="col-lg-7 mx-auto">
                        <h1 class="display-4" style={{color: "black"}}>Reviews waiting for conformation</h1>
                    </div>
                </div>
                <div class="row">
                        <CardGroup>
                            {this.renderReviews()}
                            </CardGroup>
                </div>
               
            </div>
        )
    }
}


export default withNavigation(withParams(PenaltyList));
