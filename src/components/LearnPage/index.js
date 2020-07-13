import { Collapse, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import '../../style/css/learn.css';
import { setChallengeSelectedAction } from './../../actions/challengesAction';
import styled from "styled-components";

const quotes = require('../../api/quotes.json');

const { Panel } = Collapse;

const LearnPageWrapper=styled.div`
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
    
    .challenge-item{
        color:black;
    }
    
    .challenge-item:hover{
        color:#1538c2;
    }
    
`
function LearnPage(props) {
    let { path, url } = useRouteMatch();
    useEffect(() => {

    }, [])

    let chooseChallenge = (a) => {
        props.setChallengeSelected(a);
    }

    const welcomeComponent = props.userInfo._id ? (
        <div className=''>
            <h1 className="mt-4 font-bold">Welcome back, {props.userInfo.name}</h1>
        </div>
    ) : (
            <div className='row mt-4'>
                <a className='btn-login'
                    href={process.env.REACT_APP_GOOGLE} > Login with Google </a>
            </div>
        )
    const quotesComponents = (
        <div className='my-12'>
            <h1 className="mt-4  text-xl text-center">{quotes[Math.floor(Math.random() * quotes.length)].text}</h1>
            <br />
            <i className='text-gray-600'>--- {quotes[Math.floor(Math.random() * quotes.length)].author} ---</i>
        </div>
    )

    const listPractice = props.userInfo._id ? (
        <div className=''>
                {
                    (props.courses || []).map((course, index) => (
                        <Collapse defaultActiveKey={['0']}>
                            <Panel className='panelCustom' header={course.name} key={index}>
                                {
                                    (course.lessons || []).map((lesson, indexLesson) => (
                                        <Collapse defaultActiveKey={['0']}>
                                            <Panel className='panelCustom' header={lesson.name} key={indexLesson}>
                                                {
                                                    (lesson.challenges || []).map(challenge => {
                                                        console.log(props.userInfo.listChallengeIdPassed);
                                                        console.log(challenge._id);
                                                        
                                                        if(props.userInfo.listChallengeIdPassed.includes(challenge._id)){
                                                            return (
                                                                <Row key={challenge._id} className=''>
                                                                    <span className='float-left  my-1 p-2'><i class="fa fa-check-circle"></i></span>
                                                                    <Link className='challenge-item float-left  m-1 p-2 inline-flex' to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link> <br />
                                                                </Row>
                                                            )
                                                        } else return (
                                                            (
                                                                <Row key={challenge._id} className=''>
                                                                    <span className='float-left  my-1 p-2'><i class="fa fa-arrow-right"></i></span>
                                                                    <Link className='challenge-item float-left  m-1 p-2 inline-flex' to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link> <br />
                                                                </Row>
                                                            )
                                                        )
                                                    })
                                                }
                                            </Panel>
                                        </Collapse>
                                    ))
                                }
                            </Panel>
                        </Collapse>
                    ))
                }
            </div>
    ) : (
            <div className=''>
                {
                    (props.courses || []).map((course, index) => (
                        <Collapse defaultActiveKey={['0']}>
                            <Panel className='panelCustom' header={course.name} key={index}>
                                {
                                    (course.lessons || []).map((lesson, indexLesson) => (
                                        <Collapse defaultActiveKey={['0']}>
                                            <Panel className='panelCustom' header={lesson.name} key={indexLesson}>
                                                {
                                                    (lesson.challenges || []).map(challenge => (
                                                        <Row key={challenge._id} className=''>
                                                            <span className='float-left  my-1 p-2'><i class="fa fa-arrow-right"></i></span>
                                                            <Link className='challenge float-left text-black m-1 p-2 inline-flex' to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link> <br />
                                                        </Row>
                                                    ))
                                                }
                                            </Panel>
                                        </Collapse>
                                    ))
                                }
                            </Panel>
                        </Collapse>
                    ))
                }
            </div>
        )
    return (
        <LearnPageWrapper>
            <div className='topic-bg grid md:grid-cols-12 sm:grid-cols-1'>
                <div className='md:col-span-8 md:col-start-3'>
                    {welcomeComponent}
                    {quotesComponents}
                    {listPractice}
                </div>
            </div>
        </LearnPageWrapper>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses,
        challengeSelected: state.challengeSelected,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChallengeSelected: (idChallenge) => {
            dispatch(setChallengeSelectedAction(idChallenge))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LearnPage);