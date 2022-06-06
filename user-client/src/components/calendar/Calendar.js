import React, { useEffect, useState } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import "../../calendar.css"
import{ withNavigation, withParams} from '../../utils/routeconf';
import Axios from '../../utils/Axios';
function getDays(days){
    let total = []
    for(let i = 1; i <= days; i++){
        total.push(i)
    }
    return total
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }



function getAvailabilityDates(avialablePeriod){
	var periods  =[]
	for(let range of avialablePeriod){
		console.log(range)
		let startDate = range['start']
		let endDate = range['end']
		let syear = startDate.split('-')[0]
		let smonth = startDate.split('-')[1]
		let sday1 = startDate.split('-')[2]
		let sday2 = sday1.split('T')[0]
		//let formatedStartDate = sday2 + '-' + smonth + '-' + syear 
		let formatedStartDate = new Date(syear, smonth, sday2)
		let eyear = endDate.split('-')[0]
		let emonth = endDate.split('-')[1]
		let eday1 = endDate.split('-')[2]
		let eday2 = eday1.split('T')[0]
		//let formatedEndDate = eday2 + '-' + emonth + '-' + eyear
		let formatedEndDate = new Date(eyear, emonth, eday2)
		let formatedPeriod ={
			startDate: formatedStartDate,
			endDate: formatedEndDate

		}

		periods.push(formatedPeriod)
		
	}
	console.log(periods)
	return periods;
	

}


function getDaysInWeek(firstDay){
    switch (firstDay) {
        case 'Monday': 
            return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        case 'Tuesday': 
            return ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
        case 'Wednesday': 
            return ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']; 
        case 'Thursday': 
            return ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday']; 
        case 'Friday': 
            return ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        case 'Saturday': 
            return ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        case 'Sunday': 
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    }


}

