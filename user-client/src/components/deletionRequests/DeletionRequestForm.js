

import React from "react";
import { withNavigation, withParams } from "../../utils/routeconf";
import Axios from "../../utils/Axios";
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';

class DeletionRequestForm extends React.Component{

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
        let req = {
            requestedDate: new Date(),
            reason: '',
            isReviewed: false,
            isDenied: false,
            denialReason: '',
            userId: 0

        }
        
        this.state ={
            req: req,
           user : user
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

        let req = this.state.req
        req[name] = value

        this.setState({req: req})
    }

    sendRequest(){
        this.state.req.userId = this.state.user.id;

        Axios.post('/delete/request', this.state.req)
        .then(res => {
            this.setState({req: res.data})
            this.props.navigate('/profile')
        }).catch(err => {
            alert('Failed')
            console.log(err)
        })
    }

    cancel(){
        this.props.navigate('/profile')
        window.location.reload();
    }
    render(){
        return(
            <div>
            <Form.Label htmlFor="reason">Why do you wanna delete your account:</Form.Label>
            <Form.Control as="textarea" name="reason" value={this.state.req.reason} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
            <button type="button" class="btn btn-danger" style={{marginTop: "10%", marginLeft: "55%"}} onClick={()=>{ this.sendRequest() }}>Confirm</button>
            <button type="button" class="btn outline-secondary" style={{marginLeft: "5%", marginTop: "10%"}}  onClick={()=>{ this.cancel() }}>Cancel</button>
                    
            </div>
        );
    }

}

export default withNavigation(withParams(DeletionRequestForm))