import { callApiAsPromise, apiBaseUrl } from "../api";
import { trackPromise  } from 'react-promise-tracker';

export function getForumAction(option){
    let limit = 5;
    let queryTags = '';
    if (option.tags) {
        let splitTags= option.tags.split(' ');
        queryTags = splitTags.join('~').toLowerCase();
    }
    
    const request = callApiAsPromise("GET", apiBaseUrl + '/topics?limit='+limit+'&tags='+queryTags, null, null )
    return dispatch =>
        trackPromise(request.then(response =>
            dispatch({
                data: response.data.content,
                type: "GET_FORUM"
            })
        ));
}

