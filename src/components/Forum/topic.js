import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { callApiAsPromise, apiBaseUrl } from '../../api';

function Topic(props) {

    let { topicId } = useParams();
    const [topic, setTopic] = useState({});

    useEffect(() => {
        callApiAsPromise('get', apiBaseUrl + 'topics/' + topicId, null, null).then(response => {
            setTopic(response.data.content)
            
        }).catch(error =>{
            alert(error);
        })
    }, [])

    return (
        <div>
            <h3>ID: {topicId}</h3>
        </div>
    );
}

export default Topic;