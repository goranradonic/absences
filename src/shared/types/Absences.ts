export type AbsencesType = {
    message: string,
    payload: Array<AbsencesPayload>
}

export type AbsencesPayload = {
    admitterId: null,
    admitterNote: string,
    confirmedAt: string,
    createdAt: string,
    crewId: number,
    endDate: string,
    id: number,
    memberNote: string,
    rejectedAt: null,
    startDate: string,
    type: string,
    userId: number
}