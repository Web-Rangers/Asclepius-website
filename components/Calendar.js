import React, { useEffect, useState, useCallback } from "react";
import { ReactSVG } from "react-svg";
import styles from "../styles/components/calendar.module.css";
// import { Button } from "components";
import classNames from "classnames";

const today = new Date();

const _schedule = [
    {
        date: today,
        events: [
            {
                id: "1",
                time: "9:00 - 9:40",
                title: "Приветствие",
                color: "#2751F2",
            },
            {
                id: "2",
                time: "9:50 - 10:30",
                title: "Приветствие",
                color: "#D92EC9",
            },
            {
                id: "3",
                time: "14:00 - 15:40",
                title: "Приветствие",
                color: "#00A875",
            },
            {
                id: "4",
                time: "16:10 - 18:00",
                title: "Приветствие",
                color: "#00A875",
            },
        ]
    }
];

let DayName = [
    ['Monday'], ['Tuesday'], ['Wednesday'], ['Thursday'], ['Friday'], ['Saturday'], ['Sunday']
]

let MonthName = [
    ['January'], 
    ['February'], 
    ['March'], 
    ['April'], 
    ['May'], 
    ['June'], 
    ['July'],
    ['August'],
    ['September'],
    ['October'],
    ['November'],
    ['December']
]

Date.prototype.GetFirstDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return (new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1))));
}
Date.prototype.GetLastDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return (new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() == 0 ? 0 : 7))));
}
Date.prototype.GetWeekDay = function (weekday) {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const day = this.getDay();
    return new Date(date.setDate(date.getDate() - day + (day == 0 ? -6 : 1) + weekday));
}

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(day, month, year) {
    const dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek === 0 ? 7 : dayOfWeek;
}

