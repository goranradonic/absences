import React, {useEffect, useState} from "react";
import cn from "classnames";
import './styles.scss'
import {MembersPayload} from "../../shared/types/Members";
import User from '../../assets/user.png'
import {AbsencesPayload} from "../../shared/types/Absences";
import ICal from "../ICal/ICal";

interface Props {
    members: Array<MembersPayload>,
}
export interface ICalType {
    title: string
    start: Array<string>
    end: Array<string>
    description: string
}

export const Members: React.FC<Props> = ({members}) => {

    const [ICalData, setICALData] = useState<Array<ICalType>>()

    function getEarliestDate(absences:Array<AbsencesPayload>) {
        const sortData = absences
            .map(absence=>absence)
            .sort((a,b) => Date.parse(a.startDate) - Date.parse(b.startDate))[0];

        return typeof sortData === 'object' ?  sortData : {type: null, startDate:null}
    }

    useEffect(()=>{
        if(members){
            let arrData:Array<ICalType> = []
            members.map(member=> member.absences.map(absence=>arrData.push({title:member.name, start: absence.startDate.split('-'), end: absence.endDate.split('-'), description: absence.memberNote})))
            setICALData(arrData)

        }
    },[]);

    return (
        <div className='members'>
            <div className="members__header">
                <ICal className='button basic' dataTest="button--download" event={ICalData}>
                    Add to Calendar
                </ICal>
            </div>
            <div className='members__container' data-test="user-list">
                {
                    members.map((member, index) => (
                        <div className='members-item' key={index} data-test="user">
                            <div className="members__image">
                                <img src={User} alt=""/>
                            </div>
                            <div className="members__data">
                                <h5 data-test="user-name">{member.name}</h5>

                                    <div>
                                        <span className={cn('member__status', getEarliestDate(member.absences).type)}>{getEarliestDate(member.absences).type}</span>
                                        <span className='member__absence--date'>{getEarliestDate(member.absences).startDate}</span>
                                    </div>

                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}