let initlesson = {};

const topicReducer = (state = initlesson, action) => {
    switch (action.type) {
        case "":
            state = {};
            break;
        default:
            break;
    }
    return state;
}
export default topicReducer;