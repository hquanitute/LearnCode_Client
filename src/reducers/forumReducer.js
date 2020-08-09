import {CHANGE_CRITERIA} from "../actions/forumAction";

let initState = {
        criteria: {
            limit: 5,
            tags: "",
            skip: ""
        },
        pageable: {current_page: 0, max_page: 0, total: 0}
    }
;

const forumReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_FORUM":
            state = {
                ...state,
                lsTopic: action.data
            }
            break;
        case  "GET_PAGEABLE":
            state = {
                ...state,
                pageable: action.data,
            }
            break;
        case CHANGE_CRITERIA:
            state = {
                ...state,
                criteria: action.data
            }
            break;
        default:
            break;
    }
    return state;
}
export default forumReducer;