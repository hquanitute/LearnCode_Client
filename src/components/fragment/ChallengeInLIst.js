import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

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

function TopicInList({challenge}) {


    return (
        <ChallengePageWrapper>
            <Link to={`/learn/search/` + challenge._id}>
                <div className="box w-9/12 mx-auto">
                    <div className="challenge-row ">
                        <div className="flex flex-col">
                            <h3>{challenge.title}</h3>
                            <div className="flex flex-row">
                                <small className="level-easy">Easy,</small>
                                <small>Time:30</small>
                            </div>
                        </div>
                        <button className="btn-solve">
                            Solve Challenge
                        </button>
                    </div>
                </div>
            </Link>
            < /ChallengePageWrapper>

                )
                }


                export default TopicInList;
