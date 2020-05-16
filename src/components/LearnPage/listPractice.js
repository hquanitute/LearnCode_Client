import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import { getUpdateCourseAction } from '../../actions/coursesAction';

function ListPractice(props) {
    let { path, url } = useRouteMatch();
    
    return (
        <div>
            <Router>
                <Link to={`${url}/topics1/bai1/challenge1`}>Topics</Link>
            </Router>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        challenges: state.challenges,
        
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPractice);