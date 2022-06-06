

import React from "react";
import { withNavigation, withParams } from "../../utils/routeconf";
import Axios from "../../utils/Axios";
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';

class DeletionRequestForm extends React.Component{

    constructor(props){
        super(props)
      
        let req = {
            requestedDate: new Date(),
            reason: '',
            isReviewed: false,
            isDenied: false,
            denialReason: '',
            userId: 0

        }
        
        this.state ={
            req: req
                } 
    }

    componentDidMount(){
        this.getRequest(this.props.params.id)
        
    }

    getRequest(id){
        Axios.get('/delete/request/' + id)
                .then(res => {
                    console.log(res.data)
                    this.setState({req : res.data})
                })
                .catch(
                    err=>{
                        console.log(err)
                    }
                )
    }

   

    sendRequest(){

        Axios.post('/delete/request/decline/' + this.state.req.id, this.state.req)
        .then(res => {
            this.setState({req: res.data})
        }).catch(err => {
            alert('Failed')
            console.log(err)
        })
    }
    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let req = this.state.req
        req[name] = value
        console.log(value)
        this.setState({req: req})
    }
    cancel(){
        this.props.navigate('/deletionrequests')
        window.location.reload();
    }
    render(){
        return(
            <div>
            <Form.Label htmlFor="denialReason">Enter the reason for denial</Form.Label>
            
            <Form.Control as="textarea" name="denialReason" value={this.state.req.denialReason} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
            <button type="button" class="btn btn-danger" style={{marginTop: "10%", marginLeft: "55%"}} onClick={()=>{ this.sendRequest() }}>Confirm</button>
            <button type="button" class="btn outline-secondary" style={{marginLeft: "5%", marginTop: "10%"}}  onClick={()=>{ this.cancel() }}>Cancel</button>
                    
            </div>
        );
    }

}

export default withNavigation(withParams(DeletionRequestForm))