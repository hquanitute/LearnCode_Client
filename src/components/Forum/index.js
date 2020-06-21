import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { getForumAction } from '../../actions/forumAction';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
// const ReactMarkdown = require('react-markdown')
import * as ReactMarkdown from 'react-markdown'

require('./style.css')
function Forum(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [contentNewTopic, setContentNewTopic] = useState('');

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
    return (
        <div className="bg-blue-800 min-h-screen">
            <div className="pt-2">
                <button className='bg-red-500 hover:bg-red-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('') }}> All topics</button>
                <button className='bg-green-500 hover:bg-green-700 text-white text-2xl font-bold py-2 px-4'
                    onClick={() => { chooseCategory('challenges') }}> Challenges</button>
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
                        <button className=''>
                            Create Topic
                        </button>
                        <button className='' onClick={() => { hideModal() }}>
                            Cancel
                        </button>
                    </div>
                }
            >
                <div className="description grid grid-cols-6">
                    <div className="markdown-block col-span-3">
                        <TextareaAutosize
                            className="w-full p-4"
                            width='1600'
                            value={contentNewTopic}
                            placeholder="Type here. Use Markdown"
                            onChange={(e) => setContentNewTopic(e.target.value)} />
                    </div>
                    <div className="previous col-span-3 pt-3 px-2">
                        <ReactMarkdown source={contentNewTopic} escapeHtml={false} />
                    </div>
                </div>

            </Modal>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        forum: state.forum
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