let initlesson = [];

const forumReducer = (state = initlesson, action) => {
    switch (action.type) {
        case "GET_FORUM":
            state={
                ...state,
                lsTopic:action.data
            }
            break;
        case  "GET_PAGEABLE":
            state={
                ...state,
                pageable:action.data,
            }
        default:
            break;
    }
    return state;
}
export default forumReducer;