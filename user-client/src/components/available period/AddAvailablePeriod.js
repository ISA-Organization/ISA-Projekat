import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddAvailablePeriod extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            start: new Date(),
            end: new Date(),
            specialPrice: 0,
            isSpecialOffer: false,
            rentingEntityId: this.props.params.id,
            rentingEntityType: ''
        }

        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    componentDidMount(){
    }


     addTerm(){

        Axios.post('/additionalContents', this.state)
            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/calendar/' + this.props.params.id)
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }


    handleStartChange(date) {
        this.setState({
          start: date
        })
      }
    
      handleEndChange(date) {
        this.setState({
          end: date
        })
      }

    render(){
        return(
            <Row>
                <Col></Col>
                <Col md={4}>
                    <h1 style={{color: "black"}}>Add new term</h1>
                    <br></br>
                    <Form.Label>Start date:</Form.Label>
                    <DatePicker
                        selected={ this.state.start}
                        onChange={ this.handleStartChange }
                        name="start"
                        dateFormat="MM/dd/yyyy"
                    />
                    <br></br>
                    <br></br>
                    <Form.Label>End date:</Form.Label>
                    <DatePicker
                        selected={ this.state.end}
                        onChange={ this.handleEndChange }
                        name="end"
                        dateFormat="MM/dd/yyyy"
                    />
                    <br></br>
                    <br></br>
                    <button type="button" class="btn btn-outline-primary" style={{ width: "100%"}} onClick={()=>{ this.addTerm() }}>Add</button>
                </Col>
                <Col></Col>   
            </Row>
        )
    }
}

export default withNavigation(withParams(AddAvailablePeriod));