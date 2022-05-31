import React from 'react'
import Axios from '../../utils/Axios'
import {Form, Row, Col, Button} from 'react-bootstrap';

class HouseOwnerProfile extends React.Component {

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
        this.state ={
           user : user
        }
    }
    componentDidMount(){
        console.log(localStorage.getItem('jwt'))
        this.getProfile()
        
    }
    editUser(){
        Axios.put('/users/' + this.state.user.id, this.state.user)
                .then(res => {
                    alert("Successfully edited")
                })
                .catch(err=>{
                    alert("Failed to edit")
                    console.log(err)
                })
    
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

        let user = this.state.user
        user[name] = value

        this.setState({user: user})
        console.log(user[name])

    }


  render() {
    return(
        <Row className="justify-content-center">
        <Col md={4}>
            <h1 style={{color: "black", width: "75%"}}>User profile</h1>
            <br></br>
            <img style={{width: "100%", height:"40%", borderRadius: "8px"}} src={require('../../images/homePage.jpg')} alt="Image placeholder"/>
        </Col>

        <Col md={4}>
            <Form.Group>
            <br></br>
            <br></br>
            <br></br>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control name="name" value={this.state.user.name} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
            <br></br>
            <Form.Label htmlFor="surname">Surname:</Form.Label>
            <Form.Control name="surname" value={this.state.user.surname} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
            <br></br>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control name="email" value={this.state.user.email} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
            
            <br></br>
            <Form.Label htmlFor="address">Address:</Form.Label>
            <Form.Control  name="address" value={this.state.user.address} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
            <br></br>
            <Form.Label htmlFor="city">City:</Form.Label>
            <Form.Control name="city" value={this.state.user.city} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
            <br></br>
            <Form.Label htmlFor="price">Phone number:</Form.Label>
            <Form.Control name="price" value={this.state.user.phoneNumber} style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>

            </Form.Group>
        </Col>
        <Col>
            <button type="button" class="btn btn-outline-primary" style={{marginTop: "175%"}} onClick={()=>{ this.editUser() }}>Edit</button>
        </Col>
       
    </Row>
    )
  }
}

export default HouseOwnerProfile;