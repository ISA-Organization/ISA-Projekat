import React from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import '../../index.css';
import {withNavigation} from '../../utils/routeconf.js'


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    let types =[ "Client", "House owner", "Boat owner", "Instructor"]

    this.state = { username: "", password: "", registrationType: types };
  }

 
  goToSignUp(){
    this.props.navigate('/signup')
  }
  render() {
    return (
      <Row className="justify-content-center">
        <Col md={4}>
            <Form>
                <Form.Group>
                    <h2>Sign up</h2>
                    <br></br>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" placeholder="Enter city" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Label htmlFor="type">Registration type</Form.Label>
                    <Form.Control as="select">
                        <option></option>
                        {
                            this.state.registrationType.map((p) => {
                                return (
                                    <option>{p}</option>
                                )
                            })
                        }
                    </Form.Control><br/>
            </Form> 
        </Col>
           
        <Col md={4}>        
          <Form>
            <Form.Group>
                <br></br>
                <br></br>
                <br></br>
                <Form.Label>Telephone number</Form.Label>
                <Form.Control type="text" name="telNumber" placeholder="Enter telephone number" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter email" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <br></br>
            <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <br></br>
            <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <br></br>
            <br></br>
            <Button variant="success">Sign up</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withNavigation(SignIn);
