import { callApiAsPromise, api_base } from "../api";

const initlesson = {}
const challengeSelectedReducer = (state = initlesson, action) => {
    switch (action.type) {
        case "GET_CHALLENGES_BY_ID":
            state =action.data;
            break;
        case "SET_LESSONS":
            state = {...state, lessons: action.data}
    }
    return state;
}
export default challengeSelectedReducer;