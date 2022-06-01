import React from 'react'
import Axios from "../../utils/Axios";
import { Form, Button, Row, Col, Container, FormGroup} from "react-bootstrap";
import {withParams, withNavigation} from '../../utils/routeconf'

class NewAdmin extends React.Component{


    constructor(props){
        super(props)
        let user ={
            email: "",
            name: "",
            surname: "",
            address: "",
            city: "",
            phoneNumber: "",
            type: "ADMIN",
            isApproved : false,
            password: "123",
            confirmPassword: "123"
          }
          this.state = {username: "", password: "", user: user}
    }

    addNewAdmin(){
        console.log(this.user)
        Axios.post('/users/newadmin', this.state.user)
        .then(res => {
            alert("Added new admin successfully");
            this.props.navigate('')
            window.location.reload()
        })
        .catch(err => {
            alert("Failed to register new admin")
            console.log(err);
        })
    }
    onInputChange(e){
        const name = e.target.name
        const value = e.target.value
    
        let u = this.state.user
    
        u[name] = value
        this.setState({user: u})
      }
    render(){
        return(
            <Container>
            <Row className="justify-content-center">
        <Col md={4}>
            <Form>
                <h2 className="display-4">Add new admin</h2>
                <Form.Group mb={3}>
                    <br></br>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter first name" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group mb={3}>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="surname" placeholder="Enter last name" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group mb={3}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group mb={3}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" placeholder="Enter city" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <FormGroup mb={3}>
                <Form.Label>Telephone number</Form.Label>
                  <Form.Control type="text" name="phoneNumber" placeholder="Enter telephone number" onChange = {(e) => this.onInputChange(e)}/>  
                </FormGroup>
                
            </Form> 
        </Col>
           
        <Col md={4}>    
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

          <Form >
         
            <Form.Group mb={3}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter email" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
           
           

            <FormGroup mb = {3}>
                <Button mx={"auto"} variant="success" onClick={() => this.addNewAdmin()} style={{marginTop:"55px", width:"342px"}}>Add new admin</Button>

            </FormGroup>
          </Form>
        </Col>
      </Row>
      </Container>
        );
    }
}

export default withNavigation(NewAdmin);
