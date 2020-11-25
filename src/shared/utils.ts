import {Reducer} from "react";
import logger from "use-reducer-logger";

export function reduceLogger<State, Action>(reducer: Reducer<State, Action>): Reducer<State, Action> {
    return logger(reducer);
}

export function groupDays(array: Array<Date>) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const sortedDates: Array<{ name: string, dates: Array<Date> }> = [];

    array && array.map(date => {
        const month = months[date.getMonth()];
        const monthObj = sortedDates.find(datesByMonth => datesByMonth.name === month)

        if (monthObj === undefined) {
            sortedDates.push({
                name: month,
                dates: [
                    date
                ]
            })
            return sortedDates;
        }
        return monthObj.dates.push(date);
    });

    return sortedDates;

}