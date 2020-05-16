import { callApiAsPromise, apiBaseUrl } from "../api";

export function getAllChallenge(){
    const request = callApiAsPromise("GET", "http://127.0.0.1:5000/api/challenges", null, null)
    return dispatch =>
        request.then(response =>
            dispatch({
                data: response.data.content,
                type: "GET_CHALLENGES"
            })
        );
}

export function getOneChallenge(nameChallenge){
    return {
        type: "GET_ONE",
        data: nameChallenge
    }
}

export function setChallengeSelectedAction(challengeId){
    const request = callApiAsPromise("GET", apiBaseUrl+"challenges/"+challengeId, null, null)
    return dispatch =>
        request.then(response =>
            dispatch({
                data: response.data.content,
                type: "GET_CHALLENGES_BY_ID"
            })
        );
}