import React from "react";
import '../../index.css';
import Axios from "../../utils/Axios";
import {Button, Card, CardGroup, Modal} from 'react-bootstrap';

import {withParams, withNavigation} from '../../utils/routeconf';
import { useEffect, useState } from "react";
import axios from "axios";


class ComplaintsList extends React.Component{
    


    constructor(props){
        super(props)
        let declineReason = "";
        this.state = {
            complaints: [],
            declined: false,
        }
    }
    componentDidMount(){
        console.log('I have mounted')
        this.getComplaints()
        console.log()
    }

    getComplaints(){
        let config = { params:{}}

        Axios.get('/complaints')
            .then(res => {
                console.log(res.data)
                this.setState({complaints: res.data})
            })
            .catch( err =>{
                 console.log(err)
            })
    }
    approveComplaint(id, r){
        console.log(id) 
        this.props.navigate('/complaint/respond/' + id)
        // Axios.get('/complaints/approve/' + id)
        // .then(res =>{
        //     this.props.navigate('/allratings')
        //     window.location.reload(); 
        // })
        // .catch(err =>{
        //     alert("Failed!")
        //     console.log(err)
        // })
    }
   
  
   
    renderRatings(){
        console.log('Usao sam u render requests')
        console.log(this.state.reqs)
        return this.state.complaints.map((r) => {
            return(
                <div>
                <li class="list-group-item" key={r.id}>
                <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{r.description + ' ' + r.rentingEntityId}</Card.Title>
                               <br></br>
                            
                            <Button variant="primary" class="mr-5" onClick={()=> this.approveComplaint(r.id,r )}>Respond</Button>
                         
                           
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
                        <h1 class="display-4" style={{color: "black"}}>Complaints waiting for responses</h1>
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


export default withNavigation(withParams(ComplaintsList));
