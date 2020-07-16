import React from 'react';
import {connect} from 'react-redux';

import styled from "styled-components";


const ChallengePageWrapper = styled.div`

    .challenge{
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


`

function ChallengesPage(props) {


    return (
        <ChallengePageWrapper>
            <div className="flex flex-col justify-center">
                {(props.challengeSelected.challenges || []).map((challenges, indexLesson) => (
                    <div className="box w-5/12 mx-auto">
                        <div className="challenge">
                            <div className="flex flex-col">
                                <h3>2D Array -DS</h3>
                                <div className="flex flex-row">
                                    <small className="level-easy">Easy,</small>
                                    <small>Time:30</small>
                                </div>
                            </div>
                            <button>
                                Solve Challenge
                            </button>
                            {console.log(challenges)}
                        </div>
                    </div>
                ))}
            </div>
        </ChallengePageWrapper>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

}
export default connect(mapStateToProps, mapDispatchToProps)(ChallengesPage);