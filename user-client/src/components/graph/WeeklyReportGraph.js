import React from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import Axios from "../../utils/Axios"
Chart.register(CategoryScale);

let currState = {
  labels: ['Sunday', 'Monday', 'Tuesday',
           'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [0,0,0,0,0,0,0]
    }
  ]
}

export default class WeeklyReportGraph extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			reservations: [],
			currState: currState
		}
	}

	 async componentDidMount(){

		await this.getReservations()
		this.countReservations()

	}

	 async getReservations(){
			
			try{
				let result = await Axios.get('/reservations/forLastWeek');
				
				this.setState({reservations: result.data})
				let currState = this.state.currState
				currState.datasets[0].data = [1,2,3,4,4,4,4]
				this.setState({currState: currState})
				
			  }
			  catch (error){
				console.log(error);
			  }

	}

	 countReservations(){

		let newData = [0,0,0,0,0,0,0]
		let reservations = this.state.reservations

		for (let i = 0; i < reservations.length; i++) {

			var parts =reservations[i].startDate.split('-');
			var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
			
			newData[mydate.getDay()] = newData[mydate.getDay()] + 1
		
		  }

		let currState = this.state.currState
		currState.datasets[0].data = newData
		this.setState({currState: currState})
		console.log(newData)

	}

  render() {
    return (
      <div>
        <Bar
          data={this.state.currState}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
