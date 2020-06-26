import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { callApiAsPromise, apiBaseUrl } from '../../api';
import { Row, Col, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function Topic(props) {

    let { topicId } = useParams();
    const [topic, setTopic] = useState({});
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState('');
    const [isReply, setIsReply] = useState(true);
    const [isShowPreview, setIsShowPreview] = useState(false);

    useEffect(() => {
        callApiAsPromise('get', apiBaseUrl + 'topics/' + topicId, null, null).then(response => {
            setTopic(response.data.content)
            setComments(JSON.parse(topic.comments || '[]'));
        }).catch(error => {
            alert(error);
        })
    }, [])

    const sendComment = () => {
        const data = {
            comments: [...topic.comments, reply]
        }
        callApiAsPromise('put', apiBaseUrl + 'topics/' + topic._id, null, JSON.stringify(data)).then(response => {
            setTopic(response.data.value);
            setIsReply(false);
            setIsShowPreview(false);
            setReply('');
        })
    }
    console.log(topic);

    if (topic._id) {
        console.log(comments);
        const commentComponents = topic.comments.map((x, i) => (<div key={i}>{x}</div>))
        return (
            <div className='topic-bg min-h-screen'>
                <Row className='pt-4'>
                    <Col span={12} offset={6}>
                        <div className='text-left text-white font-bold text-2xl'>
                            {topic.name}
                        </div>
                        <div>
                            <span className='float-left m-1 px-1 text-black text-sm bg-yellow-400'>{topic.tags}</span>
                        </div>
                        <hr className='mt-8 border' />

                        <Row className='question topic-question-bg p-2'>
                            <Col span={2}>
                                <div className="">
                                    <img className='h-8 w-10 md:h-12 md:w-12 mx-auto mt-2' src={topic.userId.avater} alt='user avatar' />
                                </div>
                            </Col>
                            <Col span={22} offset={0} className='text-left p-1'>
                                <div className='pl-2'>
                                    <button className='pb-2 text-left text-white font-bold text-lg'>
                                        {topic.userId.name}
                                    </button>
                                    <div className='text-left text-white font-medium text-base'>
                                        <ReactMarkdown height='200px' source={topic.content} escapeHtml={false} />
                                    </div>
                                    <div className='float-right'>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                        >Share
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                            hidden={!topic.userId._id === props.userInfo._id}
                                        >Delete
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                            hidden={!topic.userId._id === props.userInfo._id}
                                        >Edit
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                            onClick={() => { setIsReply(true); }}
                                        >Reply
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <hr />
                        <Row className='reply-box mt-2 mb-12' hidden={!isReply}>
                            <TextareaAutosize
                                className="markdown-block-area w-full p-4"
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
                        </Row>

                        <Row className='preview-box mb-12' hidden={!(isReply && isShowPreview)}>
                            <div className="bg-white previous col-span-3 pt-3 px-2" overflow='scroll'>
                                <ReactMarkdown height='400px' source={reply} escapeHtml={false} />
                            </div>
                        </Row>

                        {commentComponents}
                        <Row>
                            <Col span={2}>
                                <div className="">
                                    <img className='h-8 w-10 md:h-12 md:w-12 mx-auto mt-2' src={topic.userId.avater} alt='user avatar' />
                                </div>
                            </Col>
                            <Col span={22} offset={0} className='text-left p-1'>
                                <div className='pl-2'>
                                    <button className='pb-2 text-left text-white font-bold text-lg'>
                                        {topic.userId.name}
                                    </button>
                                    <div className='text-left text-white font-medium text-base'>
                                        <ReactMarkdown height='200px' source={topic.content} escapeHtml={false} />
                                    </div>
                                    <div className='float-right'>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                        >Share
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                            hidden={!topic.userId._id === props.userInfo._id}
                                        >Delete
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                            hidden={!topic.userId._id === props.userInfo._id}
                                        >Edit
                                        </button>
                                        <button className='font-medium text-xl text-gray-500 hover:text-red-600 hover:bg-gray-500 p-2'
                                        >Reply
                                        </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
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