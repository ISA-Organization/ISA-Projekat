import React from "react";
import '../../index.css';
import Axios from "../../utils/Axios";
import {Button, Card, CardGroup, Modal} from 'react-bootstrap';

import {withParams, withNavigation} from '../../utils/routeconf';
import { useEffect, useState } from "react";
import axios from "axios";


class RatingList extends React.Component{
    


    constructor(props){
        super(props)
        let declineReason = "";
        this.state = {
            ratings: [],
            declined: false,
        }
    }
    componentDidMount(){
        console.log('I have mounted')
        this.getRatings()
        console.log()
    }

    getRatings(){
        let config = { params:{}}

        Axios.get('/ratings')
            .then(res => {
                console.log(res.data)
                this.setState({ratings: res.data})
            })
            .catch( err =>{
                 console.log(err)
            })
    }
    approveRating(id, r){
        console.log(id) 
        Axios.get('/ratings/approve/' + id)
        .then(res =>{
            this.props.navigate('/allratings')
            this.state.ratings.pop(r);
            window.location.reload(); 
        })
        .catch(err =>{
            alert("Failed!")
            console.log(err)
        })
    }
   
    declineRating(id, r){
        console.log(id);
        Axios.get('/ratings/decline/' + id, this.state.rating)
        .then(res =>{
            this.props.navigate('/allratings')
            this.state.ratings.pop(r);
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
    renderRatings(){
        console.log('Usao sam u render requests')
        console.log(this.state.reqs)
        return this.state.ratings.map((r) => {
            return(
                <div>
                <li class="list-group-item" key={r.id}>
                <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{r.description + ' ' + r.rating}</Card.Title>
                               <br></br>
                            
                            <Button variant="primary" class="mr-5" onClick={()=> this.approveRating(r.id,r )}>Approve</Button>
                            <Button variant="danger" onClick={()=> this.declineRating(r.id, r)}>Decline</Button>
                         
                           
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
                        <h1 class="display-4" style={{color: "black"}}>Ratings waiting for conformation</h1>
                    </div>
                </div>
                <div class="row">
                        <CardGroup>
                            {this.renderRatings()}
                            </CardGroup>
                </div>
               
            </div>
        )
    }
}


export default withNavigation(withParams(RatingList));
