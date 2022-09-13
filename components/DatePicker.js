import classNames, { Value } from 'classnames';
import styles from '../styles/components/datePicker.module.css';
import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import next from 'next';

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
    return new Date(
        date.setDate(
            date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1)
        )
    );
};
Date.prototype.GetLastDayOfWeek = function () {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    return new Date(
        date.setDate(
            date.getDate() - date.getDay() + (date.getDay() == 0 ? 0 : 7)
        )
    );
};
Date.prototype.GetWeekDay = function (weekday) {
    const date = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const day = this.getDay();
    return new Date(
        date.setDate(date.getDate() - day + (day == 0 ? -6 : 1) + weekday)
    );
};

function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(day, month, year) {
    const dayOfWeek = new Date(year, month, day).getDay();
    return dayOfWeek + 1;
}

function getPrevMonthDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month === 0) {
        month = 12;
        year -= 1;
    } else {
        month -= 1;
    }
    return new Date(year, month);
}

function getNextMonthDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    if (month === 11) {
        month = 0;
        year += 1;
    } else {
        month += 1;
    }
    return new Date(year, month);
}

function compareDateMonth(dateA, dateB) {
    if (dateA.getFullYear() > dateB.getFullYear()) return true;
    if (dateA.getFullYear() < dateB.getFullYear()) return false;
    if (dateA.getMonth() > dateB.getMonth()) return true;
    return false;
}

function compareDate(dateA, dateB) {
    if (dateA.getFullYear() >= dateB.getFullYear()) return true;
    if (dateA.getFullYear() < dateB.getFullYear()) return false;
    if (dateA.getMonth() >= dateB.getMonth()) return true;
    if (dateA.getMonth() < dateB.getMonth()) return false;
    if (dateA.getDate() >= dateB.getDate()) return true;
    return false;
}

export default function DatePicker({
    className,
    label,
    value,
    placeholder,
    onChange,
    mode,
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={classNames([styles.inputContainer, className])}>
            {label && <span className={styles.label}>{label}</span>}
            <div className={styles.input}>
                <ReactSVG
                    src={'/calendar.svg'}
                    className={classNames(styles.iconContainer)}
                    onClick={() => setIsOpen(!isOpen)}
                />
                <input
                    value={value}
                    placeholder={placeholder}
                    onChange={(event) =>
                        onChange?.call(null, event.target.value)
                    }
                />
                <ReactSVG
                    src={'/inputArrow.svg'}
                    className={classNames(styles.arrowContainer)}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {mode === 'single' && (
                    <Picker
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onChange={(start) => {
                            onChange?.call(null, start);
                        }}
                    />
                )}
                {mode === 'range' && (
                    <RangePicker
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        dateStartChange={(start) => {
                            onChange?.call(null, start);
                        }}
                        dateEndChange={(start, end) => {
                            onChange?.call(null, `${start} - ${end}`);
                        }}
                    />
                )}
            </div>
        </div>
    );
}


const Picker = ({ isOpen, onChange, onClose }) => {
    const [days, setDays] = useState([]);
    const [date, setDate] = useState(new Date());
    const [selected, setSelected] = useState();
    function configureDays() {
        const daysCount = daysInMonth(date.getMonth(), date.getFullYear());
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(
                <DayHeader
                    title={DayName[i]}
                    className={
                        i === 0 ? styles.left : i === 6 ? styles.right : null
                    }
                />
            );
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth(), date.getFullYear());
            days.push(
                <Day
                    key={`d${i}`}
                    className={classNames({
                        [styles.selected]:
                            selected &&
                            date.getFullYear() === selected.getFullYear() &&
                            date.getMonth() === selected.getMonth() &&
                            selected.getDate() === i,
                    })}
                    onClick={() => {
                        setSelected(
                            new Date(date.getFullYear(), date.getMonth(), i)
                        );
                    }}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount =
            getDayOfWeek(1, date.getMonth(), date.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(
            date.getMonth() - 1,
            date.getFullYear()
        );
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(
                i,
                date.getMonth() - 1,
                date.getFullYear()
            );
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                />
            );
        }

        const nextDaysCount =
            7 - getDayOfWeek(daysCount, date.getMonth(), date.getFullYear());
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(
                i,
                date.getMonth() + 1,
                date.getFullYear()
            );
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
        }
        setDays(days);
    }
    useEffect(() => {
        configureDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, selected]);
    return (
        <div
            className={classNames(styles.pickerContainer, {
                [styles.closed]: !isOpen,
            })}
        >
            <div className={styles.pickerHeader}>
                <div
                    className={styles.moveBtn}
                    onClick={() => setDate(getPrevMonthDate(date))}
                >
                    {'<'}
                </div>
                <div className={styles.date}>{`${MonthName[date.getMonth()]
                    }, ${date.getFullYear()}`}</div>
                <div
                    className={styles.moveBtn}
                    onClick={() => setDate(getNextMonthDate(date))}
                >
                    {'>'}
                </div>
            </div>
            <div className={styles.calendar}>{days}</div>
        </div>
    );
};

