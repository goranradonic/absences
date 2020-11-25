import {AbsencesPayload} from "./Absences";

export type MembersType = MembersPayload[]

export type MembersPayload = {
    crewId: number,
    id: number,
    image: string,
    name: string,
    userId: number,
    absences: AbsencesPayload[]
}