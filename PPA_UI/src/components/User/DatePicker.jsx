import React, { useEffect, useRef, useState } from "react";
import { LeftIcon, RightIcon } from "../Common/Icons";
import { months, weekDays } from "../../constants/dateConstants";
import "../../styles/DatePicker.css";

const DatePicker = ({ selectedDate, setDueDate, setIsDueDate, setShowDatePicker }) => {
    const currentDate = new Date();
    const [month, setMonth] = useState(selectedDate && selectedDate.getMonth() || new Date().getMonth());
    const [year, setYear] = useState(selectedDate && selectedDate.getFullYear() || new Date().getFullYear());
    const [days, setDays] = useState({ previousMonth: [], currentMonth: [], nextMonth: [] });
    const datePickerRef = useRef();

    useEffect(() => datePickerRef.current.focus(), []);

    useEffect(() => {
        const newDays = getNewDays();

        if (month < 0) {
            setMonth(months.length - 1);
            setYear(year - 1);
        }
        else if (month >= months.length) {
            setMonth(0);
            setYear(year + 1);
        }

        setDays(newDays);
    }, [month]);

    const getNewDays = () => {
        const tableCapacity = weekDays.length * 6;
        const firstDayMonth = 1;

        const firstWeekDayCurrentMonth = new Date(year, month).getDay() || 7;
        const lastDayCurrentMonth = new Date(year, month + 1, 0).getDate();

        const lastDayPreviousMonth = new Date(year, month, 0).getDate();
        const firstDayPreviousMonth = lastDayPreviousMonth - firstWeekDayCurrentMonth + 2;

        const lastDayNextMonth = tableCapacity - (lastDayCurrentMonth + (lastDayPreviousMonth - firstDayPreviousMonth + 1));
        
        const newDays = {
            previousMonth: [],
            currentMonth: [],
            nextMonth: []
        }

        for (let i = firstDayPreviousMonth; i < lastDayPreviousMonth + 1; i++) {
            newDays.previousMonth.push(i);
        }

        for (let i = firstDayMonth; i < lastDayCurrentMonth + 1; i++) {
            newDays.currentMonth.push(i);
        }

        for (let i = firstDayMonth; i < lastDayNextMonth + 1; i++) {
            newDays.nextMonth.push(i);
        }

        return newDays;
    }

    const dateClickHandler = (day, month) => {
        const date = new Date(year, month, day);
        
        setDueDate(date);
        setIsDueDate(true);
    }

    const renderDays = (mappingMonth, diff, isCurrentMonth) => {
        const currentMonth = isCurrentMonth ? "day_current_month" : "day_other_month";

        return mappingMonth.map(day => {
            const isCurrentDay = currentDate.getDate() === day && currentDate.getMonth() === (month + diff) && currentDate.getFullYear() === year;
            const currentDay = isCurrentDay ? "current_day" : "";
            const isSelectedDay = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === (month + diff) && selectedDate.getFullYear() === year;
            const selectedDay = isSelectedDay ? "selected_day" : "";

            return (<div onClick={() => dateClickHandler(day, month + diff)} className={`day ${currentDay} ${selectedDay} ${currentMonth}`}>{ day }</div>)
        });
    }

    return(
        <div ref={datePickerRef} tabIndex={-1} onFocus={() => setShowDatePicker(true)} onBlur={() => setShowDatePicker(false)} className="date_picker">
            <div className="month_handler">
                <div onClick={() => setMonth(month - 1)}  className="icon_holder">
                    <LeftIcon/>
                </div>
                <span className="month">{ months[month] + " " + year }</span>
                <div onClick={() => setMonth(month + 1)} className="icon_holder">
                    <RightIcon/>
                </div>
            </div>
            <div className="calendar">
                <div className="week_days_holder">
                    { weekDays.map(weekDay => <div className="week_day">{ weekDay }</div>) }
                </div>
                <div className="all_days_holder">
                    { renderDays(days.previousMonth, -1, false) }
                    { renderDays(days.currentMonth, 0, true) }
                    { renderDays(days.nextMonth, 1, false) }
                </div>
            </div>
        </div>
    )
}

export default DatePicker;