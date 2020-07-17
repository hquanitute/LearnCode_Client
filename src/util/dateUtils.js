import moment from "moment";

export const DATE_FORMAT = 'DD/MM/YYYY hh:mm';

export function covertMillisecondToDate(millisecond,format){
    return moment(millisecond, "x").format(format)
}