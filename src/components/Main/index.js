import React, {useEffect, useState} from 'react';
import LearnPage from '../LearnPage';
import ChallengesPage from '../LearnPage/lsChallenge'
import {BrowserRouter as Router, Link, Route, Switch, withRouter} from 'react-router-dom';
import {useHistory} from "react-router";
import {Avatar, Layout} from 'antd';
import '../../style/css/navbar.css';
import {connect} from 'react-redux';
import Challenge from '../LearnPage/challenge';
import UserProfile from '../User'
import {getUpdateCourseAction} from '../../actions/coursesAction';

import VerifyLogin from '../Login/verifyLogin';
import Forum from '../Forum';
import Topic from '../Forum/topic';
import Home from '../Home';
import styled from "styled-components";
import LessonPage from "../LearnPage/lesson";
import footer_bg from "../../asset/img/footer-bg.jpg"
import {FacebookOutlined, GoogleOutlined, TwitterOutlined} from "@ant-design/icons";
import SearchPage from "../LearnPage/SearchPage";
import Search from "antd/lib/input/Search";
import {changeSearchCriteria, doSearch} from "../../actions/searchAction";


const HeaderWrapper = styled.div`
    background-color:#00132f;
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
    
    .search-btn{
        width:75%;
    }
    
    .search-btn button{
        background-color: white;
        outline: none;
        border:none;
        color: black;
    }
    
`

const {Header, Footer, Sider, Content} = Layout;

const BodyStyleWrapper = styled.div`
    min-height:100vh;
    .btn-login{
        background-color: #d23434;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
    }
    
    .btn-get-started{
        background-color:   #2a633d;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        font-size: 20px;
    }
    
    
    color:#292b2c ;
    
   
`

const FooterWrapperStyle = styled.div`
    clear: both;
    position:relative;
    
    .bg{
        height: 200px;
        background-image: url(${footer_bg});
        position:absolute;
        width:100%;
        z-index:100;
    }
    
    .content{
    
        display:flex;
        z-index: 200;
        height: 200px;
        position:absolute;
        width:100%;
        background: #05080d;
        opacity: 0.95;
        color:#606976;
    }
    
    
    .block-footer{
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .block-1{
        padding: 0 10%;
        text-align: start;
    }
    
    .footer-slogan{
        font-size:12px;
       
    }
    
    .text-logo a{
        font-weight:bold;
        font-size:20px;
        color:white;
    }
    
    .block-2{
    
    }
    
    .block-2 a{
        color:#606976;
        padding:5px 25%;
        font-size:13px;
        text-align: start;
    }
    
    .block-3 .phone p{
        color:white;
    }
    
    .social .social-item{
        font-size:25px;
    }
    
    .social {
        
    }
    
   
    
    
`

function Main(props) {
    let history = useHistory();

    useEffect(() => {
        props.getCourses();
    }, []);

    function handleSearch(val) {
        props.changeSearchCriteria({...props.search.criteria, key: val});

    }

    const mainApp = (
        <div>
            <Router>
                <div className="content-center">
                    <HeaderWrapper>
                        <nav>
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
                                        <Link className="font-normal nav-item "
                                              to="/forum"><span>Forum</span></Link>
                                    </div>
                                    <div className="p-2">
                                        <Link className="font-normal nav-item "
                                              to="/learn"><span>Learn</span></Link>
                                    </div>
                                </div>
                                <div className="w-1/3 flex flex-row justify-end">
                                    <Link to="/learn/search">
                                        <Search placeholder="Search " onSearch={value => handleSearch(value)}
                                                enterButton
                                                className="search-btn p-2"/>
                                    </Link>

                                    {props.userInfo._id &&
                                    <div className="p-2">
                                        <Link className="font-normal nav-item " to="/user"><span
                                            className="mx-2">{(props.userInfo.name || " ").split(" ")[0] || ""}</span><Avatar
                                            src={props.userInfo.avater}/></Link>
                                    </div>}
                                </div>
                            </div>
                        </nav>
                    </HeaderWrapper>

                    <BodyStyleWrapper>
                        <Switch>
                            <Route exact path="/" children={<Home/>}/>
                            <Route exact path="/learn" children={<LearnPage/>}/>
                            <Route exact path="/learn/:course/lesson" children={<LessonPage/>}/>
                            <Route exact path="/learn/:courseId/lesson/:lessonId/challenges"
                                   children={<ChallengesPage/>}/>
                            <Route path={`/learn/:courseId/lesson/:lessonId/challenges/:challengeId`}
                                   children={<Challenge/>}/>
                            <Route path={`/learn/search/:challengeId`}
                                   children={<Challenge/>}/>
                            <Route path={`/learn/search`}
                                   children={<SearchPage/>}/>
                            <Route exact path="/forum" children={<Forum/>}/>
                            <Route path={`/forum/:topicId`} children={<Topic/>}/>
                            <Route path="/user">
                                <UserProfile/>
                            </Route>
                            <Route path="/verifyLogin">
                                <VerifyLogin/>
                            </Route>
                            <Route path="*">
                                <Home/>
                            </Route>
                        </Switch>
                    </BodyStyleWrapper>

                    <FooterWrapperStyle>
                        <div className="bg">

                        </div>
                        <div className="content">
                            <div className="w-4/12 block-footer block-1 ">
                                <div className="footer-slogan">
                                    <span>Learn to better</span>
                                </div>
                                <div className="text-logo">
                                    <a>
                                        It-UTE
                                    </a>
                                </div>
                                <div className="social">
                                    <span className="social-item mr-2">
                                        <FacebookOutlined/>
                                    </span>
                                    <span className="social-item mr-2">
                                        <GoogleOutlined/>
                                    </span>
                                    <span className="social-item mr-2">
                                        <TwitterOutlined/>
                                    </span>
                                </div>
                            </div>
                            <div className="w-4/12 block-footer block-2 ">
                                <a>Learn Javascript Basic</a>
                                <a>Learn Python Basic</a>
                                <a>Discover Interview</a>
                                <a>Practice learning Algorithms</a>
                            </div>
                            <div className="w-4/12 block-footer block-3 ">
                                <div className="phone">
                                    <p>(+84) 0832041753</p>
                                    <p>(+84) 0832041753</p>
                                </div>
                            </div>
                        </div>

                    </FooterWrapperStyle>
                </div>
            </Router>
        </div>
    )
    return (
        mainApp
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected,
        userInfo: state.userInfo,
        search: state.search
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCourses: () => {
            dispatch(getUpdateCourseAction())
        },
        doSearch: (criteria) => {
            dispatch(doSearch(criteria))
        },
        changeSearchCriteria: (criteria) => {
            dispatch(changeSearchCriteria(criteria))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);