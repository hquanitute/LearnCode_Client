import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import styled from "styled-components";
import {setChallengeSelectedAction} from "../../actions/challengesAction";
import {Link,useRouteMatch} from "react-router-dom";


const ChallengePageWrapper = styled.div`

    .challenge-row{
        display: flex;
        box-sizing: border-box;
        margin: 0;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: auto;
        align-items: center;
    }
    
    
    .level-easy{
        color:green;
    }
    
    .box{
        padding:30px;
        box-shadow: 0 6px 16px 0 rgba(0,0,0,.2);
        background-color:#fff;
    }
    
    .box:hover{
        background-color: #edf7ec;
        color: green;
    }
    
    .btn-solve{
        padding: 10px 20px;
        color: green;
        border: 1px solid green;
    }
    
    .solved{
        background:green;
        color:#fff;
    }
    
    


`

function ChallengesPage(props) {

    let {match, path, url } = useRouteMatch();

    useEffect(()=>{
        if(!props.challengeSelected.challenges){

        }
    })

    return (
        <ChallengePageWrapper>
            <div className=' grid md:grid-cols-12 sm:grid-cols-1'>
                <div className='md:col-span-8 md:col-start-3'>
                    <div className="flex flex-col justify-center">
                        {(props.challengeSelected.challenges || []).map((challenge, indexLesson) => (
                            <Link to={`${url}/` + challenge._id} onClick={()=>props.setChallengeSelected(challenge._id)}>
                                <div className="box w-9/12 mx-auto" >
                                    <div className="challenge-row ">
                                        <div className="flex flex-col">
                                            <h3>{challenge.title}</h3>
                                            <div className="flex flex-row">
                                                <small className="level-easy">Easy,</small>
                                                <small>Time:30</small>
                                            </div>
                                        </div>
                                        {props.userInfo.listChallengeIdPassed.includes(challenge._id)&&(
                                            <button className="btn-solve solved">
                                                Solved
                                            </button>
                                        )||( <button className="btn-solve">
                                            Solve Challenge
                                        </button>)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </ChallengePageWrapper>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        setChallengeSelected: (idChallenge) => {
            dispatch(setChallengeSelectedAction(idChallenge))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChallengesPage);