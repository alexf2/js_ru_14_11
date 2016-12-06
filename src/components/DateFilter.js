import React, { Component } from 'react'
import DayPicker, {DateUtils, WeekdayPropTypes} from 'react-day-picker'
import 'react-day-picker/lib/style.css'

class DateFilter extends Component {    

    constructor(props) {
        super(props)
        //тогда хотя бы назови их defaultDateFrom 
        //Ok
        DateFilter.validateDate(props.dtFromDefault, '"dtFrom" if specified should be a valid Date')
        DateFilter.validateDate(props.dtToDefault, 'dtTo if specified should be a valid Date')

        if (!!props.dtFromDefault && !!props.dtToDefault && props.dtFromDefault > props.dtToDefault)
            throw new Error(`Date from "${props.dtFromDefault}" should be less or equal to Date to "${props.dtToDefault}"`)

        if (!!props.dtFromDefault || !!props.dtToDefault)
            this.state = {                 
                dtFrom: props.dtFromDefault,
                dtTo: props.dtToDefault
            }
        else {
            let date = new Date();                                
            this.state = { 
                //initally by default select the first and the last days of the current months
                dtFrom: new Date(date.getFullYear(), date.getMonth(), 1),
                dtTo: new Date(date.getFullYear(), date.getMonth() + 1, 0)
            }     
        }   

        this.initialDate = this.state.dtFromDefault || this.state.dtToDefault
    }

    static validateDate = (dt, errorMsg) => {
        if (dt && typeof dt === 'object' && !dt.getMonth)
            throw new Error(errorMsg)
    } 

    isDaySelected = (date) => {
        let {dtFrom, dtTo} = this.state;        
        return  DateUtils.isSameDay(dtFrom, date) ||  DateUtils.isSameDay(dtTo, date) 
    } 

    dayClickHandler = (ev, day, {selected}) => {
        let {dtFrom, dtTo} = this.state;

        if (day < dtFrom || DateUtils.isSameDay(dtFrom, day) || (!dtFrom && day < dtTo)) {
            dtFrom = selected ? null:day;
            this.setState( () => ({dtFrom}) )
        }
        else {
            dtTo = selected ? null:day;
            this.setState( () => ({dtTo}) )
        } 
    }

    static formatSelectedDates = ({dtFrom, dtTo}) => {
        let selectedDescription

        if (!dtFrom && !dtTo) 
            selectedDescription = 'Not filtered'
        else if (!dtTo)
            selectedDescription = `From ${dtFrom.toLocaleDateString()} -->`
        else if (!dtFrom)
            selectedDescription = `To --> ${dtTo.toLocaleDateString()}`
        else 
            selectedDescription = `Between ${dtFrom.toLocaleDateString()} -- ${dtTo.toLocaleDateString()}`

        return selectedDescription
    } 

    render() {        
        return (
            <div>
                <div className='datePickerContainer'>
                    <DayPicker 
                        selectedDays = {this.isDaySelected}
                        initialMonth = {this.initialDate}
                        onDayClick = {this.dayClickHandler}
                    />
                    <p className='dateInterval'>{DateFilter.formatSelectedDates(this.state)}</p>
                </div>
                <div className='clear' />
            </div>            
        )
    }
}

export default DateFilter
