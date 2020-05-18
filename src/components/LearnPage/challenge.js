import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useRouteMatch, Link } from 'react-router-dom';

import { Layout, Row, Modal, Button } from 'antd';
import '../../style/css/learn.css';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";

import {
    ReflexContainer,
    ReflexSplitter,
    ReflexElement
} from 'react-reflex'
import 'react-reflex/styles.css'
import marked from 'marked'

import { setChallengeSelectedAction } from '../../actions/challengesAction';
import { callApiAsPromise } from '../../api';
const ReactMarkdown = require('react-markdown')
const { Header, Footer, Sider, Content } = Layout;

function Challenge(props) {
    let { challengeId } = useParams();
    const [code, setCode] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        props.setChallengeSelected(challengeId)


    }, [])
    useEffect(() => {
        setCode(props.challengeSelected.contents)
    }, [props.challengeSelected])
    console.log(code);

    const onChangeCode = (newValue) => {
        setCode(newValue)
    }
    const showModal = () => {
        setModalVisible(true)
    }
    const goToNextChallenge = e => {
        setModalVisible(false)
    };

    const downloadCode = e => {
        setModalVisible(false)
    };
    const submitCode = () => {
        let data = {
            "codeSubmit": {
                "code": code,
                "isRunOnlyCode": false,
                "language": "Nodejs"
            },
            "testCase": [
                {
                    "code": "assert(typeof convertToF(1) === 'number')",
                    "descrition": "convertToF(5) === 45",
                }
            ]
        }
        console.log(data);

        callApiAsPromise("post", "http://104.248.148.136:8080/itcodeweb-0.0.1-SNAPSHOT/code", null, JSON.stringify(data)).then((response) => {
            // alert("alo")
            console.log(response.data);
            if (response.data.status === 'SUCCESS') {
                showModal()
            }

        })
    }
    const resetCode = () => {
        console.log("quan2");
    }
    const goToForum = () => {
        console.log("quan3");
    }
    return (
        <div>
            <Layout id="layout-main">
                <ReflexContainer orientation="vertical">
                    <ReflexElement className="left-pane">
                        <Layout className="m-2" id="layout-content">
                            <Header className="font-Roboto font-bold" id="title">{props.challengeSelected.title}</Header>
                            <Content>
                                <ReactMarkdown source={props.challengeSelected.description} escapeHtml={false} />
                            </Content>
                            {/* <br/> */}
                            <hr />
                            <br />
                            <Content>
                                <ReactMarkdown source={props.challengeSelected.instructions} escapeHtml={false} />
                            </Content>
                            {/* <br/> */}
                            <hr />
                            <br />
                            <div className="grid grid-cols-3 gap-8">
                                <button className="bg-transparent text-xl hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-8 border-blue-500 hover:border-transparent rounded"
                                    onClick={() => submitCode()}>
                                    Submit code
                                </button>
                                <button className="bg-transparent text-xl hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-8 border-blue-500 hover:border-transparent rounded"
                                    onClick={() => resetCode()}>
                                    Reset all code
                                </button>
                                <button className="bg-transparent text-xl hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-8 border-blue-500 hover:border-transparent rounded"
                                    onClick={() => goToForum()}>
                                    Go to Forum
                                </button>
                            </div>
                        </Layout>
                    </ReflexElement>
                    <ReflexSplitter />

                    <ReflexElement className="right-pane">
                        <Layout id="layout-code">
                            <AceEditor
                                mode="javascript"
                                theme="terminal"
                                name="aceeditorContainer"
                                onChange={onChangeCode}
                                fontSize={16}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={code || ""}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    showLineNumbers: true,
                                    tabSize: 4,
                                }} />
                            <Content id="testInfo">Test pass or fail</Content>
                        </Layout>
                    </ReflexElement>
                </ReflexContainer>
            </Layout>
            <Modal
                title="Passed the Test"
                visible={modalVisible}
                // onOk={handleSubmit}
                // onCancel={handleCancel}
                footer={[
                    <Button key="next" onClick={() => goToNextChallenge()}>
                        Go to next challenge
                    </Button>,
                    <Button key="Download" type="primary" onClick={() => downloadCode()}>
                        Download code
                    </Button>
                ]}
            >
                <p>{props.challengeSelected.title}</p>

            </Modal>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChallengeSelected: (challengeId) => {
            dispatch(setChallengeSelectedAction(challengeId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Challenge);