import React from "react";
import Axios from '../../utils/Axios';
import './../../houses.css';
import {Button, Form} from 'react-bootstrap';
import {withParams, withNavigation} from '../../utils/routeconf'
import Calendar from "../calendar/Calendar";

class Reservation extends React.Component{

    constructor(props){
        super(props)

        let reservation = {
            id: -1,
            startDate: new Date(),
            endDate: new Date(),
            numberOfPeople: 0,
            numberOfDays: 0,
        }

        this.state = {
            freeDates: [],
            reservedDates:[],
            unavailableDates:[],
            reservation: reservation
        }
    }

    componentDidMount(){
        this.getFreeDates();
        
    }

    getFreeDates(){
        Axios.get('/houses/freeDate/' + this.props.params.id)
        .then(res =>{
            console.log(res.data)
            this.setState({freeDates : res.data})
            this.regulateDates()
        })
    }

    regulateDates(){
        let datesStart  = this.state.freeDates[0].start;
        console.log(datesStart)
        //Zelim da skontam kako da izhendlam problem da mi iz available periods on uzme samo datume
    }

    render(){
        return(
            <Calendar></Calendar>
        )
    }
}

export default withNavigation(withParams(Reservation))