const RangePicker = ({
    isOpen,
    onClose,
    dateStartChange,
    dateEndChange,
}) => {
    const [days, setDays] = useState([]);
    const [nextDays, setNextDays] = useState([]);
    const [date, setDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(getNextMonthDate(date));
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [target, setTarget] = useState<'start' | 'end'>('start');

    function configureDays() {
        const daysCount = daysInMonth(date.getMonth(), date.getFullYear());
        const days = [];
        for (let i = 6; i < 13; i++) {
            days.push(
                <DayHeader
                    title={DayName[i % 7]}
                    className={
                        i === 0 ? styles.left : i === 6 ? styles.right : null
                    }
                />
            );
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(i, date.getMonth(), date.getFullYear());
            days.push(
                <Day
                    key={`d${i}`}
                    className={classNames({
                        [styles.selected]:
                            (dateStart &&
                                date.getFullYear() ===
                                dateStart.getFullYear() &&
                                date.getMonth() === dateStart.getMonth() &&
                                dateStart.getDate() === i) ||
                            (dateEnd &&
                                date.getFullYear() === dateEnd.getFullYear() &&
                                date.getMonth() === dateEnd.getMonth() &&
                                dateEnd.getDate() === i),
                        [styles.disabled]:
                            target === 'end' &&
                            dateStart &&
                            new Date(date.getFullYear(), date.getMonth(), i) <
                            dateStart,
                        [styles.inRange]:
                            dateStart &&
                            dateEnd &&
                            new Date(date.getFullYear(), date.getMonth(), i) >
                            dateStart &&
                            new Date(date.getFullYear(), date.getMonth(), i) <
                            dateEnd,
                    })}
                    onClick={() => {
                        if (target === 'start') {
                            setTarget('end');
                            setDateEnd(null);
                            const newDate = new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                i
                            );
                            setDateStart(newDate);
                            return;
                        }
                        setTarget('start');
                        setDateEnd(
                            new Date(date.getFullYear(), date.getMonth(), i)
                        );
                    }}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount =
            getDayOfWeek(1, date.getMonth(), date.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(
            date.getMonth() - 1,
            date.getFullYear()
        );
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(
                i,
                date.getMonth() - 1,
                date.getFullYear()
            );
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    className={classNames(styles.otherDays)}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                />
            );
        }

        const nextDaysCount =
            7 - getDayOfWeek(daysCount, date.getMonth(), date.getFullYear());
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(
                i,
                date.getMonth() + 1,
                date.getFullYear()
            );
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
        }
        setDays(days);
    }

    function configureNextDays() {
        const daysCount = daysInMonth(
            nextDate.getMonth(),
            nextDate.getFullYear()
        );
        const days = [];
        for (let i = 6; i < 13; i++) {
            days.push(
                <DayHeader
                    title={DayName[i % 7]}
                    className={
                        i === 0 ? styles.left : i === 6 ? styles.right : null
                    }
                />
            );
        }
        let row = 2;
        for (let i = 1; i <= daysCount; i++) {
            const column = getDayOfWeek(
                i,
                nextDate.getMonth(),
                nextDate.getFullYear()
            );
            days.push(
                <Day
                    key={`d${i}`}
                    className={classNames({
                        [styles.selected]:
                            (dateStart &&
                                nextDate.getFullYear() ===
                                dateStart.getFullYear() &&
                                nextDate.getMonth() === dateStart.getMonth() &&
                                dateStart.getDate() === i) ||
                            (dateEnd &&
                                nextDate.getFullYear() ===
                                dateEnd.getFullYear() &&
                                nextDate.getMonth() === dateEnd.getMonth() &&
                                dateEnd.getDate() === i),
                        [styles.disabled]:
                            target === 'end' &&
                            dateStart &&
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            ) < dateStart,
                        [styles.inRange]:
                            dateStart &&
                            dateEnd &&
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            ) > dateStart &&
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            ) < dateEnd,
                    })}
                    onClick={() => {
                        if (target === 'start') {
                            setTarget('end');
                            setDateEnd(null);
                            setDateStart(
                                new Date(
                                    nextDate.getFullYear(),
                                    nextDate.getMonth(),
                                    i
                                )
                            );
                            return;
                        }
                        setTarget('start');
                        setDateEnd(
                            new Date(
                                nextDate.getFullYear(),
                                nextDate.getMonth(),
                                i
                            )
                        );
                    }}
                    number={i}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
            if (column === 7) {
                row++;
            }
        }

        const prevDaysCount =
            getDayOfWeek(1, nextDate.getMonth(), nextDate.getFullYear()) - 1;
        const prevMonthDays = daysInMonth(
            nextDate.getMonth() - 1,
            nextDate.getFullYear()
        );
        for (let i = prevMonthDays; i > prevMonthDays - prevDaysCount; i--) {
            const column = getDayOfWeek(
                i,
                nextDate.getMonth() - 1,
                nextDate.getFullYear()
            );
            days.unshift(
                <Day
                    key={`dp${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                />
            );
        }

        const nextDaysCount =
            7 -
            getDayOfWeek(
                daysCount,
                nextDate.getMonth(),
                nextDate.getFullYear()
            );
        for (let i = 1; i <= nextDaysCount; i++) {
            const column = getDayOfWeek(
                i,
                nextDate.getMonth() + 1,
                nextDate.getFullYear()
            );
            days.push(
                <Day
                    key={`df${i}`}
                    number={i}
                    className={styles.otherDays}
                    style={{
                        gridColumnStart: column,
                        gridColumnEnd: column + 1,
                        gridRowStart: row,
                        gridRowEnd: row + 1,
                    }}
                />
            );
        }
        setNextDays(days);
    }

    useEffect(() => {
        configureNextDays();
        configureDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, nextDate, dateStart, dateEnd]);

    useEffect(() => {
        if (!dateStart) {
            dateStartChange?.call(null, '');
            return;
        }
        if (dateStart === undefined) return;
        dateStartChange?.call(null, dateStart.toLocaleDateString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateStart]);

    useEffect(() => {
        if (!dateEnd) {
            if (!dateStart) return;
            dateEndChange?.call(null, dateStart?.toLocaleDateString(), '');
            return;
        }
        dateEndChange?.call(
            null,
            dateStart.toLocaleDateString(),
            dateEnd.toLocaleDateString()
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateEnd]);

    return (
        <div
            className={classNames(styles.rangePickerContainer, {
                [styles.closed]: !isOpen,
            })}
        >
            <div className={styles.pickerSide}>
                <div className={styles.pickerHeader}>
                    <div
                        className={styles.moveBtn}
                        onClick={() => setDate(getPrevMonthDate(date))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/left.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                    <div className={styles.date}>{`${MonthName[date.getMonth()]
                        }, ${date.getFullYear()}`}</div>
                    <div
                        className={classNames(styles.moveBtn, {
                            [styles.deactive]: !compareDateMonth(
                                nextDate,
                                getNextMonthDate(date)
                            ),
                        })}
                        onClick={() => setDate(getNextMonthDate(date))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/right.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                </div>
                <div className={styles.calendar}>{days}</div>
            </div>
            <div className={styles.pickerSide}>
                <div className={styles.pickerHeader}>
                    <div
                        className={classNames(styles.moveBtn, {
                            [styles.deactive]: !compareDateMonth(
                                getPrevMonthDate(nextDate),
                                date
                            ),
                        })}
                        onClick={() => setNextDate(getPrevMonthDate(nextDate))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/left.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                    <div className={styles.date}>{`${MonthName[nextDate.getMonth()]
                        }, ${nextDate.getFullYear()}`}</div>
                    <div
                        className={styles.moveBtn}
                        onClick={() => setNextDate(getNextMonthDate(nextDate))}
                    >
                        <ReactSVG
                            src="/images/icons/datepicker/right.svg"
                            className={styles.iconContainer}
                        />
                    </div>
                </div>
                <div className={styles.calendar}>{nextDays}</div>
            </div>
        </div>
    );
};

function DayHeader({ title, className }) {
    return (
        <div className={classNames(styles.dayHeader, className)}>
            {title[0].substr(0, 3)}
        </div>
    );
}

function Day({ number, className, onClick, ...props }) {
    return (
        <div
            className={classNames(styles.day, className)}
            {...props}
            onClick={onClick}
        >
            <div className={styles.dayNumber}>{number}</div>
        </div>
    );
}