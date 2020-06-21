import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import coursesReducer from './../reducers/coursesReducer';
import challengeSelectedReducer from "../reducers/challengeSelectedReducer";
import userReducer from "../reducers/userReducer";
import forumReducer from "../reducers/forumReducer";
import topicReducer from "../reducers/topic.Reducer";

export default createStore(
    combineReducers({
        courses:coursesReducer,
        challengeSelected:challengeSelectedReducer,
        userInfo: userReducer,
        forum:forumReducer,
        topic:topicReducer,
    }),
    {},
    applyMiddleware(createLogger(),thunk)
)