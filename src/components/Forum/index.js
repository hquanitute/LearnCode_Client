import React, {useEffect, useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {connect} from 'react-redux';
import {Avatar, Dropdown, Menu, message, Modal} from 'antd';
import {CommentOutlined, EyeOutlined, PushpinOutlined} from '@ant-design/icons';
import {changeCriteria, getForumAction} from '../../actions/forumAction';
import {Link} from 'react-router-dom';
import banner_img from "../../asset/img/learn.png"
// const ReactMarkdown = require('react-markdown')
import * as ReactMarkdown from 'react-markdown'
import {apiBaseUrl, callApiAsPromise} from '../../api';
import {usePromiseTracker} from 'react-promise-tracker';
import styled from "styled-components";
import ThreeDots from "../Loader/ThreeDots";
import {covertMillisecondToDate, DATE_FORMAT} from "../../util/dateUtils";

require('./style.css')


const ForumStyleWrapper = styled.div`

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

function Paging({criteria, onChangePageable}) {
    let numberPaging = [];

    if (criteria) {
        for (let index = 0; index < criteria.max_page; index++) {
            numberPaging.push(<div>
                {<div className={index + 1 === criteria.current_page && "page-item active" || "page-item"}
                      onClick={(e) => onChangePageable({...criteria, current_page: index})}>{index + 1}</div>}
            </div>);

        }
    }


    return (
        criteria && criteria.max_page && <div className="paging-footer">{numberPaging}</div> ||
        <div className="paging-footer"></div>
    )

}


function Forum(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [contentNewTopic, setContentNewTopic] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('general')
    const [challengeId, setChallengeId] = useState('');
    const {promiseInProgress} = usePromiseTracker();

    useEffect(() => {
        props.getForum(props.forum.criteria);
    }, [props.forum.criteria])

    const chooseCategory = (name) => {
        props.changeCriteria({...props.forum.criteria, tags: name, skip: ""})
    }

    const onChangePageable = (pageable) => {
        props.changeCriteria({...props.forum.criteria, skip: pageable.current_page * 5});
    }

    const showModal = () => {
        setModalVisible(true)
    }
    const hideModal = e => {
        setModalVisible(false)
    };

    const createTopic = () => {
        if (!props.user._id) {
            message.error('Sign in to create new topic');
        } else if (title === '') {
            message.error('Title is required');
        } else if (title.split(' ').length < 4) {
            message.error('Title must > 3 words');
        } else if (challengeId === '' && tags === 'challenge') {
            message.error('Please input challenge id if you selected tag challenge')
        } else if (contentNewTopic.split(' ').length < 4) {
            message.error('Content must > 3 words');
        } else {
            const data = {
                name: title,
                challengeId,
                content: contentNewTopic.replace(/(\r\n|\n|\r)/gm, " "),
                tags: [tags],
                type: tags === 'challenge' ? 'challenge' : 'custom',
                userId: props.user._id,
            }
            callApiAsPromise('post', apiBaseUrl + 'topics', null, JSON.stringify(data)).then(res => {
                message.info('Create new topic successfully');
                setModalVisible(false);
            }).catch((err) => {
                message.error('Create topic failed!')
            })
        }
    }

    let listTopics = props.forum.lsTopic ? props.forum.lsTopic.map((topic) => (
        <div className='flex flex-row justify-start topic'>
            <div className="w-11/12 flex flex-row">
                <Avatar className="avatar" src={topic.userId.avater}/>
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
    )) : (<div></div>);

    const handleMenuClick = (e) => {
        setTags(e.key)
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="general">
                #general
            </Menu.Item>
            <Menu.Item key="challenge">
                #challenge
            </Menu.Item>
            <Menu.Item key="javascript">
                #javascript
            </Menu.Item>
            <Menu.Item key="java">
                #java
            </Menu.Item>
            <Menu.Item key="python">
                #python
            </Menu.Item>
        </Menu>
    );

    return (
        <ForumStyleWrapper>
            <div className="bg-white ">
                <div className="banner ">
                    <img className="banner-img mx-auto" src={banner_img}/>
                    <div className="slogan">Creating the future</div>
                </div>
                <div className="bg-menu">
                    <div className="py-5 px-2 text-left w-1/2 m-auto ">
                        <div className="menu-container justify-between">
                            <button className='menu-item'
                                    onClick={() => {
                                        chooseCategory('')
                                    }}> All topics
                            </button>
                            <button className='menu-item'
                                    onClick={() => {
                                        chooseCategory('general')
                                    }}> General
                            </button>
                            <button className='menu-item'
                                    onClick={() => {
                                        chooseCategory('challenge')
                                    }}> Challenges
                            </button>
                            <button className='menu-item'
                                    onClick={() => {
                                        chooseCategory('javascript')
                                    }}> JavaScript
                            </button>
                            <button className='menu-item'
                                    onClick={() => {
                                        chooseCategory('java')
                                    }}> Java
                            </button>
                            <button className='menu-item'
                                    onClick={() => {
                                        chooseCategory('python')
                                    }}> Python
                            </button>
                            <button className='menu-item'
                                    onClick={() => {
                                        showModal()
                                    }}> New Topic
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='justify-center w-1/2 text-left text-lg  p-2 m-auto'>
                    {promiseInProgress && <ThreeDots/> || listTopics}
                    <Paging criteria={props.forum.pageable} onChangePageable={onChangePageable}/>
                </div>
                <Modal
                    className='modal-new-topic'
                    title="Create new topic"
                    visible={modalVisible}
                    // onOk={handleSubmit}
                    onCancel={() => setModalVisible(false)}
                    // closable = {false}
                    footer={
                        <div className=''>
                            <button className='' onClick={() => {
                                createTopic()
                            }}>
                                Create Topic
                            </button>
                            <button className='' onClick={() => {
                                hideModal()
                            }}>
                                Cancel
                            </button>
                        </div>
                    }
                >
                    <div className="grid grid-cols-6 mb-1">
                        <div className="markdown-block col-span-3">
                            <input
                                className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-4 block w-full appearance-none leading-normal'
                                placeholder='Title'
                                value={title} required onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                        </div>
                        <div className="col-span-3 px-2 ml-4">
                            <Dropdown className='inline-block' overlay={menu}>
                                <button className='bg-yellow-500 p-2 text-white font-bold'>
                                    {tags}
                                </button>
                            </Dropdown>
                            <input
                                className='inline-block adasbg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-4 block appearance-none leading-normal'
                                placeholder='challenge id'
                                value={challengeId} required onChange={(e) => {
                                setChallengeId(e.target.value)
                            }} hidden={!(tags === 'challenge')}/>
                        </div>
                    </div>
                    <div> Use <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet' target='_blank'
                                 rel='noopener noreferrer'>Markdown</a></div>
                    <div className="description grid grid-cols-6">
                        <div className="markdown-block col-span-3">
                            <TextareaAutosize
                                required
                                className="markdown-block-area w-full p-4"
                                width='1600'
                                value={contentNewTopic}
                                placeholder="Type here. Use Markdown"
                                onChange={(e) => setContentNewTopic(e.target.value)}/>
                        </div>
                        <div className="previous col-span-3 pt-3 px-2" overflow='scroll'>
                            <ReactMarkdown height='200px' source={contentNewTopic} escapeHtml={false}/>
                        </div>
                    </div>

                </Modal>
            </div>
        </ForumStyleWrapper>

    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        forum: state.forum,
        user: state.userInfo,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getForum: (criteria) => {
            dispatch(getForumAction(criteria))
        },
        changeCriteria: (criteria) => {
            dispatch(changeCriteria(criteria))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Forum)