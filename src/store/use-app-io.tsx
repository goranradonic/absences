import {ApiCallResult, fetchApi} from "../hooks/use-fetch";
import {MembersType} from "../shared/types/Members";
import {useMemo, useState} from "react";
import {AbsencesType} from "../shared/types/Absences";

export type AppIO = {
    getMembers: () => Promise<ApiCallResult<MembersType, unknown>>;
    getMemberById: (userId:string) => Promise<ApiCallResult<MembersType, unknown>>;
    getAbsences: (startDate: string | null, endDate:string | null) => Promise<ApiCallResult<AbsencesType, unknown>>;
}

export function useAppIO() {
    const [pendingIOCount, setPendingIOCount] = useState(0);

    function withPendingIO<T>(fetcher: () => Promise<T>) {
        setPendingIOCount(s => s + 1);
        const promise = fetcher();

        promise.finally(() => {
            setPendingIOCount(s => s - 1);
        });

        return promise;
    }

    const io: AppIO = useMemo(() => {

        const headers = new Headers({"Content-Type": "application/json"})
        return {
            getMembers: (): Promise<ApiCallResult<MembersType, unknown>> =>
                withPendingIO(() => {
                    return fetchApi(`/members`, {
                        method: 'GET',
                        headers,
                    })
                }),
            getMemberById: (userId: string): Promise<ApiCallResult<MembersType, unknown>> =>
                withPendingIO(() => {
                    return fetchApi(`/members?userId=${userId}`, {
                        method: 'GET',
                        headers,
                    })
                }),

            getAbsences: (startDate: string | null, endDate:string | null): Promise<ApiCallResult<AbsencesType, unknown>> =>
                withPendingIO(() => {
                    return fetchApi(startDate !== null && endDate !== null ? `/absences?startDate_gte=${startDate}&endDate_lte=${endDate}`: `/absences`, {
                        method: 'GET',
                        headers,
                    })
                })
        }
    }, [])

    return {io, pendingIO: pendingIOCount};
}