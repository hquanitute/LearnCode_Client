import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { callApiAsPromise, apiBaseUrl } from '../../api';
import { Row, Col, message, Menu, Modal, Dropdown } from 'antd';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import styled from "styled-components";
import { Avatar } from 'antd';
import {ProfileOutlined, StarOutlined, UserAddOutlined} from "@ant-design/icons";

const TopicStyleWrapper=styled.div`
        text-align:start;
        .topic-name{
           
        }
        
        .topic-info{
            color:#9b9b9b;
            font-size:14px;
        }
        
        
        
        .tag{
           
            background-color: #e9e9ea;
            border-color: #e9e9eb;
            color: #909399;
            font-size: 12px;
            padding: 5px;
            border-radius: 3px;
            cursor:pointer;
        }
        
        .author-name{
            font-weight:bold;
        }
        
        .author-avatar{
            vertical-align:middle;
        }
        
        .icon{
             vertical-align:middle;
        }
        
        .question-container{
            
        }
        
        .topic-header{
            padding:10px 0;
        }
        
        .share-question{
            color:#909399;
            font-weight:bold;
            font-size:12px;
            cursor:pointer;
        }
        
        .reply-box{
            border-top:1px solid;
        }
        
        .btn-vote{
            
        }
        
        .like-number{
            font-size:1.2rem;
        }
    
`

