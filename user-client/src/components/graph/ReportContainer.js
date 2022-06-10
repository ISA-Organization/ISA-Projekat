import React, { useState, useEffect } from 'react';
import Axios from "../../utils/Axios"
import WeeklyReportGraph from './WeeklyReportGraph';
import {Form} from 'react-bootstrap'
import MonthlyReportGraph from './MonthlyReportGraph';
import { withParams, withNavigation} from '../../utils/routeconf';
import { useParams } from 'react-router-dom';
import YearlyReportGraph from './YearlyReportGraph';


const ReportContainer = () => {

	let {userId} = useParams();
	const [reservationsWeek, setReservationsWeek] = useState([])
	const [reservationsThisYear, setReservationsThisYear] = useState([])
	const [reservationsLastYears, setReservationsLastYears] = useState([])
	const [criteria, setCriteria] = useState(['Weekly', 'Montly', 'Yearly'])
	const [selectedCriteria, setSelectedCriteria] = useState('Weekly')

	useEffect(() =>{

		Axios.get('/reservations/forLastWeek/' + userId)
		.then(res => {
			setReservationsWeek(res.data);
			
		}).catch(err =>{
			console.log(err)
		})

    }, []) //componentDidMount

	useEffect(() =>{

		Axios.get('/reservations/forThisYear/' + userId)
		.then(res => {
			setReservationsThisYear(res.data);
			
		}).catch(err =>{
			console.log(err)
		})

    }, []) //componentDidMount

	useEffect(() =>{

		Axios.get('/reservations/forLastYears/' + userId)
		.then(res => {
			setReservationsLastYears(res.data);
			
		}).catch(err =>{
			console.log(err)
		})

    }, []) //componentDidMount

	const onChangeCriteria = (e) =>{
		setSelectedCriteria(e.target.value)
		console.log(selectedCriteria)
	}

	
	return(
	    <div>
			<Form.Group>    
                <Form.Control style={{width: "20%"}} as="select"  onChange={(e)=> onChangeCriteria(e)}>

                    {
                        criteria.map((p) => {
                            return (
                                <option key = {p} value={p}>{p}</option>
                            )
                        })
                    }
                </Form.Control>
			</Form.Group> 
			{
				selectedCriteria === "Weekly" ? <WeeklyReportGraph reservations={reservationsWeek}></WeeklyReportGraph> : 
				(
					selectedCriteria === "Yearly" ? <YearlyReportGraph reservations={reservationsLastYears}></YearlyReportGraph> : <MonthlyReportGraph reservations={reservationsThisYear}></MonthlyReportGraph>
				)
			}
      </div>
	)
}
export default withNavigation(withParams(ReportContainer));

