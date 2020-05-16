import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import coursesReducer from './../reducers/coursesReducer';
import lessonsReducer from './../reducers/lessonsReducer';
import challengesReducer from './../reducers/challengesReducer';
import courseSelectedReducer from "../reducers/courseSelectedReducer";
import challengeSelectedReducer from "../reducers/challengeSelectedReducer";

export default createStore(
    combineReducers({
        courses:coursesReducer,
        // lessons:lessonsReducer,
        // challenges:challengesReducer,
        // courseSelected:courseSelectedReducer,
        challengeSelected:challengeSelectedReducer,
    }),
    {},
    applyMiddleware(createLogger(),thunk)
)