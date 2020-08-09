import {callApiAsPromise, apiBaseUrl} from "../api";

export const DO_SEARCH = "DO_SEARCH";
export const CHANGE_SEARCH_CRITERIA = "CHANGE_SEARCH_CRITERIA";

export function doSearch(criteria) {
    const request = callApiAsPromise("GET", apiBaseUrl + "search", criteria, null)
    return dispatch =>
        request.then(response =>
            dispatch({
                data: response.data,
                type: DO_SEARCH
            })
        );
}

export function changeSearchCriteria(criteria) {
    return {
        type: CHANGE_SEARCH_CRITERIA,
        data: criteria,
    }
}