function Topic(props) {
    let { topicId } = useParams();

    const [redirect, setRedirect] = useState(false)

    const [topic, setTopic] = useState({});
    const [reply, setReply] = useState('');
    const [isReply, setIsReply] = useState(false);
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [forceRender, setForceRender] = useState(false);

    // Modal edit topic 
    const [modalVisible, setModalVisible] = useState(false);
    const [contentNewTopic, setContentNewTopic] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('general')
    const [challengeId, setChallengeId] = useState('');

    useEffect(() => {
        callApiAsPromise('get', apiBaseUrl + 'topics/' + topicId, null, null).then(response => {
            setTopic(response.data.content)
            setContentNewTopic(response.data.content.content)
            setTitle(response.data.content.name)
            setTags(response.data.content.tags[0]);
            if (response.data.content.challengeId) {
                setChallengeId(response.data.content.challengeId)
            }
        }).catch(error => {
            alert(error);
        })
    }, [forceRender])
    useEffect(() => {
        callApiAsPromise('get', apiBaseUrl + 'topics/' + topicId, null, null).then(response => {
            setTopic(response.data.content)
            setContentNewTopic(response.data.content.content)
            setTitle(response.data.content.name)
            setTags(response.data.content.tags[0]);
            if (response.data.content.challengeId) {
                setChallengeId(response.data.content.challengeId)
            }
        }).catch(error => {
            alert(error);
        })
    }, [])

    const sendComment = () => {
        if (reply.split(' ').length < 4) {
            message.error('reply must > 3 words');
            return
        }
        const comment = {
            userId: props.userInfo,
            content: reply,
            topicId: topic._id
        }
        const data = JSON.stringify(comment)
        callApiAsPromise('post', apiBaseUrl + 'comments/', null, data).then(response => {
            setTopic(response.data.value);
            setIsReply(false);
            setIsShowPreview(false);
            setReply('');
        })
    }

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

    const showModal = () => {
        setModalVisible(true)
    }
    const hideModal = e => {
        setModalVisible(false)
    };

    const updateTopic = () => {
        if (title === '') {
            message.error('Title is required');
        }
        else if (title.split(' ').length < 4) {
            message.error('Title must > 3 words');
        }
        else if (challengeId === '' && tags === 'challenge') {
            message.error('Please input challenge id if you selected tag challenge')
        }
        else if (contentNewTopic.split(' ').length < 4) {
            message.error('Content must > 3 words');
        }
        else {
            const data = {
                name: title,
                challengeId,
                content: contentNewTopic.replace(/(\r\n|\n|\r)/gm, " "),
                tags: [tags],
                type: tags === 'challenge' ? 'challenge' : 'custom',
                userId: props.userInfo._id,
            }
            callApiAsPromise('put', apiBaseUrl + 'topics/' + topic._id, null, JSON.stringify(data)).then(res => {
                message.info('Updated topic successfully');
                setModalVisible(false);
                setForceRender(!forceRender);
            }).catch((err) => {
                message.error('Updated topic failed!')
            })
        }
    }
    const isOwner = typeof topic.userId !== 'undefined' && typeof props.userInfo !== 'undefined' && topic.userId._id === props.userInfo._id
    const openReplyBox = () => {
        if (props.userInfo._id) {
            setIsReply(true);
        } else {
            message.error('Login first')
        }
    }
    const deleteTopic = () => {
        callApiAsPromise('delete', apiBaseUrl + 'topics/' + topic._id, null, null).then(res => {
            message.info('Delete topic successfully');
            setRedirect(true);
        }).catch((err) => {
            message.error('Delete topic failed!')
        })
    }
    const linkToShare = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href) + "&amp;src=sdkpreparse";

    if (topic._id) {
        if (redirect) {
            return <Redirect to='/forum' />;
        }
        const commentComponents = topic.commentsObject&&topic.commentsObject.map((comment) => {
            return (
                <Row className='comment p-2'>
                    <Col span={2}>
                        <div className="">
                            <div className='text-left  font-medium text-base'>
                                <ReactMarkdown height='200px' source={comment.content} escapeHtml={false} />
                            </div>
                        </div>
                    </Col>
                    <Col span={22} offset={0} className='text-left p-1'>
                        <div className='pl-2'>
                        </div>
                    </Col>
                </Row>
            )

        }
        )
        return (
            <TopicStyleWrapper>
                <div className='flex flex-col justify-center'>
                    <div className="w-5/12 mx-auto p-4 border ">
                        <div className="topic-header border-b-2">
                            <div className="topic-name ">
                                <h1 >
                                    {topic.name}
                                </h1>
                            </div>
                            <div className="tags">
                                <span className='tag'>{topic.tags}</span>
                            </div>
                        </div>

                        <div className="flex flex-col mt-8">
                            <div className="topic-info">
                                <div className="author-info flex flex-row">
                                    <div className="w-1/12">
                                        <div><Avatar className="author-avatar" src={topic.userId.avater} /></div>
                                    </div>
                                    <div className="w-8/12 text-left">
                                        <div className="author-name">
                                            <a href="#">{topic.userId.name}</a>
                                        </div>
                                        <div className="flex-row">
                                            <span className="mr-3"><StarOutlined className="icon"/> 12</span>
                                            <span className="mr-3"><UserAddOutlined className="icon" />5</span>
                                            <span className="mr-3"><ProfileOutlined className="icon" />15</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="article-info">

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="w-1/12">
                                <button className="btn-vote">
                                    <svg aria-hidden="true" className="m0 svg-icon iconArrowUpLg" width="36" height="36"
                                         viewBox="0 0 36 36">
                                        <path d="M2 26h32L18 10 2 26z"></path>
                                    </svg>
                                </button>
                                <div className="like-number">
                                    <span>210</span>
                                </div>
                            </div>
                            <div className="w-11/12 mt-3">
                                <div className='question-container'>
                                    <div className='question-detail'>
                                        <ReactMarkdown height='200px' source={topic.content} escapeHtml={false} />
                                    </div>
                                    <div className='question-footer'>
                                        <div hidden = { process.env.mode !== 'PRODUCTION'} className="fb-share-button" data-href={window.location.href} data-layout="button" data-size="large"><a target="_blank" href= {linkToShare} className="fb-xfbml-parse-ignore">Chia sẻ</a></div>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                                hidden={!isOwner}
                                                onClick={() => { deleteTopic() }}
                                        >Delete
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                                hidden={!isOwner}
                                                onClick={() => showModal()}
                                        >Edit
                                        </button>
                                        <span className='share-question'
                                              onClick={() => { openReplyBox(); }}
                                        >Add a comment
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='reply-box mt-2 mb-12' hidden={!isReply}>
                            <TextareaAutosize
                                className="markdown-block-area w-full p-4 mb-6"
                                value={reply}
                                placeholder="Reply. Use Markdown"
                                onChange={(e) => setReply(e.target.value)} />
                            <div className='float-left'>
                                <button className='bg-green-500 hover:bg-green-700 rounded p-2 font-bold text-white ml-auto' onClick={() => setIsShowPreview(!isShowPreview)}>
                                    {isShowPreview ? 'Hide preview' : 'Show preview'}
                                </button>
                            </div>
                            <div className='float-right'>
                                <button className='bg-red-500 hover:bg-red-700 rounded p-2 font-bold text-white mr-2'
                                        onClick={() => setIsReply(false)}>
                                    Cancel
                                </button>
                                <button className='bg-blue-500 hover:bg-blue-700 rounded p-2 font-bold text-white mr-2'
                                        onClick={() => sendComment()}>
                                    Reply
                                </button>
                            </div>
                        </div>

                        <div className='preview-box mb-12' hidden={!(isReply && isShowPreview)}>
                            <div className="bg-white previous col-span-3 pt-3 px-2" overflow='scroll'>
                                <ReactMarkdown height='400px' source={reply} escapeHtml={false} />
                            </div>
                        </div>
                        {commentComponents}
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
                                <button className='' onClick={() => { updateTopic() }}>
                                    Update Topic
                                </button>
                                <button className='' onClick={() => { hideModal() }}>
                                    Cancel
                                </button>
                            </div>
                        }
                    >
                        <div className="grid grid-cols-6 mb-1">
                            <div className="markdown-block col-span-3">
                                <input className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-4 block w-full appearance-none leading-normal' placeholder='Title'
                                       value={title} required onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div className="col-span-3 px-2 ml-4">
                                <Dropdown className='inline-block' overlay={menu}>
                                    <button className='bg-yellow-500 p-2 text-white font-bold'>
                                        {tags}
                                    </button>
                                </Dropdown>
                                <input className='inline-block adasbg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-sm py-2 px-4 block appearance-none leading-normal' placeholder='challenge id'
                                       value={challengeId} required onChange={(e) => { setChallengeId(e.target.value) }} hidden={!(tags === 'challenge')} />
                            </div>
                        </div>
                        <div> Use <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet' target='_blank' rel='noopener noreferrer'>Markdown</a></div>
                        <div className="description grid grid-cols-6">
                            <div className="markdown-block col-span-3">
                                <TextareaAutosize
                                    required
                                    className="markdown-block-area w-full p-4"
                                    width='1600'
                                    value={contentNewTopic}
                                    placeholder="Type here. Use Markdown"
                                    onChange={(e) => setContentNewTopic(e.target.value)} />
                            </div>
                            <div className="previous col-span-3 pt-3 px-2" overflow='scroll'>
                                <ReactMarkdown height='200px' source={contentNewTopic} escapeHtml={false} />
                            </div>
                        </div>

                    </Modal>
                </div>
            </TopicStyleWrapper>

        );
    }
    return (
        <div className=''></div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // dispatch1: () => {
        //     dispatch(actionCreator)
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic)