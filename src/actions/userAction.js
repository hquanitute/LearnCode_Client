export function setUserByTokenAction(token){
    return {
        type: "SET_USER_BY_TOKEN",
        data: token
    }
}

export function updateUser(user){
    return {
        type: "UPDATE_USER",
        data: user
    }
}