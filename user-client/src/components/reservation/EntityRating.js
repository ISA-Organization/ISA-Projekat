

import React from "react";
import { withNavigation, withParams } from "../../utils/routeconf";
import Axios from "../../utils/Axios";
import {Button, Form, Row, Col, ListGroup, ButtonGroup} from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'

class EntityRating extends React.Component{

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

        let rating = {
            rating: 0,
            description: '',
            isApproved: false,
            userId: 0,
            entityId: 0
        }
        
        this.state ={
           user : user,
           rating: rating
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

        let req = this.state.rating
        req[name] = value

        this.setState({req: req})
    }

    cancel(){
        this.props.navigate('/client/reservationview')
    }

    handleRating(e){
        console.log(e)
        this.state.rating.rating = e/20
        console.log(this.state.rating);
    }
    sendRequest(){
        this.state.rating.userId = this.state.user.id
        this.state.rating.entityId = this.props.params.id
        console.log(this.state.rating)
        Axios.post('/ratings', this.state.rating)
        .then(res =>{
            this.setState({rating:res.data})
            console.log(res.data)
            this.props.navigate('/client/reservationview')
        }).catch(err => {
            console.log(err)
        })
    }
    render(){
        return(
            <div>
            <Form.Label htmlFor="rating">How would you rate your stay:</Form.Label>
            <br>
            </br>
            <Rating name="rating" onClick={(e) => this.handleRating(e)} ratingValue={this.state.rating.rating}  transition  allowHalfIcon />
            <br></br>

            <Form.Label htmlFor="description">How would you describe your stay:</Form.Label>
            <Form.Control as="textarea" name="description" value={this.state.rating.description} style={ {width: "100%", height: "20%"}} onChange={(e) => this.changeInputValue(e)}/>
            <button type="button" class="btn btn-danger" style={{marginTop: "10%", marginLeft: "55%"}} onClick={()=>{ this.sendRequest() }}>Rate</button>
            <button type="button" class="btn outline-secondary" style={{marginLeft: "5%", marginTop: "10%"}}  onClick={()=>{ this.cancel() }}>Cancel</button>
                    
            </div>
        );
    }

}

export default withNavigation(withParams(EntityRating))