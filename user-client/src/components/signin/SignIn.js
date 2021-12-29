import React from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import '../../index.css';
import {withNavigation} from '../../utils/routeconf.js'
import {login} from '../../services/auth';

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
      <Row className="justify-content-center">
        <Col md={6}>      
          <Form>
           <h2 className="display-4" style={{marginLeft: "15%"}}>Sign in</h2>  
           <br></br>
            <div className="form-inline" style={{marginBottom: "5%"}}>
              <Form.Label style={{marginRight: "5%", width: "70px"}}>Email</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter email" onChange = {(e) => this.onInputChange(e)}/>
            </div>

            <div className="form-inline">
              <Form.Label style={{marginRight: "5%", width: "70px", textAlign: "left"}}>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter password" onChange = {(e) => this.onInputChange(e)}/>
            </div>
            
            <br></br>
            <Button variant="success" onClick={() => {login(this.state.email, this.state.password)}} style={{marginLeft: "45%", marginBottom: "3%"}}>Sign in</Button>
            <div className="form-inline">
              <Form.Label style={{marginLeft: "10%"}}>Don't have an account?</Form.Label>
              <Button variant="link" onClick={() => this.goToSignUp()}>Signup</Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withNavigation(SignIn);
