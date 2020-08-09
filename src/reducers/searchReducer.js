import {CHANGE_SEARCH_CRITERIA, DO_SEARCH} from "../actions/searchAction";

let initState = {
    result: {
        challenges: [],
        topics: []
    },
    criteria: {
        key: "",
        limit: 10
    }

}
;

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case DO_SEARCH:
            state = {...state, result: action.data};
            break;
        case CHANGE_SEARCH_CRITERIA:
            console.log(action.data);
            state = {...state, criteria: action.data};
            break;
        default:
            break;
    }
    return state;
}
export default searchReducer;