import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { getForumAction } from '../../actions/forumAction';
import { Link } from 'react-router-dom';
import { Modal, Dropdown, Menu, message } from 'antd';
// const ReactMarkdown = require('react-markdown')
import * as ReactMarkdown from 'react-markdown'
import { callApiAsPromise, apiBaseUrl } from '../../api';

require('./style.css')
function Forum(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [contentNewTopic, setContentNewTopic] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('general')
    const [challengeId, setChallengeId] = useState('');

    useEffect(() => {
        props.getForum({ limit: 5, tags: '' })
    }, [])

    const chooseCategory = (name) => {
        props.getForum({ limit: 5, tags: name })
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
    let listTopics = props.forum ? props.forum.map((topic) => (
        <div className='border-b-2 border-solid border-orange-500	 p-2'>
            <Link to={'/forum/' + topic._id} className='text-white'>
                {topic.name}
            </Link>
            <div className=''>
                {topic.tags.map((tag) => (<span className='m-1 p-1 text-black text-sm bg-yellow-400'>{tag}</span>))}
                <span className='float-right px-4' title='Number of replies'>{topic.comments.length}</span>
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
        <div className="bg-blue-800 forum-bg">
            <div className="pt-2">
                <button className='bg-red-500 hover:bg-red-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('') }}> All topics</button>
                <button className='bg-indigo-500 hover:bg-indigo-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('general') }}> General</button>
                <button className='bg-green-500 hover:bg-green-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('challenge') }}> Challenges</button>
                <button className='bg-yellow-500 hover:bg-yellow-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('javascript') }}> JavaScript</button>
                <button className='bg-orange-500 hover:bg-orange-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('java') }}> Java</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('python') }}> Python</button>
                <button className='bg-transparent hover:bg-blue-900 border-2 text-white text-2xl font-bold py-2 px-4 ml-12'
                    onClick={() => { showModal() }}> New Topic</button>
            </div>
            <br />
            <div className='justify-center w-1/2 text-left text-lg font-bold p-2 m-auto'>
                {listTopics}
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
                        <button className='' onClick={() => { createTopic() }}>
                            Create Topic
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
        getForum: (option) => {
            dispatch(getForumAction(option))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Forum)