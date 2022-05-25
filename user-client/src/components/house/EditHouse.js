import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form, Row, Col} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class EditHouse extends React.Component{

    constructor(props){
        super(props)

        let house = {
            id: -1,
            name: "",
            address: "",
            description: "",
            numberOfRooms: 0,
            numberOfBeds: 0,
            rules: "",
            price: 0
        }

        this.state = {
             house: house,
             additionalContent: []
        }
    }

    componentDidMount(){

         this.getHouseById(this.props.params.id)
         this.getAdditionalContentByHouseId(this.props.params.id)


    }

    getAdditionalContentByHouseId(id){
        Axios.get('/additionalContents/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({additionalContent: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    getHouseById(id){

        Axios.get('/houses/' + id)
            .then(res => {
                console.log(res.data)
                this.setState({house: res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }

    editHouse(){
        Axios.put('/houses/' + this.state.house.id, this.state.house)
            .then(res => {
                alert("Successfully edited!")
                this.props.navigate('/houses')
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    deleteHouse(){
        Axios.delete('/houses/' + this.state.house.id)
            .then(res =>{
                alert("Successfully deleted!")
                this.props.navigate('/houses')
            })
            .catch(err=>{
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
    }

    render(){
        return(
            <Row className="justify-content-center">
                <Col xs="12" sm="10" md="8" >
                
                        <h1 style={{color: "black"}}>House profile</h1>
                
                             <Form>
                                
                                <Form.Label htmlFor="name">Name:</Form.Label>
                                <Form.Control name="name" value={this.state.house.name} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="address">Address:</Form.Label>
                                <Form.Control name="address" value={this.state.house.address} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                             
                                <br></br>
                                <Form.Label htmlFor="numberOfRooms">Number of rooms:</Form.Label>
                                <Form.Control  name="numberOfRooms" value={this.state.house.numberOfRooms} style={ {width: "25%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="numberOfBeds">Number of beds:</Form.Label>
                                <Form.Control name="numberOfBeds" value={this.state.house.numberOfBeds} style={ {width: "25%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="price">Price:</Form.Label>
                                <Form.Control name="price" value={this.state.house.price} style={ {width: "25%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="description">Description:</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" value={this.state.house.description} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="rules">House rules:</Form.Label>
                                <Form.Control as="textarea" name="rules" value={this.state.house.rules} style={ {width: "50%"}} onChange={(e) => this.changeInputValue(e)}/>
                                <br></br>
                                <Form.Label htmlFor="additionalContent">Additional content (price per day):</Form.Label>
                                {/* <Form.Control as="textarea" name="additionalContent" value={this.state.additionalContent} style={ {width: "50%"}}/> */}
                                {
                                    this.state.additionalContent.map((c) => {
                                        return (
                                            <p>{c.name} {c.price}$</p>
                                        )
                                    })
                                }
                                <br></br>
                                <Button style={{ marginTop: "25px" }} onClick={()=>{ this.editHouse() }}>
                                    Edit
                                </Button>
                                <Button variant="danger" style={{ marginTop: "25px", marginLeft: "25px" }} onClick={()=>{ this.deleteHouse() }}>
                                    Delete 
                                </Button>
                            </Form>
                </Col>
                
                <img src={require('../../images/homePage.jpg')} alt="Image placeholder"/>
                        
                            
            </Row>
        )
    }
}

export default withNavigation(withParams(EditHouse));