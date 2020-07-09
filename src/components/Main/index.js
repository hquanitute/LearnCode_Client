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
import styled from "styled-components";


const HeaderWrapper=styled.div`
    background-color:#292929;
    color:#ece0c9;
    a{
         color:#ece0c9;
    }
    a:hover{
        color:#fff;
    }
    .nav-item{
        font-size:16px;
        font-weight:bold;
    }
    
`

const BodyStyleWrapper=styled.div`
    .btn-login{
        background-color: #d23434;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
    }
`
function Main(props) {
    useEffect(() => {
        props.getCourses();
    }, [])

    const mainApp = (
        <div>
            <Router>
                <div className="content-center">
                        <nav>
                            <HeaderWrapper>
                            <div className="p-0 font-bold flex flex-row items-center">
                                <div className="w-1/3">

                                </div>
                                <div className="w-1/3">
                                    <Link className="font-extrabold tracking-widest text-3xl" to="/">
                                        LearnCodeClient
                                    </Link>
                                </div>
                                <div className="w-1/3 flex flex-row justify-end">
                                    {props.userInfo._id&&<div className="p-2">
                                        <Link className="font-normal nav-item " to="/user">{(props.userInfo.name || " ").split(" ")[0] || ""}</Link>
                                    </div>}
                                    <div className="p-2">
                                        <Link className="font-normal nav-item " to="/forum"><span>Forum</span></Link>
                                    </div>
                                    <div className="p-2">
                                        <Link className="font-normal nav-item " to="/learn"><span>Learn</span></Link>
                                    </div>
                                </div>
                            </div>
                            </HeaderWrapper>
                        </nav>
                    <BodyStyleWrapper>
                        <Switch>
                            <Route exact path="/" children={<Home />} />
                            <Route exact path="/learn" children={<LearnPage />} />
                            <Route path={`/learn/:challengeId`} children={<Challenge />} />
                            <Route exact path="/forum" children={<Forum />} />
                            <Route path={`/forum/:topicId`} children={<Topic />} />
                            <Route path="/user">
                                <UserProfile />
                            </Route>
                            <Route path="/verifyLogin">
                                <VerifyLogin />
                            </Route>
                            <Route path="*">
                                <Home />
                            </Route>
                        </Switch>
                    </BodyStyleWrapper>
                </div>
            </Router>
        </div >
    )
    return (
         mainApp
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