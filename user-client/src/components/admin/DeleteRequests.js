import React from "react";
import '../../index.css';
import Axios from "../../utils/Axios";
import {Button, Card, CardGroup, Modal} from 'react-bootstrap';

import {withParams, withNavigation} from '../../utils/routeconf';
import { useEffect, useState } from "react";
import axios from "axios";


class DeleteRequests extends React.Component{
    


    constructor(props){
        super(props)
        let declineReason = "";
        this.state = {
            reqs: [],
            declined: false,
        }
    }
    componentDidMount(){
        console.log('I have mounted')
        this.getReqs()
    }

     getReqs(){
        let config = { params:{}}

        Axios.get('/delete/request/all')
            .then(res => {
                console.log(res.data)
                this.setState({reqs: res.data})
            })
            .catch( err =>{
                 console.log(err)
            })
    }
    approveRequest(id){
        console.log(id) 
        Axios.get('/delete/request/approve/' + id)
        .then(res =>{
            this.props.navigate('/users')
            window.location.reload(); 
        })
        .catch(err =>{
            alert("Failed!")
            console.log(err)
        })
    }
   
    declineAccount(id){
        console.log(id);
       this.props.navigate('/delete/request/' + id)
       window.location.reload()

        
    }
    changeInputValue(e){
        console.log(e.target.value)
      this.declineReason = e.target.value;
      console.log(this.declineReason)
    }
    renderReqs(){
        console.log('Usao sam u render requests')
        console.log(this.state.reqs)
        return this.state.reqs.map((r) => {
            return(
                <div>
                <li class="list-group-item" key={r.id}>
                <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{r.reason + ' ' + r.requestedDate}</Card.Title>
                               
                            <Button variant="primary" class="mr-5" onClick={()=> this.approveRequest(r.id)}>Approve</Button>
                            <Button variant="danger" onClick={()=> this.declineAccount(r.id)}>Decline</Button>
                         
                           
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
                        <h1 class="display-4" style={{color: "black"}}>Accounts waiting for conformation</h1>
                    </div>
                </div>
                <div class="row">
                        <CardGroup>
                            {this.renderReqs()}
                            </CardGroup>
                </div>
               
            </div>
        )
    }
}


export default withNavigation(withParams(DeleteRequests));
