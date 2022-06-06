import React, { Component } from 'react';
import CanvasJSReact from '../../utils/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class WeeklyReportGraph extends Component {
		render() {
		const options = {
			title: {
				text: "Weekly Attendance Report"
			},
			animationEnabled: true,
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: [
					{ label: "Monday",  y: 10  },
					{ label: "Tuesday", y: 15  },
					{ label: "Wednesday", y: 25  },
					{ label: "Thursday",  y: 30  },
					{ label: "Friday",  y: 28  },
					{ label: "Saturday",  y: 28  },
					{ label: "Sunday",  y: 28  }
				]
			}
			]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default WeeklyReportGraph;