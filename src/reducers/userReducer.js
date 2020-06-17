var jwt = require('jsonwebtoken');

let initlesson = {};
if(localStorage.getItem('jwt')){
    jwt.verify(localStorage.getItem('jwt'), process.env.REACT_APP_CLIENT_SECRET , function (err, decoded) {
        if (!err) {
            initlesson = decoded;
        }
    });
}

const userReducer = (state = initlesson, action) => {
    switch (action.type) {
        case "SET_USER_BY_TOKEN":
            jwt.verify(action.data, process.env.REACT_APP_CLIENT_SECRET, function (err, decoded) {
                if (!err) {
                    state = decoded;
                }
            });
            break;
        default:
            break;
    }
    return state;
}
export default userReducer;