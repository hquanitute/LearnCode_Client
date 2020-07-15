import React, { useEffect, useState } from 'react';
import LearnPage from '../LearnPage';
import LessonPage from '../LearnPage/lesson'
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Row, Col, Avatar} from 'antd';

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
         color:#fff;
    }
    a:hover{
        color:#ece0c9;
    }
    .nav-item{
        font-size:16px;
        font-weight:bold;
    }
    .logo{
        font-weight:bold;
        font-size:20px;
    }
    
    .slogan{
        font-size:10px;
    }
    
`

const BodyStyleWrapper=styled.div`
    .btn-login{
        background-color: #d23434;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
    }
    
    .btn-get-started{
        background-color: #34d26a;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        font-size: 20px;
    }
    
    
    color:#292b2c ;
    
   
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
                            <div className="p-0 font-bold flex flex-row items-center p-2">
                                <div className="w-1/3 flex  flex-col justify-start">
                                    <div className="w-3/12 flex flex-col">
                                        <Link className="logo " to="/">
                                            It-UTE
                                        </Link>
                                        <span className=" slogan">Learn to better</span>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-row justify-center">
                                    <div className="p-2">
                                        <Link className="font-normal nav-item " to="/forum"><span>Forum</span></Link>
                                    </div>
                                    <div className="p-2">
                                        <Link className="font-normal nav-item " to="/learn"><span>Learn</span></Link>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-row justify-end">
                                    {props.userInfo._id&&
                                    <div className="p-2">
                                        <Link className="font-normal nav-item " to="/user"><span className="mx-2">{(props.userInfo.name || " ").split(" ")[0] || ""}</span><Avatar  src={props.userInfo.avater} /></Link>
                                    </div>}
                                </div>
                            </div>
                            </HeaderWrapper>
                        </nav>
                    <BodyStyleWrapper>
                        <Switch>
                            <Route exact path="/" children={<Home />} />
                            <Route exact path="/learn" children={<LearnPage />} />
                            <Route exact path="/learn/:course/lesson" children={<LessonPage />} />
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