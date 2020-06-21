const initlesson = []
const lessonsReducer = (state = initlesson, action) => {
    switch (action.type) {
        case "GET_LESSONS":
            state = action.data
            break;
        default:
            break;
    }
    return state;
}
export default lessonsReducer;