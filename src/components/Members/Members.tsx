import React from "react";
import cn from "classnames";
import './styles.scss'
import {MembersPayload} from "../../shared/types/Members";
import User from '../../assets/user.png'
import {AbsencesPayload} from "../../shared/types/Absences";

interface Props {
    members: Array<MembersPayload>,
}

export const Members: React.FC<Props> = ({members}) => {

    function getEarliestDate(absences:Array<AbsencesPayload>) {
        const sortData = absences
            .map(absence=>absence)
            .sort((a,b) => Date.parse(a.startDate) - Date.parse(b.startDate))[0];

        return typeof sortData === 'object' ?  sortData : {type: null, startDate:null}
    }


    return (
        <div className='members'>
            <div className='members__container'>
                {
                    members.map((member, index) => (
                        <div className='members-item' key={index}>
                            <div className="members__image">
                                <img src={User} alt=""/>
                            </div>
                            <div className="members__data">
                                <h5>{member.name}</h5>

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