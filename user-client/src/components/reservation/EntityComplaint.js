

import React from "react";
import { withNavigation, withParams } from "../../utils/routeconf";
import Axios from "../../utils/Axios";
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';

class EntityComplaint extends React.Component{

    constructor(props){
        super(props)
        let user = {
            id: 0,
            address: '',
             city: '',
             email: '',
             name: '',
             phoneNumber:'',
             surname:'',
             approved : false,
             type: null
        }

        let complaint = {
            complaint: 0,
            description: '',
            response: '',
            userId: 0,
            rentingEntityId: 0
        }
        
        this.state ={
           user : user,
           complaint: complaint
        } 
    }

    componentDidMount(){
        console.log(localStorage.getItem('jwt'))
        this.getProfile()
        
    }

    getProfile(){
        let config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
                }
        Axios.get('/users/profile', config)
                .then(res => {
                    console.log(res.data)
                    this.setState({user : res.data})
                })
                .catch(
                    err=>{
                        console.log(err)
                    }
                )
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let req = this.state.complaint
        req[name] = value

        this.setState({complaint: req})
    }

    cancel(){
        this.props.navigate('/client/reservationview')
    }

    
    sendRequest(){
        this.state.complaint.userId = this.state.user.id
        this.state.complaint.rentingEntityId = this.props.params.id
        Axios.post('/complaints', this.state.complaint)
        .then(res =>{
            this.setState({complaint:res.data})
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    render(){
        return(
            <div>
            <Form.Label htmlFor="description">What do you have to complain about ?</Form.Label>
           

            <Form.Control as="textarea" name="description" value={this.state.complaint.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
            <button type="button" class="btn btn-danger" style={{marginTop: "10%", marginLeft: "55%"}} onClick={()=>{ this.sendRequest() }}>Send Complaint</button>
            <button type="button" class="btn outline-secondary" style={{marginLeft: "5%", marginTop: "10%"}}  onClick={()=>{ this.cancel() }}>Cancel</button>
                    
            </div>
        );
    }

}

export default withNavigation(withParams(EntityComplaint))