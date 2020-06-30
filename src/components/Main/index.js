import React, { useEffect, useState } from 'react';
import LearnPage from '../LearnPage';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../style/css/navbar.css';
import { connect } from 'react-redux';
import Challenge from '../LearnPage/challenge';
import UserProfile from '../User'
import { getUpdateCourseAction } from '../../actions/coursesAction';
import VerifyLogin from '../Login/verifyLogin';
import Forum from '../Forum';
import Topic from '../Forum/topic';
import Home from '../Home';

function Main(props) {
    useEffect(() => {
        props.getCourses();
    }, [])

    const mainLogedIn = (
        <div className=''>
            <Router>
                <div className="content-center min-h-screen">
                    <nav>
                        <Row className="p-0 font-bold bg-gray-900">
                            {/* <Col span={6}>
                                <Search className="m-0 textGrey" id="search-input" placeholder="Input course you want to learn" onSearch={value => console.log(value)} />
                            </Col> */}
                            {/* Offset: grid=24 grid-6:for search. offset = ((24/2-6)-(span))/2= 5 */}
                            <Col span={2} offset={9}>
                                <Link className="textGrey font-extrabold tracking-widest text-3xl" to="/">
                                    LearnCodeClient
                                </Link>
                            </Col>
                            <Col className="my-2" span={3} offset={4}>
                                <Link className="textGrey rightNav font-normal bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/user">{(props.userInfo.name || " ").split(" ")[0] || ""}</Link>
                            </Col>
                            <Col className="my-2" span={1} offset={1}>
                                <Link className="textGrey rightNav font-normal bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-2" to="/forum">Forum</Link>
                            </Col>
                            <Col className="my-2" span={1} offset={1}>
                                <Link className="textGrey rightNav font-normal bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-2" to="/learn">Learn</Link>
                            </Col>
                        </Row>
                    </nav>
                    {/* <Link className="textGrey rightNav bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/learn/top1/ba1/da">topic111</Link> */}
                    <Switch>
                        <Route exact path="/" children={<Home />} />
                        <Route exact path="/learn" children={<LearnPage />} />
                        {/* <Route path={`/learn/:topic/:lesson/`} children={<IntroLesson />} /> */}
                        <Route path={`/learn/:challengeId`} children={<Challenge />} />
                        <Route exact path="/forum" children={<Forum />} />
                        <Route path={`/forum/:topicId`} children={<Topic />} />
                        <Route path="/user">
                            <UserProfile />
                        </Route>
                        <Route path="*">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div >
    )
    const mainNotLogedIn = (
        <div>
            <Router>
                <div className="content-center">
                    <nav>
                        <div className="p-0 font-bold bg-gray-900 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8">
                            {/* Offset: grid=24 grid-6:for search. offset = ((24/2-6)-(span))/2= 5 */}
                            <div className="lg:col-start-4">
                                <Link className="textGrey font-extrabold tracking-widest text-3xl" to="/">
                                    LearnCodeClient
                                </Link>
                            </div>
                            {/* <div className="col-start-6" span={1} offset={5}>
                                <a className="textGrey rightNav font-normal bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-2"
                                    href='http://localhost:5000/auth/google'>Login</a>
                            </div> */}
                            <div className="my-2 md:col-start-5 lg:col-start-7" span={1} offset={1}>
                                <Link className="textGrey rightNav font-normal bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-2" to="/forum">Forum</Link>
                            </div>
                            <div className="my-2" span={1} offset={1}>
                                <Link className="textGrey rightNav font-normal bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-2" to="/learn">Learn</Link>
                            </div>
                        </div>
                    </nav>
                    {/* <Link className="textGrey rightNav bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white rounded-md p-1" to="/learn/top1/ba1/da">topic111</Link> */}
                    <Switch>
                        <Route exact path="/" children={<Home />} />
                        <Route exact path="/learn" children={<LearnPage />} />
                        {/* <Route path={`/learn/:topic/:lesson/`} children={<IntroLesson />} /> */}
                        <Route path={`/learn/:challengeId`} children={<Challenge />} />
                        <Route exact path="/forum" children={<Forum />} />
                        <Route path={`/forum/:topicId`} children={<Topic />} />
                        <Route path="/verifyLogin">
                            <VerifyLogin />
                        </Route>
                        <Route path="*">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div >
    )
    return (
        props.userInfo._id ? mainLogedIn : mainNotLogedIn
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected,
        userInfo: state.userInfo
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