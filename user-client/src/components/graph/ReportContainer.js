import React, { useState, useEffect } from 'react';
import Axios from "../../utils/Axios"
import WeeklyReportGraph from './WeeklyReportGraph';


const ReportContainer = () => {

	const [reservations, setReservations] = useState([])

	useEffect(() =>{

		Axios.get('/reservations/forLastWeek')
		.then(res => {
			setReservations(res.data);
			
		}).catch(err =>{
			console.log(err)
		})

    }, []) //componentDidMount


	
	return(
	    <div>
        <WeeklyReportGraph reservations={reservations}></WeeklyReportGraph>
      </div>
	)
}
export default (ReportContainer);

