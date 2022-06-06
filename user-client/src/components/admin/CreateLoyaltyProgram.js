import React from 'react'
import Axios from "../../utils/Axios";
import { Form, Button, Row, Col, Container, FormGroup} from "react-bootstrap";
import {withParams, withNavigation} from '../../utils/routeconf'

class CreateLoyaltyProgram extends React.Component{


    constructor(props){
        super(props)
        let loyaltyProgram ={
            pointsForBronze: 0,
            percentForBronze: 0,
            pointsForSilver: 0,
            percentForSilver: 0,
            pointsForGold: 0,
            percentForGold: 0,
            pointsForUser: 0,
            pointsForOwner :0,
            percentageForApp:0
            
          }
          this.state = {loyaltyProgram : loyaltyProgram}
    }

    addNewLoyaltyProgram(){
        Axios.post('/loyaltyprogram', this.state.loyaltyProgram)
        .then(res => {
            alert("Added new loyalty program successfully");
            this.props.navigate('')
            window.location.reload()
        })
        .catch(err => {
            alert("Failed to add new loyalty program")
            console.log(err);
        })
    }
    onInputChange(e){
        const name = e.target.name
        const value = e.target.value
    
        let u = this.state.loyaltyProgram
    
        u[name] = value
        this.setState({loyaltyProgram: u})
      }
    render(){
        return(
            <Container>
            <Row className="justify-content-center">
        <Col md={4}>
            <Form>
                <h2 className="display-4">Add new Loyalty Program</h2>
                <Form.Group mb={3}>
                    <br></br>
                    <Form.Label>Points for bronze</Form.Label>
                    <Form.Control type="text" name="pointsForBronze" placeholder="Enter pointsForBronze" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group mb={3}>
                    <Form.Label>percentForBronze</Form.Label>
                    <Form.Control type="text" name="percentForBronze" placeholder="Enter percentForBronze" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group mb={3}>
                    <Form.Label>Points for silver</Form.Label>
                    <Form.Control type="text" name="pointsForSilver" placeholder="Enter pointsForSilver" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <Form.Group mb={3}>
                    <Form.Label>percentForBronze</Form.Label>
                    <Form.Control type="text" name="percentForSilver" placeholder="Enter percent for silver" onChange = {(e) => this.onInputChange(e)}/>
                </Form.Group>
                <br></br>
                <FormGroup mb={3}>
                <Form.Label>Points for gold</Form.Label>
                  <Form.Control type="text" name="pointsForGold" placeholder="Enter pointsForGold" onChange = {(e) => this.onInputChange(e)}/>  
                </FormGroup>
                <br></br>
                <FormGroup mb={3}>
                <Form.Label>Percent for gold</Form.Label>
                  <Form.Control type="text" name="percentForGold" placeholder="Enter percentForGold" onChange = {(e) => this.onInputChange(e)}/>  
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
              <Form.Label>pointsForUser</Form.Label>
              <Form.Control type="text" name="pointsForUser" placeholder="Enter pointsForUser" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <Form.Group mb={3}>
              <Form.Label>pointsForOwner</Form.Label>
              <Form.Control type="text" name="pointsForOwner" placeholder="Enter pointsForOwner" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
            <Form.Group mb={3}>
              <Form.Label>percentageForApp</Form.Label>
              <Form.Control type="text" name="percentageForApp" placeholder="percentageForApp" onChange = {(e) => this.onInputChange(e)}/>
            </Form.Group>
           
           

            <FormGroup mb = {3}>
                <Button mx={"auto"} variant="success" onClick={() => this.addNewLoyaltyProgram()} style={{marginTop:"55px", width:"342px"}}>Add new admin</Button>

            </FormGroup>
          </Form>
        </Col>
      </Row>
      </Container>
        );
    }
}

export default withNavigation(CreateLoyaltyProgram);
