import {callApiAsPromise, apiBaseUrl} from "../api";
import {trackPromise} from 'react-promise-tracker';

export const CHANGE_CRITERIA = "CHANGE_CRITERIA";

export function getForumAction(criteria) {
    const request = callApiAsPromise("GET", apiBaseUrl + '/topics', criteria)
    return dispatch =>
        trackPromise(request.then(response => {
                dispatch({
                    data: response.data.content,
                    type: "GET_FORUM"
                });
                dispatch({
                    data: response.data.pagination,
                    type: "GET_PAGEABLE"
                });
            }
        ));
}

export function changeCriteria(criteria) {
    return {
        type: CHANGE_CRITERIA,
        data: criteria
    }
}

