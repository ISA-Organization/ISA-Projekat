import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class PasswordChange extends React.Component{

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

        let info = {
            email: '',
            oldPassword: '',
            password: '',
            passwordConfirm: ''
        }

        this.state = {
            user: user,
            info: info
        }
    }

    componentDidMount(){
        this.getUser(this.props.params)
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

     changePass(){

        this.state.info.email = this.state.user.email;
        
        Axios.put('/users/pass/' + this.state.user.id, this.state.info)
            .then(res => {
                alert("Successfully changed!")
                
                    this.props.navigate('/profile')
                
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let info = this.state.info
        info[name] = value

        this.setState({info: info})
        console.log(this.state)
    }

    render(){
        return(
            <Row>
                <Col></Col>
                <Col md={4}>
                    <h1 style={{color: "black"}}>Change password</h1>
                    <br></br>
                    <Form.Label htmlFor="password">New password:</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Enter new password" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="passwordConfirm">Confirm new password:</Form.Label>
                    <Form.Control name="passwordConfirm" type="password" placeholder="Enter new password"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                   
                    <br></br>
                    <Form.Label htmlFor="oldPassword">Old password:</Form.Label>
                    <Form.Control name="oldPassword" type="password" placeholder="Enter old password"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <button type="button" class="btn btn-outline-primary" style={{ width: "100%"}} onClick={()=>{ this.changePass() }}>Edit</button>
                </Col>
                <Col></Col>   
            </Row>
        )
    }
}

export default withNavigation(withParams(PasswordChange));