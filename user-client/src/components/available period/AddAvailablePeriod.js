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
        this.getRentingEntityType()
    }

    getRentingEntityType(){
        Axios.get('/rentingEntities/' + this.props.params.id)
            .then(res => {
                this.setState({rentingEntityType: res.data})
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }
     addTerm(){
         console.log(this.state)
        if(!this.state.isSpecialOffer){
            this.setState({specialPrice: 0})
        }
        if(this.state.isSpecialOffer){
            this.setState({specialPrice: this.state.specialPrice})
        }
        
        Axios.post('/available/period', this.state)

            .then(res => {
                alert("Successfully added!")
                this.props.navigate('/calendar/' + this.props.params.id)
            })
            .catch(err =>{
                alert("Failed!")
                console.log(err)
            })
    }


    handleStartChange(e) {
        this.setState({start: e})
        this.state.start = e;
      }
    
      handleEndChange(e) {
        this.setState({end: e})
        this.state.end = e;
      }

      setSpecialOffer(){

          this.setState({isSpecialOffer: !this.state.isSpecialOffer})
      }
      changeInputValue(e){
            this.state.specialPrice = e.target.value;
      }

    render(){
        return(
            <Row>
                <Col></Col>
                <Col md={4}>
                    <h1 style={{color: "black"}}>Add new term</h1>
                    <br></br>
                    <Form.Label>Start date:</Form.Label>
                    <DatePicker name="start" selected={this.state.start} onChange={(e) => this.handleStartChange(e)}/>           
                    <br></br>
                    <br></br>
                    <Form.Label>End date:</Form.Label>
                    <DatePicker name="end" selected={this.state.end} onChange={(e) => this.handleEndChange(e)}/> 
                    <br></br>
                    <br></br>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" onChange={() => this.setSpecialOffer()}/>
                        <label class="form-check-label">Special offer</label>
                    </div>
                    <br></br>
                    <Form.Label style={{marginRight: "2%"}}>Special price:</Form.Label>
                    <Form.Control disabled={!this.state.isSpecialOffer} name="specialPrice" style={{width: "100%", marginRight: "2%"}} onChange={(e)=>this.changeInputValue(e)}></Form.Control>
                    <br></br>
                    <button type="button" class="btn btn-outline-primary" style={{ width: "100%"}} onClick={()=>{ this.addTerm() }}>Add</button>
                </Col>
                <Col></Col>   
            </Row>
        )
    }
}

export default withNavigation(withParams(AddAvailablePeriod));