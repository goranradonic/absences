
export type Thunk<T> = () => T;

export function suspend<T>(t: () => Promise<T>, delayMs: number): Thunk<Promise<T>> {
    if (delayMs <= 0) {
        return t;
    }

    return () =>
        new Promise(resolve => window.setTimeout(resolve, delayMs)).then(() => {
            return t();
        });
}


export const tuple = <T extends any[]>(...args: T): T => args;
