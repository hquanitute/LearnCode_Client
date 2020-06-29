import { callApiAsPromise, apiBaseUrl } from "../api";

export function getLessons() {
    const request = callApiAsPromise("GET", apiBaseUrl + "lessons", null, null)
    return dispatch =>
        request.then(response =>
            dispatch({
                data: response.data.content,
                type: "GET_LESSONS"
            })
        );
}

export function setLessonSelectedAction(lesson) {
    return {
        type: "SET_LESSON_SELECTED",
        lesson: lesson, 
    }
}