function opacityColor(color, factor) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${factor})`;
}


export default function Calendar({booking}) {
    const [whole, setWhole] = useState(true);
    const [mode, setMode] = useState("week");
    const [date, setDate] = useState(today);

    const [active, setActive] = useState('');

    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(0);

    return (
        <div className={styles.container}>
            {whole ? (
                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <div className={styles.datePeriod}>
                            {mode === "month" && `${MonthName[date.getMonth()]}, ${date.getFullYear()}`}
                            {mode === "week" && `${date.GetFirstDayOfWeek().getDate()} - ${date.GetLastDayOfWeek().getDate()} ${MonthName[date.GetLastDayOfWeek().getMonth()]}, ${date.GetLastDayOfWeek().getFullYear()}`}
                            {mode === "day" && `${date.getDate()} ${MonthName[date.getMonth()]}, ${date.getFullYear()}`}
                        </div>

                        <div className={styles.calendarControls}>
                            <span
                                onClick={()=> {
                                    setActive('');
                                    if (mode === "month") {
                                        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
                                    }
                                    if (mode === "week" && prev !== 0) {
                                        setPrev((prev)=> prev + 1)
                                        setNext((next)=> next - 1)
                                        setDate(new Date(date.GetFirstDayOfWeek().getFullYear(), date.GetFirstDayOfWeek().getMonth(), date.GetFirstDayOfWeek().getDate() - 7));
                                    }
                                    if (mode === "day") {
                                        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
                                    }
                                }}
                            >
                                <ReactSVG
                                    src="/prev.svg"
                                    className={styles.paginationBtn}
                                />
                            </span>
                            <span
                                onClick={()=> {
                                    setActive('')
                                    if (mode === "month") {
                                        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
                                    }
                                    if (mode === "week" && next !== 2) {
                                        setPrev((prev)=> prev - 1)
                                        setNext((next)=> next + 1)
                                        setDate(new Date(date.GetLastDayOfWeek().getFullYear(), date.GetLastDayOfWeek().getMonth(), date.GetLastDayOfWeek().getDate() + 7));
                                    }
                                    if (mode === "day") {
                                        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
                                    }
                                }}
                            >
                                <ReactSVG
                                    src="/next.svg"
                                    className={styles.paginationBtn}
                                />
                            </span>
                        </div>
                        <div className={styles.whiteSpace} />
                        {/* <Button label="Add" size="large" variant="fill" onClick={() => { }} /> */}
                    </div>
                    {mode === "month" && (
                        <MonthView date={date} schedule={_schedule} />
                    )}
                    {mode === "week" && (
                        <WeekView date={date} schedule={_schedule} active={active} setActive={setActive} booking={booking} />
                    )}
                    {mode === "day" && (
                        <DayView date={date} schedule={_schedule} />
                    )}
                </div>
            ) : (
                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <div className={styles.datePeriod}>
                            17-20 June, 2022
                        </div>
                        <div className={styles.calendarControls}>
                            <ReactSVG
                                src="/images/icons/paginator/prev.svg"
                                className={styles.paginationBtn}
                                onClick={() => { }}
                            />
                            <ReactSVG
                                src="/images/icons/paginator/next.svg"
                                className={styles.paginationBtn}
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                    <div className={styles.calendarBody}>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={classNames(styles.smallDay, { [styles.today]: i === 0 })}>
                                <div className={styles.dayHeader}>
                                    <div className={styles.dayString}>
                                        {DayName[i]}
                                    </div>
                                    <div className={styles.dayDate}>
                                        {17 + i}
                                    </div>
                                </div>
                                <div className={styles.dayBody}>
                                    <TimeSlot label="12:00-13:00" />
                                    <TimeSlot label="13:00-14:00" />
                                    <TimeSlot label="14:00-15:00" />
                                    <TimeSlot label="15:00-16:00" />
                                    {/* <Button label="+ Add" size="medium" variant="outline" className={styles.addTimeSlot} /> */}
                                </div>
                            </div>))}
                    </div>
                </div>)}
        </div>);
}

function TimeSlot({ label }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={styles.dayTimeSlot} onClick={() => setIsOpen(!isOpen)}>
                <div className={classNames(styles.popover, { [styles.popoverOpen]: isOpen })}>
                    <div className={styles.popoverAction}>
                        <ReactSVG
                            src="/images/icons/cards/edit.svg"
                            className={styles.iconContainer}
                        />
                        <span>Edit</span>
                    </div>
                    <div className={styles.popoverAction}>
                        <ReactSVG
                            src="/images/icons/cards/delete.svg"
                            className={styles.iconContainer}
                        />
                        <span>Delete</span>
                    </div>
                </div>
                {label}
            </div>
        </>
    );
}

function MonthView({ date, schedule = [] }) {
    const [days, setDays] = useState(null);
    const [events, setEvents] = useState(null);
    const [positions, setPositions] = useState(null);
    const [chooseDay, setChooseDay] = useState('');
    function configureDays() {
        const daysCount = daysInMonth(date.getMonth(), date.getFullYear());
        const days = [];
        const position = {};
        for (let i = 0; i < 7; i++) {
            days.push(<DayHeader title={DayName[i]} className={i === 0 ? styles.left : i === 6 ? styles.right : null} />)
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth(), date.getFullYear());
            position[i] = { row, column };
            days.push(
                <Day
                    key={`d${i}`}
                    number={i}
                    activeDay={chooseDay}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1
                    }} />);
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount = getDayOfWeek(1, date.getMonth(), date.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(date.getMonth() - 1, date.getFullYear());
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(i, date.getMonth() - 1, date.getFullYear());
            position[-i] = { row: 2, column };
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3
                    }} />);
        }

        const nextDaysCount = 7 - getDayOfWeek(daysCount, date.getMonth(), date.getFullYear());
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth() + 1, date.getFullYear());
            position[`future${i}`] = {
                row,
                column
            }
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1
                    }}
                />
            );
        }
        setPositions(position);
        setDays(days);
    }

    function configureEvents() {
        const events = schedule.filter((day) => day.date.getMonth() === date.getMonth()).map(({ date, events }) => {
            return <div
                className={styles.eventContainer}
                key={`e${date.getDate()}`}
                style={{
                    gridColumnStart: positions[date.getDate()].column,
                    gridColumnEnd: positions[date.getDate()].column + 1,
                    gridRowStart: positions[date.getDate()].row,
                    gridRowEnd: positions[date.getDate()].row + 1,
                }}
            >
                {events.map((event, index) => {
                    if (index > 2)
                        return null;
                    return <Event
                        key={`e${index}`}
                        style={{
                            backgroundColor: opacityColor(event.color, 0.05),
                            borderLeft: `3px solid ${event.color}`,
                        }}
                        title={event.time}
                        id={event.id}
                    />
                })}
                {events.length > 2 && <div className={styles.moreEvents}>
                    <ReactSVG src="/images/icons/calendar/more.svg" className={styles.iconContainer} />
                </div>}
            </div>
        })
        setEvents(events);
    }

    useEffect(() => {
        configureDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);
    useEffect(() => {
        if (!positions)
            return;
        configureEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schedule, positions]);

    const setday = useCallback(()=>{
        configureDays()
    },[chooseDay])

    return (
        <div className={styles.monthView} onClick={()=> setday()}>
            {days}
        </div>
    );
}

function WeekView({ date, schedule = [], active, setActive, booking }) {
    const [hours, setHours] = useState([]);
    const [events, setEvents] = useState([]);
    const [linesV, setLinesV] = useState([]);
    const [day, setDay] = useState('');
    const [availableTimes, setAvailableTimes] = useState();

    function configureHours() {
        const hours = [];
        let hour = 0;
        for (let i = 0; i < 1440; i += 60) {
            hours.push(
                <Hour
                    key={`h${i}`}
                    number={hour++}
                    style={{
                        gridColumnStart: 1,
                        gridColumnEnd: 1,
                        gridRowStart: i + 1,
                        gridRowEnd: i + 60
                    }}
                />
            )
        }
        setHours(hours);
    }

    function configureEvents() {
        const events = schedule.map((day) => {
            // destructure like this to prevent variable name conflicts
            const events = day.events;
            const dayDate = day.date
            if (((dayDate.getTime() >= date.GetFirstDayOfWeek().getTime()) && (dayDate.getTime() <= date.GetLastDayOfWeek().getTime()))) {
                const column = (dayDate.getDay() === 0 ? 7 : dayDate.getDay()) + 1;
                return events.map((event, index) => {
                    const hourMinutes = event.time.split(':');
                    return <Event
                        key={`e${index}`}
                        style={{
                            gridColumnStart: column,
                            gridColumnEnd: column + 1,
                            gridRowStart: parseInt(hourMinutes[0]) * 60 + parseInt(hourMinutes[1]) > 0 ? parseInt(hourMinutes[0]) * 60 + parseInt(hourMinutes[1]) : 1,
                            gridRowEnd: (parseInt(hourMinutes[0]) * 60 + parseInt(hourMinutes[1])) + 42,
                            backgroundColor: opacityColor(event.color, 0.05),
                            borderLeft: `3px solid ${event.color}`,
                            color: event.color,
                            height: 'auto'
                        }}
                        title={event.title}
                        time={event.time}
                        id={event.id}
                    />
                })
            }
        })
        setEvents(events);
    }

    useEffect(() => {
        const linesV = [];
        for (let i = 1; i < 9; i++) {
            linesV.push(
                <div
                    key={`l${i}`}
                    className={styles.line}
                    style={{
                        gridColumnStart: i,
                        gridColumnEnd: i + 1,
                        gridRowStart: 1,
                        gridRowEnd: 1440,
                        backgroundColor: i > 1 && "#fff"
                    }}
                />
            )
        }
        setLinesV(linesV);
    }, [])

    useEffect(() => {
        configureHours();
        configureEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, schedule])

    const chooseDay = useCallback((dayName)=>{
        setDay(()=>dayName)
    },[day, setDay])

    return (
        <>
            <div className={styles.calWeekDays}>
                <div className={styles.weekHeader}>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Mon</span>
                        <span 
                            className={classNames(styles.date, {
                                [styles.activeDay]: active === 'monday'
                            })}
                            onClick={()=> {
                                setActive('monday');
                                chooseDay(date.GetWeekDay(0))
                                setAvailableTimes(['10:00', '12:00', '13:20', '14:00', '15:50'])
                            }}
                        >
                            {date.GetWeekDay(0).getDate()}
                        </span>
                    </span>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Tue</span>
                        <span className={classNames(styles.date, {
                            [styles.activeDay]: active === 'tuesday'
                        })}
                            onClick={()=> {
                                setActive('tuesday');
                                chooseDay(date.GetWeekDay(1))
                                setAvailableTimes(['12:00', '14:25', '17:00', '18:00'])
                            }}
                        >{date.GetWeekDay(1).getDate()}</span>
                    </span>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Wed</span>
                        <span className={classNames(styles.date, {
                            [styles.activeDay]: active === 'wednesday'
                        })}
                            onClick={()=> {
                                setActive('wednesday')
                                chooseDay(date.GetWeekDay(2))
                                setAvailableTimes(['12:00', '14:00', '16:00'])
                            }}
                        >{date.GetWeekDay(2).getDate()}</span>
                    </span>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Thu</span>
                        <span className={classNames(styles.date, {
                            [styles.activeDay]: active === 'thursday'
                        })}
                            onClick={()=> {
                                setActive('thursday')
                                chooseDay(date.GetWeekDay(3))
                                setAvailableTimes(['12:00', '17:00'])
                            }}
                        >{date.GetWeekDay(3).getDate()}</span>
                    </span>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Fri</span>
                        <span className={classNames(styles.date, {
                            [styles.activeDay]: active === 'friday'
                        })}
                            onClick={()=> {
                                setActive('friday')
                                chooseDay(date.GetWeekDay(4))
                                setAvailableTimes(['12:00', '17:00'])
                            }}
                        >{date.GetWeekDay(4).getDate()}</span>
                    </span>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Sat</span>
                        <span className={classNames(styles.date, {
                            [styles.activeDay]: active === 'saturday'
                        })}
                            onClick={()=> {
                                setActive('saturday')
                                chooseDay(date.GetWeekDay(5))
                                setAvailableTimes(['12:00', '17:00'])
                            }}
                        >{date.GetWeekDay(5).getDate()}</span>
                    </span>
                    <span className={styles.dayInWeek}>
                        <span className={styles.weekDayName}>Sun</span>
                        <span className={classNames(styles.date, {
                            [styles.activeDay]: active === 'sunday'
                        })}
                            onClick={()=> {
                                setActive('sunday')
                                chooseDay(date.GetWeekDay(6))
                                setAvailableTimes(['12:00', '17:00'])
                            }}
                        >{date.GetWeekDay(6).getDate()}</span>
                    </span>
                </div>
                <button className={styles.showMore}>Show more</button>
            </div>
            {booking && 
                <div className={styles.availableTimes}>
                    <div className={styles.availableTimeHeader}>
                        <div className={styles.timeSquare}>
                            <img src="/timeSquare.svg" alt="" />
                        </div>
                        <h2>Available time</h2>
                    </div>
                </div>
            }
            {
                active !== '' ?
                <>
                    <div className={classNames(styles.weekContainer, {
                        [styles.hourList]: !booking 
                    })}>
                        {
                            booking ? <AvailableTime available={availableTimes}/> : <>
                                {hours}
                                {events}
                                {linesV}
                            </>
                        }
                        
                    </div>
                    {
                        booking && <button className={styles.timeShowMore}>Show more</button>
                    }
                </> : <span className={styles.pickDayCover}>choose a day</span>
            }
        </>
    )
}

function AvailableTime({day, available}) {
    const [active, setActive] = useState('');
    return (
        <>
            {available?.map((time)=>{
                return <div className={classNames(styles.availableTime,  {
                    [styles.activeTime]: active === time
                })}
                    onClick={()=> setActive(time)}
                >
                    {time}
                </div>
            })}
        </>
    )
}

function DayHeader({ title, className }) {
    return (
        <div className={classNames(styles.dayHeader, className)}>
            {title[0].substring(0, 3)}
        </div>
    );
}

function Day({ number, activeDay, ...props }) {
    return <div className={classNames(styles.day, {
        [styles.activeDay]:activeDay === number
    })} {...props}>
        <div className={styles.dayNumber}>
            {number}
        </div>
    </div>
}

function Event({ style, title, time, id }) {
    return <div className={styles.event} style={style}>
        <div className={styles.eventTitle}>
            {title}
        </div>
        <div className={styles.eventTime}>
            {time}
        </div>
    </div>
}

function Hour({ number, ...props }) {
    return (
        <div
            className={styles.hour}
            {...props}
        >
            <span className={styles.hourNumber}>{`${number < 10 ? `0${number}` : number}:00`}</span>
        </div>
    )
}