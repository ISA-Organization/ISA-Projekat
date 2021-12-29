import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class AddHouse extends React.Component{

    constructor(props){
        super(props)

        let house = {
            name: "",
            address: "",
            description: "",
            numberOfRooms: 0,
            numberOfBeds: 0,
            houseRules: "",
            price: 0,
            additionalContent: "",
            ownerId: 5, //sad zakucano, treba namestiti za ulogovanog
            ownerName: ""
        }

        this.state = {
             house: house
        }
    }

    componentDidMount(){


    }

    addHouse(){
        Axios.post('/houses', this.state.house)
            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/houses')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let house = this.state.house
        house[name] = value

        this.setState({house: house})
        console.log(this.state)
    }

    render(){
        return(
            <Row>
                <Col xs="12" sm="10" md="8" >
                
                        <h1 style={{color: "black"}}>Add new house</h1>
                
                             <Form>
                                
                                <Form.Label htmlFor="name">Name:</Form.Label>
                                <Form.Control name="name" placeholder="Enter house name" style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="address">Address:</Form.Label>
                                <Form.Control name="address"  style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                             
                                <br></br>
                                <Form.Label htmlFor="numberOfRooms">Number of rooms:</Form.Label>
                                <Form.Control  name="numberOfRooms"  style={ {width: "25%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="numberOfBeds">Number of beds:</Form.Label>
                                <Form.Control name="numberOfBeds"  style={ {width: "25%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="price">Price:</Form.Label>
                                <Form.Control name="price"  style={ {width: "25%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description"  style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="additionalContent">Additional content:</Form.Label>
                                <Form.Control as="textarea" name="additionalContent"  style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Button style={{ marginTop: "25px" }} onClick={()=>{ this.addHouse() }}>
                                    Add
                                </Button>
                            </Form>
                </Col>
                        
                            
            </Row>
        )
    }
}

export default withNavigation(withParams(AddHouse));