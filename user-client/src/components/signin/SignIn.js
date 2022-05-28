import React from "react";
import { Form, Button, Row, Col, Container} from "react-bootstrap";
import '../../index.css';
import {withNavigation} from '../../utils/routeconf.js'
import {login} from '../../services/auth';
import Axios from '../../utils/Axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }

 
  goToSignUp(){
    this.props.navigate('/signup')
  }

  onInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let change = {};
    change[name] = value;
    this.setState(change);
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
              <Form.Label style={{textAlign: "left", marginBottom: "10px" }} >Email</Form.Label>
              <Form.Control type="email" style={{marginBottom:"10px"}} name="email" placeholder="Enter email" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <Form.Group mb={3}>
              <Form.Label style={{textAlign: "left",  marginBottom: "10px"}}>Password</Form.Label>
              <Form.Control style={{marginBottom:"5px"}} type="password" name="password"
               placeholder="Enter password" onChange = {(e) => this.onInputChange(e)} aria-describedby="passwordHelpBlock"/>
               
              </Form.Group>
            
            <br></br>
            <Form.Group mb={3}>

            <Button variant="success" onClick={() => {login(this.state.email, this.state.password)}} style={{marginLeft:"65px", width: "200px", marginBottom: "10px"}}>Sign in</Button>
            </Form.Group>

            <Form.Group mb={3}>
              <Button style={{marginLeft:"45px", color:"black"}} variant="link" onClick={() => this.goToSignUp()} muted>Not registered yet? Click Here!</Button>
              </Form.Group>
          </Form>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default withNavigation(SignIn);
