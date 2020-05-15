import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
function Test2(props) {
    let { topic,lesson } = useParams();
    return (
        <div>
            <h3>ID: {topic}</h3>
            <h3>ID: {lesson}</h3>
        </div>
    );
}

export default Test2;