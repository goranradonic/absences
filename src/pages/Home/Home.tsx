import React, {useContext, useEffect, useState} from "react";
import {MembersPayload} from "../../shared/types/Members";
import {AbsencesPayload} from "../../shared/types/Absences";
import {AppStoreContext} from "../../store/store";
import { Timeline } from "../../components/Timeline/Timeline";
import * as H from "history";


export function Home(props:{location: H.Location<unknown>}) {
    const [members, setMembers] = useState<Array<MembersPayload>>();
    const [absences, setAbsences] = useState<Array<AbsencesPayload>>();

    const params = new URLSearchParams(props.location.search);
    const userId = params.get('userID');

    const {io} = useContext(AppStoreContext);


    useEffect(()=>{

        if(userId){
            io.getMemberById(userId).then(user=>{
                if(user.tag === 'loaded'){
                    setMembers(user.data)
                }
            })
        }else{
            io.getMembers().then(res=>{
                if(res.tag === 'loaded'){
                    setMembers(res.data)
                }
            });
        }

        io.getAbsences().then(res=>{
            if(res.tag === 'loaded'){
                setAbsences(res.data)
            }
        });

    },[])

    return(
        <>
            {members && absences && <Timeline members={members} absences={absences} />}
        </>
    )
}