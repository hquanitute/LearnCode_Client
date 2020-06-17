export function setUserByTokenAction(token){
    return {
        type: "SET_USER_BY_TOKEN",
        data: token
    }
}