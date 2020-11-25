import React, {useEffect, useState} from "react";
import './styles.scss'
import {groupDays} from "../../shared/utils";
import {Members} from "../Members/Members";
import {MembersPayload} from "../../shared/types/Members";
import {AbsencesPayload} from "../../shared/types/Absences";
import cn from "classnames";

interface Props {
    absences: Array<AbsencesPayload>,
    members: Array<MembersPayload>,
}

export const Timeline: React.FC<Props> = ({absences, members}) => {

    const [extendMembers, setExtendMembers] = useState<Array<MembersPayload>>()


    useEffect(() => {
        const extendMembersData = members.map(member => {
            member.absences = absences.filter(absence => absence.userId === member.userId) || [];
            return member
        });
        setExtendMembers(extendMembersData)
    }, []);


    const sortData = absences && absences.sort((a, b) => {
        let aS = (new Date(a.startDate)).getTime() / 1000
        let bS = (new Date(b.startDate)).getTime() / 1000
        return aS - bS
    });

    const getDaysArray = (start: Date, end: Date) => {

        const startDate = new Date(start.setMonth(start.getMonth() - 1))
        const endDate = new Date(end.setMonth(end.getMonth() + 1))
        let arr = [];
        for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };

    const daysList = sortData && getDaysArray(new Date(sortData[0].startDate), new Date(sortData[sortData.length - 1].startDate));

    const groupedDays = groupDays(daysList || []);
    const convertDateToString = (date: Date) => date.toLocaleString('en-US', {day: '2-digit'});


    return (
        <div className="timeline">
            {extendMembers && <Members members={extendMembers}/>}
            <div className="timeline__container">
                <div className="timeline__container--header">
                    {groupedDays.map((day, idx) => (
                        <div className='timeline__container--monthBox' key={idx}>
                            <h3>{day.name}</h3>
                            <div className="timeline__container--monthBox__date">
                                {day.dates.map((date, idx) => <span key={idx}>{convertDateToString(date)}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="timeline__grid">
                    {
                        extendMembers && extendMembers.map((member, index) => (
                                <div className='timeline__grid--column' key={index}>
                                    {
                                        daysList &&
                                        <TimelineCell daysList={daysList} absences={member.absences} key={index}/>
                                    }
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export const TimelineCell = (props: { daysList: Array<Date>, absences: Array<AbsencesPayload> }) => {

    function daysBetween(date1: string, date2: string) {

        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate: any = new Date(date1);
        const secondDate: any = new Date(date2);

        return Math.round(Math.abs((firstDate - secondDate) / oneDay)) === 0 ? 24 : Math.round(Math.abs((firstDate - secondDate) / oneDay)) * 24;


    }

    function createEventOnCell(day: Date) {
        return props.absences.map((absence, idx) => {
            if (day.toISOString().substring(0, 10) === absence.startDate) return (<span key={idx}
                                                                                        className={cn('absence', absence.type, {'one-day': daysBetween(absence.startDate, absence.endDate) === 24})}
                                                                                        style={{width: `${daysBetween(absence.startDate, absence.endDate)}px`}}/>)

            return '';
        })
    }


    return (
        <>
            {props.daysList.map((day, idx) => (
                <div className='timeline__cell' key={idx}>
                    {createEventOnCell(day)}
                </div>
            ))}
        </>
    )
}