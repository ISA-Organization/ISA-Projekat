import React, { useEffect, useState } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import "../../calendar.css"

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

    let num = monthNum;
    let name = monthNames[num];
    let days = daysInMonth(num + 1, year);
    let daysArrayVar = getDays(days);
    let yearVar = year;
    let firstDayInMonth = getDayName(new Date(year + '-' + (num + 1) + '-' + '01'));
    let daysInWeekVar = getDaysInWeek(firstDayInMonth);

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


    return(
        <div class="container">
			<div class="wrapper">
			<section class="main-content">
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
											<td class="month-table__regular">
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
											<td class="month-table__regular">
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
											<td class="month-table__regular">
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
											<td class="month-table__regular">
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
											<td class="month-table__regular">
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

export default Calendar;