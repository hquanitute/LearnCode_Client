let initlesson = [];

const forumReducer = (state = initlesson, action) => {
    switch (action.type) {
        case "GET_FORUM":
            state = action.data;
            break;
        default:
            break;
    }
    return state;
}
export default forumReducer;