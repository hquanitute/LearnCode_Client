import React, { useEffect, useState } from 'react';
import '../../style/css/learn.css';
import { Collapse } from 'antd';
import { useParams, useRouteMatch, Link, Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Welcome from './welcome';
import ListPractice from './listPractice';
import Challenge from './challenge';
import { setChallengeSelectedAction } from './../../actions/challengesAction'

const { Panel } = Collapse;
function LearnPage(props) {
    let { path, url } = useRouteMatch();
    useEffect(() => {

    }, [])

    let chooseChallenge = (a) => {
        props.setChallengeSelected(a);
    }
    // console.log(props.cou);

    return (
        <div>

            {
                (props.courses || []).map(course => (
                    <Collapse>
                        <Panel header={course.name} key={course._id}>
                            {
                                (course.lessons || []).map(lesson => (
                                    <Collapse>
                                        <Panel header={lesson.name} key={lesson._id}>
                                            {
                                                (lesson.challenges || []).map(challenge => (
                                                    <div key={challenge._id}>
                                                        <Link to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link>
                                                    </div>
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

    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        courses: state.courses,
        challengeSelected: state.challengeSelected,
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