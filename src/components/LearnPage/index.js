import { Collapse, Row } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import '../../style/css/learn.css';
import { setChallengeSelectedAction } from './../../actions/challengesAction';

const quotes = require('../../api/quotes.json');

const { Panel } = Collapse;
function LearnPage(props) {
    let { path, url } = useRouteMatch();
    useEffect(() => {

    }, [])

    let chooseChallenge = (a) => {
        props.setChallengeSelected(a);
    }

    const welcomeComponent = props.userInfo._id ? (
        <div className=''>
            <h1 className="mt-4">Welcome back, {props.userInfo.name}</h1>

        </div>
    ) : (
            <div className=''>
                <h1 className="mt-4">Welcome to Learn Code</h1>
                <h2 className="mt-4">Learn Code everywhere</h2>
                <h2 className="my-4">Build your code</h2>
                <a className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                    href={process.env.REACT_APP_GOOGLE} > Login with Google </a>
            </div>
        )
    const quotesComponents = (
        <div className='my-12'>
            <quotes className="mt-4 font-sans text-xl text-gray-800 text-center">{quotes[Math.floor(Math.random() * quotes.length)].text}</quotes>
            <br />
            <i>--- {quotes[Math.floor(Math.random() * quotes.length)].author} ---</i>
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
                                                                    <Link className='challenge float-left text-black m-1 p-2 inline-flex' to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link> <br />
                                                                </Row>
                                                            )
                                                        } else return (
                                                            (
                                                                <Row key={challenge._id} className=''>
                                                                    <span className='float-left  my-1 p-2'><i class="fa fa-arrow-right"></i></span>
                                                                    <Link className='challenge float-left text-black m-1 p-2 inline-flex' to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link> <br />
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
        <div className='grid md:grid-cols-12 sm:grid-cols-1'>
            <div className='md:col-span-8 md:col-start-3'>
                {welcomeComponent}
                {quotesComponents}
                {listPractice}
            </div>
        </div>

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