import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import Axios from "../../utils/Axios"

Chart.register(CategoryScale);


const MonthlyReportGraph = (props) => {

    const [now, setNow] = useState(new Date())

	let currState = {
		labels: ["January","February","March","April","May","June","July",
        "August","September","October","November","December"],
		datasets: [
		  {
			label: 'Number of reservations',
			backgroundColor: 'rgba(0,128,128, 0.6)',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data: [0,0,0,0,0,0,0, 0, 0, 0, 0, 0]
		  }
		]
	}

	const getState = () =>{

		let newData = [0,0,0,0,0,0,0, 0, 0, 0, 0, 0]
		let reservations = props.reservations
		// console.log(reservations)

		for (let i = 0; i < reservations.length; i++) {

			var parts =reservations[i].startDate.split('-');
			var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
			
			newData[mydate.getMonth()] = newData[mydate.getMonth()] + 1
		
		  }
		 
		let myState = currState
		myState.datasets[0].data = newData
		console.log(myState)
		return myState
	}
	
	return(
		<div>
			<h3 style={{textAlign: "center"}}>Monthly Reservations Report for {now.getFullYear()}</h3>
			<br></br>
        <Bar
          data={getState()}
          options={{
            title:{
              display:true,
              text:'Monthly Reservations Report',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
	)
}
export default (MonthlyReportGraph);
