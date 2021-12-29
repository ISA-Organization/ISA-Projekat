import React from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import '../../index.css';
import Axios from "../../utils/Axios";
import {withNavigation} from '../../utils/routeconf.js'

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    let types =[ "Client", "House owner", "Boat owner", "Instructor"]

    let user ={
      email: "",
      name: "",
      surname: "",
      address: "",
      city: "",
      phoneNumber: "",
      type: "",
      password: "",
      confirmPassword: ""
    }

    this.state = { username: "", password: "", registrationType: types, user: user };
  }

  signUp(){

    Axios.post('/users', this.state.user)
      .then(res=>{
        alert("Registration successful!")
          this.props.navigate('/signin')
          window.location.reload()
      })
      .catch(err=>{
        alert("Registration failed")
        console.log(err)
      })
  }

  onInputChange(e){
    const name = e.target.name
    const value = e.target.value

    let u = this.state.user

    u[name] = value
    this.setState({user: u})
  }

  render() {
    return (
      <Row className="justify-content-center">
        <Col md={4}>
            <Form>
                <h2 className="display-4">Sign up</h2>
                <Form.Group>
                    <br></br>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter first name" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" name="surname" placeholder="Enter last name" onChange = {(e) => this.onInputChange(e)}/>
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
                <Form.Label>Telephone number</Form.Label>
                <div className="form-inline">
                  <Form.Control type="text" name="phoneNumber" placeholder="Enter telephone number" onChange = {(e) => this.onInputChange(e)}/>  
                  <Button variant="success" onClick={() => this.signUp()} style={{marginLeft: "10%"}}>Sign up</Button>
                </div>
            </Form> 
        </Col>
           
        <Col md={4}>        
          <Form>
            <Form.Group>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Form.Label htmlFor="type">Registration type</Form.Label>
                    <Form.Control as="select" name="type" onChange={(e)=>this.onInputChange(e)}>
                        <option></option>
                        {
                            this.state.registrationType.map((p) => {
                                return (
                                    <option key = {Math.random()} value={p.toUpperCase().replace(/\s/g, '_')}>{p}</option>
                                )
                            })
                        }
                    </Form.Control>
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
            <Form.Control type="password" name="confirmPassword" placeholder="Enter password" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withNavigation(SignIn);
