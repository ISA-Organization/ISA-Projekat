import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'

class AddAdditionalContent extends React.Component{

    constructor(props){
        super(props)

        let content = {
            name: '',
            price: 0,
            entityId: this.props.params.entityId
        }
       
        this.state = {
             content: content
        }
    }

    componentDidMount(){
    }

     addContent(){

        Axios.post('/additionalContents', this.state.content)
            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/houses/' + this.state.content.entityId)
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }

    changeInputValue(e){
        const name = e.target.name
        const value = e.target.value

        let content = this.state.content
        content[name] = value

        this.setState({content: content})
        console.log(this.state)
    }

    render(){
        return(
            <Row>
                <Col></Col>
                <Col md={4}>
                    <h1 style={{color: "black"}}>Add new content</h1>
                    <br></br>
                    <Form.Label htmlFor="name">Name:</Form.Label>
                    <Form.Control name="name" placeholder="Enter content name" style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <br></br>
                    <Form.Label htmlFor="price">Price:</Form.Label>
                    <Form.Control name="price" placeholder="Enter price per day"  style={ {width: "100%"}} onChange={(e) => this.changeInputValue(e)}/>
                    <button type="button" class="btn btn-outline-primary" style={{marginTop: "2%", marginLeft: "80%"}} onClick={()=>{ this.addContent() }}>Add</button>
                </Col>
                <Col></Col>   
            </Row>
        )
    }
}

export default withNavigation(withParams(AddAdditionalContent));