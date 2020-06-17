import { combineReducers, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import coursesReducer from './../reducers/coursesReducer';
import challengeSelectedReducer from "../reducers/challengeSelectedReducer";
import userReducer from "../reducers/userReducer";

export default createStore(
    combineReducers({
        courses:coursesReducer,
        challengeSelected:challengeSelectedReducer,
        userInfo: userReducer
    }),
    {},
    applyMiddleware(createLogger(),thunk)
)