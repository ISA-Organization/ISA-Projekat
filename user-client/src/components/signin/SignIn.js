import React from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import '../../index.css';
import {withNavigation} from '../../utils/routeconf.js'


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "" };
  }

 
  goToSignUp(){
    this.props.navigate('/signup')
  }
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={4}>      
          <Form>
           <h2>Sign in</h2>  
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter email" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <Form.Group>
            <br></br>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <br></br>
            <Button variant="success">Sign in</Button>
            <p>Don't have an account?<Button variant="link" onClick={() => this.goToSignUp()}>Signup</Button></p>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withNavigation(SignIn);
