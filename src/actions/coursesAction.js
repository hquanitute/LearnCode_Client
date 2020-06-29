import { callApiAsPromise, apiBaseUrl } from "../api";

export function setCourses(courses){
    return {
        type: "SET_COURSES",
        data: courses
    }
}

export function setCourseSelectedAction(course){
    return {
        type: "SET_COURSE_SELECTED",
        data: course
    }
}

export function updateCourseSelectedAction(courseID){
    const request = callApiAsPromise("GET", apiBaseUrl + "courses/" +courseID, null, null)
    return dispatch =>
        request.then(response =>
            dispatch({
                data: response.data.content,
                type: "UPDATE_COURSE_SELECTED"
            })
        );
}

export function resetCourseSelectedAction(){
    return {
        type: "RESET_COURSE_SELECTED",
    }
}

export function getUpdateCourseAction(){
    const request = callApiAsPromise("GET", apiBaseUrl+"courses/getPublished", null, null)    
    return dispatch =>
        request.then(response =>
            dispatch({
                data: response.data.content,
                type: "GET_UPDATE_COURSE"
            })
        );
}