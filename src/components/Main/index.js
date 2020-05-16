import React, { useEffect } from 'react';
import LearnPage from '../LearnPage';
import { Link, BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import '../../style/css/navbar.css';
import { connect } from 'react-redux';
import Challenge from '../LearnPage/challenge';
import { getUpdateCourseAction } from '../../actions/coursesAction';
const { Search } = Input;
function Main(props) {
    useEffect(() => {
        props.getCourses();
    },[])
    useEffect(() => {
        console.log("Helllllo");
        
    },[props.challengeSelected])
    // let { path, url } = useRouteMatch();
    return (
        <div>
            <Router>
                <div className="content-center">
                    <nav>
                        <Row className="p-0 font-bold bg-blue-700">
                            <Col span={6}>
                                <Search className="m-0 textGrey" id="search-input" placeholder="Input course you want to learn" onSearch={value => console.log(value)} />
                            </Col>
                            {/* Offset: grid=24 grid-6:for search. offset = ((24/2-6)-(span))/2= 5 */}
                            <Col span={2} offset={5}>
                                <Link className="textGrey font-extrabold tracking-widest text-3xl" to="/">
                                    LearnCodeClient
                                </Link>
                            </Col>
                            <Col className="my-2" span={1} offset={7}>
                                <Link className="textGrey rightNav bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/new">new</Link>
                            </Col>
                            <Col className="my-2" span={1} offset={0}>
                                <Link className="textGrey rightNav bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/tailwind">forum</Link>
                            </Col>
                            <Col className="my-2" span={1} offset={0}>
                                <Link className="textGrey rightNav bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/learn">learn</Link>
                            </Col>
                        </Row>
                    </nav>
                    {/* <Link className="textGrey rightNav bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/learn/top1/ba1/da">topic111</Link> */}
                    <Switch>
                        <Route exact path="/learn" children={<LearnPage />} />
                        {/* <Route path={`/learn/:topic/:lesson/`} children={<IntroLesson />} /> */}
                        <Route path={`/learn/:challengeId`} children={<Challenge />} />
                        {/* <Route path="/">
                            <Home />
                        </Route> */}
                    </Switch>
                </div>
            </Router>
        </div >
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCourses: () => {
            dispatch(getUpdateCourseAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);