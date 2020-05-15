import React, { useState, useEffect } from 'react';
var jwtDecode = require('jwt-decode');

function Welcome(props) {
    const [user,setUser] = useState({})

    useEffect(() => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoicXVhblVURSJ9.mkn70oDzmTaWbSFRQt3-QC7DZWl5S8fak0yH5NOAw4A'
        let decoded = jwtDecode(token);
        setUser(decoded)
    },[])
    if(user.id){
        return (
            <div>
                <h1 className="">Welcome back, {user.name}.</h1>
            </div>
        );
    } else {
        return(
            <div>
                <h1 className="">Welcome to Learn Code</h1>
            </div>
        )
    }
    
}

export default Welcome;