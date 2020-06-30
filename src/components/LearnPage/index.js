import { Collapse } from 'antd';
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

    const quotesComponents = (
        <div className='my-12'>
            <quotes className="mt-4 font-sans text-xl text-gray-800 text-center">{quotes[Math.floor(Math.random() * quotes.length)].text}</quotes>
            <br/>
            <i>--- {quotes[Math.floor(Math.random() * quotes.length)].author} ---</i>
        </div>
    )

    const listPractice = (
        <div className=''>
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
                                                    <div key={challenge._id} abx>
                                                        <Link className='float-left text-black block ' to={`${url}/` + challenge._id} onClick={() => chooseChallenge(challenge._id)}>{challenge.title}</Link> <br/>
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
    )
    return (
        <div className='grid md:grid-cols-12 sm:grid-cols-1'>
            <div className='md:col-span-8 md:col-start-3'>
                <h1 className="mt-4">Welcome to Learn Code</h1>
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