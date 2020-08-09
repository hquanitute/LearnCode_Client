import React, {useEffect} from 'react';
import {Avatar} from "antd";
import {covertMillisecondToDate, DATE_FORMAT} from "../../util/dateUtils";
import {Link} from "react-router-dom";
import {CommentOutlined, EyeOutlined, PushpinOutlined} from "@ant-design/icons";
import styled from "styled-components";

const TopicWrapper = styled.div`
     .topic{
            border-bottom: 1px solid #d6d6d7;
            padding:15px 0;
    }
    
    .topic:hover{
        .name-topic{
             color:#5488c7;
        }
        display:block;
    }

    .menu-container{
        display:flex;
    }
    
    .bg-menu{
        background-color:#0b1a33;
    }
    
    .menu-item{
        color: #fff;  
        font-size: 13px;;
        font-weight: bold;
        text-transform: uppercase;
        position:relative;
    }
    
    .menu-item::before{
       content: "";
       position: absolute;
       width: 0%;
       height: 1px;
       top: 20px;
       background-color: white;
       transition: width 0.5s;
    }
    
    .menu-item:hover{
        ::before{
            width:100%;
        }
    }
    
   
    
    .name-topic{
         color:#292b2c;
         font-size:15px; 
         font-weight:bold;
    }
    
    .name-topic:hover{
        color:#5488c7;
    }
    
    .avatar{
        margin-right:10px;
    }
    
    .info-topic{
        font-size:12px;
        color:rgb(155, 155, 155);
        display:flex;
    }
    
    .status-topic{
        font-size:12px
    }
    
    .status-topic .icon{
        vertical-align:middle;
    }
    
    .topic-category{
        background-color: #e9e9ea;
        border-color: #e9e9eb;
        color: #909399;
        font-size: 12px;
        padding: 5px;
        border-radius: 3px;
        cursor:pointer;
    }
    
    .banner{
        background-color: #72A2C0;
    }
    
    .banner-img{
        width:10%;
    }
    
    .slogan{
        font-weight:bold;
        font-size:20px;
        color:#fff;
    }
    .paging-footer{
        padding-top:20px;
        display:flex;
        justify-content:center;
    }
    .page-item{
        padding: 10px; 20px;
        font-weight:bold;
        cursor:pointer;
        color:#a19e9e;
    }
    
    .page-item:hover{
       color:#0b1a33;
    }
    
    .paging-footer .active{
        color:#0b1a33;
    }
   
`

function TopicInList({topic}) {
    return (
        <TopicWrapper>
            <div className='flex flex-row justify-start topic'>
                <div className="w-11/12 flex flex-row">
                    <div className="flex-col w-full">
                        <div className="info-topic">
                            <a href="#" className="author-name mr-auto">{topic.userId.name}</a>
                            <span className="ml-auto">{covertMillisecondToDate(topic.timestamp, DATE_FORMAT)}</span>
                        </div>
                        <Link to={'/forum/' + topic._id} className="name-topic">
                            {topic.name}
                        </Link>
                        <div>
                            {topic.tags.map((tag) => (<span className='topic-category'>{tag}</span>))}
                        </div>
                        <div className="status-topic mt-4">
                        <span className="mr-3"><EyeOutlined
                            className="icon"/><span>{Math.floor(Math.random() * 101)}</span></span>
                            <span className="mr-3"><CommentOutlined
                                className="icon"/><span>{topic.commentsObject && topic.commentsObject.length || 0}</span></span>
                            <span className="mr-3"><PushpinOutlined className="icon"/><span> 0</span></span>
                        </div>
                    </div>
                </div>
                <div className='w-1/12'>
                </div>
            </div>
        </TopicWrapper>

    )
}

export default TopicInList;