import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EarningsInRange extends React.Component{

    constructor(props){
        super(props)

        let range = {
            start: new Date(),
            end: new Date()
        }
       
        this.state = {
             range: range
        }

        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    componentDidMount(){
    }

    handleStartChange(e) {
        this.state.range.start = e;
      }
    
      handleEndChange(e) {
        this.state.range.end = e;
      }

      showReport(){
          console.log(this.state.range)
       Axios.post('/reservations/forRange', this.state.range)
           .then(res => {
               console.log(res.data)
           })
           .catch(err =>{
               alert("Failed!")
               console.log(err)
           })
   }


   
    render(){
        return(
            <Row>
                <Col></Col>
                <Col md={4}>
                    <h1 style={{color: "black"}}>Choose date range</h1>
                    <br></br>
                    <Form.Label>Start date:</Form.Label>
                    <DatePicker name="start" selected={this.state.range.start} onChange={(e) => this.handleStartChange(e)}/>           
                    <br></br>
                    <br></br>
                    <Form.Label>End date:</Form.Label>
                    <DatePicker name="end" selected={this.state.range.end} onChange={(e) => this.handleEndChange(e)}/> 
                    <br></br>
                    <br></br>
                    <button type="button" class="btn btn-outline-primary" style={{ width: "60%"}} onClick={()=>{ this.showReport() }}>Show report</button>
                </Col>
                <Col></Col>   
            </Row>
        )
    }
}

export default withNavigation(withParams(EarningsInRange));