import React from "react";
import Axios from '../../utils/Axios';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

class EarningsInRange extends React.Component{

    constructor(props){
        super(props)

       
        this.state = {
            start: new Date(),
            end: new Date()
        }

        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    componentDidMount(){
    }

    handleStartChange(e) {
        this.setState({start: e})
        this.state.start = e;
      }
    
      handleEndChange(e) {
        this.setState({end: e})
        this.state.end = e;
      }

      countEarnings(reservations){
        let sum = 0
        for (var i = 0; i < reservations.length; i++) {
            console.log(reservations[i].price)
            sum =  sum + reservations[i].price
        }
        Swal.fire({
            icon: 'info',
            title: 'Report',
            text: 'You earned ' + sum + '$ for this period!' 
        });
      }

      showReport(){
       Axios.post('/reservations/forRange', this.state)
           .then(res => {
                this.countEarnings(res.data)
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
                    <DatePicker name="start" selected={this.state.start} onChange={(e) => this.handleStartChange(e)}/>           
                    <br></br>
                    <br></br>
                    <Form.Label>End date:</Form.Label>
                    <DatePicker name="end" selected={this.state.end} onChange={(e) => this.handleEndChange(e)}/> 
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