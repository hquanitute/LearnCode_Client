import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import Test from './test';
import Test2 from './test2';

function ListPractice(props) {
    let { path, url } = useRouteMatch();
    
    return (
        <div>
            <Router>
                <Link to={`${url}/topics1/bai1/challenge1`}>Topics</Link>

                <Switch>
                    <Route exact path={`${path}/:topic/:lesson/`} children={<Test2 />} />
                    <Route path={`${path}/:topic/:lesson/:challenge`} children={<Test />} />
                </Switch>
            </Router>
        </div>
    );
}

export default ListPractice;