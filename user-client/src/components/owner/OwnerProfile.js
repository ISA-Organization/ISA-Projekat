import React from 'react'
import Axios from '../../utils/Axios'
import {Form, Row, Col, Button} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf';

class OwnerProfile extends React.Component {

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

    sendDeleteRequest(userId){

    }

    changePassword(id){
        this.props.navigate('/users/pass/' + id)
    }


  render() {
    return(
        <Row className="justify-content-center">
        <Col md={4}>
            <h1 style={{color: "black", width: "75%", textAlign: "right"}}>User profile</h1>
            <button type="button" class="btn btn-outline-danger" onClick={() => { this.sendDeleteRequest(this.state.user.id)}} style={{marginTop: "5%", marginLeft: "15%", width: "50%"}}>Delete account</button>
            <button type="button" class="btn btn-outline-primary" onClick={() => { this.changePassword(this.state.user.id)}} style={{marginTop: "5%", marginLeft: "15%", width: "50%"}}>Change password</button>
       </Col>

        <Col md={4}>
            <Form.Group>
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
            <button type="button" class="btn btn-primary" style={{marginTop: "160%"}} onClick={()=>{ this.editUser() }}>Edit</button>
        </Col>       
    </Row>
    )
  }
}

export default withNavigation(withParams(OwnerProfile));