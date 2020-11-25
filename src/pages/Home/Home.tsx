import React, {useContext, useEffect, useState} from "react";
import {MembersPayload} from "../../shared/types/Members";
import {AbsencesPayload} from "../../shared/types/Absences";
import {AppStoreContext} from "../../store/store";
import { Timeline } from "../../components/Timeline/Timeline";

export function Home() {
    const [members, setMembers] = useState<Array<MembersPayload>>();
    const [absences, setAbsences] = useState<Array<AbsencesPayload>>();

    const {io} = useContext(AppStoreContext);


    useEffect(()=>{

        io.getMembers().then(res=>{
            if(res.tag === 'loaded'){
                setMembers(res.data.payload)
            }
        });

        io.getAbsences().then(res=>{
            if(res.tag === 'loaded'){
                setAbsences(res.data.payload)
            }
        });

    },[])

    return(
        <>
            {members && absences && <Timeline members={members} absences={absences} />}
        </>
    )
}