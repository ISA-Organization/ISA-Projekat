import React from 'react'
import Axios from "../../utils/Axios";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class FirstAdminLogin extends React.Component{
    constructor(props) {
        super(props);
    
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

      onInputChange(event) {
        let control = event.target;
    
        let name = control.name;
        let value = control.value;
    
        let change = {};
        change[name] = value;
        this.setState(change);
      }
      updatePassword(password){
        const config = { headers: {'Content-Type': 'application/json'} };
        Axios.put('/users/newpassword' +  password, config)
        .then(res => {
            alert("Successfully edited")
            this.props.navigate('/')
            window.location.reload();
        })
        .catch(err=>{
            alert("Failed to edit")
            console.log(err)
        });
      }
      render() {
        return (
          <Container fluid>
          <Row className="justify-content-center">
            <Col md={4}>      
              <Form>
               <h2 className="display-1" style={{ marginLeft:"30px"}} >Sign in</h2>  
               <br></br>
               <Form.Group mb={3}>
                  <Form.Label style={{textAlign: "left", marginBottom: "10px" }} >New passowrd</Form.Label>
                  <Form.Control type="email" style={{marginBottom:"10px"}} name="email" placeholder="Enter email" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <Form.Group mb={3}>
                  <Form.Label style={{textAlign: "left",  marginBottom: "10px"}}>Confirm password</Form.Label>
                  <Form.Control style={{marginBottom:"5px"}} type="password" name="password"
                   placeholder="Enter password" onChange = {(e) => this.onInputChange(e)} aria-describedby="passwordHelpBlock"/>
                   
                  </Form.Group>
                
                <br></br>
                <Form.Group mb={3}>
    
                <Button variant="success" onClick={() => {this.updatePassword(this.state.newPass)}} style={{marginLeft:"65px", width: "200px", marginBottom: "10px"}}>Sign in</Button>
                </Form.Group>
    
              
              </Form>
            </Col>
          </Row>
          </Container>
        );
    
}
}

export default withNavigation(FirstAdminLogin);