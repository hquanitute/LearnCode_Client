import { callApiAsPromise, apiBaseUrl } from "../api";
import { trackPromise  } from 'react-promise-tracker';

export function getForumAction(option){
    let limit = 5;
    let queryTags = '';
    let skip=option.skip&&option.skip||'';
    if (option.tags) {
        let splitTags= option.tags.split(' ');
        queryTags = splitTags.join('~').toLowerCase();
    }
    
    const request = callApiAsPromise("GET", apiBaseUrl + '/topics?limit='+limit+'&tags='+queryTags+'&skip='+skip, null, null )
    return dispatch =>
        trackPromise(request.then(response =>{
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

