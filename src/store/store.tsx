import React, {ReactNode, useMemo} from "react";
import {AppIO, useAppIO} from "./use-app-io";


export const AppStoreContext = React.createContext<{
    io: AppIO,
    pendingIO: number,

}>(null as any)

export function AppStore(props:{children: ReactNode}) {

    const {io, pendingIO} = useAppIO();
    const contextValue = useMemo(() => ({ io, pendingIO }), [io, pendingIO]);

    return <AppStoreContext.Provider value={contextValue}>{props.children}</AppStoreContext.Provider>;

}