import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'

import 'react-day-picker/lib/style.css'

class DateRange extends Component {
    state = {
        from: null,
        to: null
    }

    handleDayClick = (e, day) => {
        this.setState(DateUtils.addDayToRange(day, this.state), () => {
            this.props.onRangeChanged && this.props.onRangeChanged(this.state.from, this.state.to)
        })
    }

    static formatSelectedDates = ({from, to}) => {
        let selectedDescription

        if (!from && !to) 
            selectedDescription = 'Not filtered'
        else if (!to)
            selectedDescription = `From ${from.toLocaleDateString()} -->`
        else if (!from)
            selectedDescription = `To --> ${to.toLocaleDateString()}`
        else 
            selectedDescription = `Between ${from.toLocaleDateString()} -- ${to.toLocaleDateString()}`

        return selectedDescription
    } 

    render() {
        const { from, to } = this.state;
        const selectedRange = DateRange.formatSelectedDates(this.state)

        return (
            <div className="date-range">
                <DayPicker
                    ref="daypicker"
                    selectedDays={ day => DateUtils.isDayInRange(day, this.state) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }

}

export default DateRange