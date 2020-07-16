import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styled from "styled-components";




const LessonPageWrapper=styled.div`

    .lesson{
        box-shadow: 0 6px 16px 0 rgba(0,0,0,.2);
        margin: 30px;
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
        padding: 30px;
        min-height: 183px;
        cursor:pointer;
        background: #fff;
        justify-content: space-between;
        align-items: flex-start;
    }

    .lesson-title{
        font-size:1.2rem;
        font-weight:bold;
        text-align:left;
    }

    .lesson-btn{
          border:1px solid green;
          padding:5px;
          color:green;
          font-weight:bold;
    }

    .lesson:hover{
        box-shadow:0 4px 12px 0 rgba(0,0,0,.15);
        .lesson-btn{
            background-color:green;
            color:#fff;
        }
    }

    .lesson-wrapper{
        position:relative;
    }

    .number-challenge{
        position: absolute;
        top: 40px;
        right: 50px;
        z-index: 10;
        color: #a09b9b;
        font-weight: bold;
    }


`
function LessonPage(props) {


    return (
        <LessonPageWrapper>
            <div className="flex flex-row">
             {(props.challengeSelected.lessons || []).map((lesson, indexLesson) => (
                    <div className="lesson-wrapper w-3/12">

                         <span className="number-challenge">{lesson.challenges&&lesson.challenges.length}</span>
                         <div className="lesson ">
                               <p className="lesson-title">{lesson.name}</p>
                               <button className="lesson-btn">See Challenge</button>
                        </div>
                    </div>


                ))}
            </div>
        </LessonPageWrapper>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);