const Calendar = () => {

	const {id} = useParams();
	const history = useNavigate();
	const monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"];

	const now = new Date()

	const[monthNum, setMonthNum] = useState(now.getMonth());
    const[monthName, setMonthName] = useState(monthNames[monthNum]);
	const[year, setYear] = useState(now.getFullYear());
    const[numberOfDays, setDays] = useState(daysInMonth(now.getMonth() + 1, now.getFullYear()));
    const[daysArray, setDaysArray] = useState(getDays(numberOfDays));
    const[firstDay, setFirstDay] = useState(getDayName(new Date(year + '-' + (monthNum + 1) + '-' + '01')))
    const[daysInWeek, setDaysInWeek] = useState(getDaysInWeek(firstDay))
	const[avialablePeriod, setAvailablePeriods] = useState([])
	
    let num = monthNum;
    let name = monthNames[num];
    let days = daysInMonth(num + 1, year);
    let daysArrayVar = getDays(days);
    let yearVar = year;
    let firstDayInMonth = getDayName(new Date(year + '-' + (num + 1) + '-' + '01'));
    let daysInWeekVar = getDaysInWeek(firstDayInMonth);

	let availabilityPeriods = getAvailabilityDates(avialablePeriod)
	useEffect(()=>{
		Axios.get('/available/period/' + id)
		.then(res => {
			setAvailablePeriods(res.data);
			console.log(res.data)
			
		}).catch(err =>{
			console.log(err)
		})
	}, [])
	
    useEffect(() =>{
        //console.log(firstDayInMonth)
    }, [num]) //componentDidMount

	

	const showPreviousMonth = () => {

		if(num >= 1 && num <= 11){
			
			setMonthNum(monthNum => monthNum - 1)
            setDays(daysInMonth(monthNum + 1, year))
            setDaysArray(getDays(numberOfDays))
		}
		else{
			setMonthNum(11);
			setYear(year - 1);
			setDays(daysInMonth(monthNum + 1, year));
            setDaysArray(getDays(numberOfDays));
		}
	}

    const showNextMonth = () => {
        if(num >= 0 && num <= 10){
			
			setMonthNum(monthNum => monthNum + 1)
            setDays(daysInMonth(monthNum + 1, year))
            setDaysArray(getDays(numberOfDays))
		}
		else{
			setMonthNum(0);
			setYear(year + 1);
			setDays(daysInMonth(monthNum + 1, year));
            setDaysArray(getDays(numberOfDays));
		}
    }

	const goToAddNewTerm= () =>{
		history('/addNewTerm/' + id)
		
	}

	const isAvailable = (day, name, yearVar) =>{
		let dateToCheck = new Date(yearVar,name, day);
		let availability = []
		console.log(dateToCheck)
		for(let range of availabilityPeriods){
			if(dateToCheck > range['startDate'] && dateToCheck < range['endDate']){
				availability.push(true);
			}
		}
		console.log(availability.length)
		if(availability.length != 0){
			return true;
		}
		return false;
	}
	const goToAddNewReservation = () =>{
        history('/newReservation/'+ id)
   }
    return(
        <div class="container">
			<div class="wrapper">
			<section class="main-content">
				<button type="button" onClick={(e) => goToAddNewTerm(e)} class="btn btn-outline-primary" style={{marginBottom: "5%"}}>Add free term</button>
				<button type="button" class="btn btn-outline-dark" style={{marginBottom: "5%", marginLeft:"73%"}} onClick={(e) => goToAddNewReservation(e)}>Add reservation</button>
				<div class="table-navigation">
					<a onClick={showPreviousMonth} class="table-navigation__prev"><span>previous month</span></a>
					<span class="table-navigation__center">{name}, {yearVar}</span>
					<a href="javascript:;" onClick={showNextMonth} class="table-navigation__next"><span>next month</span></a>
				</div>
				<div class="table-wrapper">
					<table class="month-table">
						<thead>
							<tr>
                                {
                                    daysInWeekVar.map((day) => {
                                        return(
                                            <th class="month-table__days">{day}</th>
                                        )
                                    })
                                }
							</tr>
						</thead>
						<tbody>
							<tr class="">
                                {
									daysArrayVar.map((day) => {
										return(
											day >= 1 && day <= 7 ?
											<td class="month-table__regular" style={isAvailable(day, num, yearVar) ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
												<div class="month-table__date">
													<span>{day}</span>
													<i></i>
												</div>
                                                <br></br>
											</td> : null
										)
									}) 
                                }
							</tr>
							<tr>
							{
									daysArrayVar.map((day) => {
										return(
											day >= 8 && day <= 14 ?
											<td class="month-table__regular" style={isAvailable(day, num, yearVar) ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
												<div class="month-table__date">
													<span>{day}</span>
													<i></i>
												</div>
                                                <br></br>
											</td> : null
										)
									})
								}
							</tr>
							<tr>
							{
									daysArrayVar.map((day) => {
										return(
											day >= 15 && day <= 21 ?
											<td class="month-table__regular" style={isAvailable(day, num, yearVar) ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
												<div class="month-table__date">
													<span>{day}</span>
													<i></i>
												</div>
                                                <br></br>
											</td> : null
										)
									})
								}
							</tr>
							<tr>
							{
									daysArrayVar.map((day) => {
										return(
											day >= 22 && day <= 28 ?
											<td class="month-table__regular" style={isAvailable(day, num, yearVar) ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
												<div class="month-table__date">
													<span>{day}</span>
													<i></i>
												</div>
                                                <br></br>
											</td> : null
										)
									})
								}
							</tr>
							<tr>
							{
									daysArrayVar.map((day) => {
										return(
											day >= 28?
											<td class="month-table__regular"  style={isAvailable(day, num, yearVar) ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
												<div class="month-table__date">
													<span>{day}</span>
													<i></i>
												</div>
                                                <br></br>
											</td> : null
										)
									})
								}
							</tr>
						</tbody>
					</table>
				</div>
				
			</section>
		</div>
		</div>
    );
};

export default withNavigation(withParams(Calendar));