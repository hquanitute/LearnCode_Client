import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Layout, Modal, Button } from 'antd';
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

import { setChallengeSelectedAction } from '../../actions/challengesAction';
import { callApiAsPromise, apiBaseUrl } from '../../api';
import '../../style/css/learn.css';
import { updateUser } from '../../actions/userAction';
import styled from "styled-components";

const ReactMarkdown = require('react-markdown')
const { Header, Content } = Layout;

const ChallengeStyleWrapper=styled.div`
    padding:20px 0;
    .btn-bottom-action{
        background-color: while;
        border: 1px solid;
        padding: 10px;
        border-radius: 5px;
        color: black;
        font-weight: bold;
    }
    .btn-bottom-action:hover{
        background-color: #292929;
        color: #fff;
    }
`


function Challenge(props) {
    let { challengeId } = useParams();
    const [code, setCode] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [listChallengeIds, setListChallengeIds] = useState([]);
    const [testInfo, setTestInfo] = useState("//Test will shown here");

    useEffect(() => {
        props.setChallengeSelected(challengeId)
    }, [])
    useEffect(() => {
        setCode(props.challengeSelected.contents)
    }, [props.challengeSelected])

    useEffect(() => {
        initListChallengeIds();
    }, [props.courses])

    const initListChallengeIds = () => {
        (props.courses || []).map(course => {
            (course.lessons || []).map(lesson => {
                (lesson.challenges || []).map(challenge => {
                    if (challenge._id === challengeId)
                        lesson.challenges.map(challengeInRight => {
                            setListChallengeIds(previous => [...previous, challengeInRight._id])
                        })
                    return;
                })
            })
        })
    }

    const onChangeCode = (newValue) => {
        setCode(newValue)
    }
    const showModal = () => {
        setModalVisible(true)
    }
    const goToNextChallenge = e => {
        props.setChallengeSelected(listChallengeIds[listChallengeIds.indexOf(challengeId) + 1])
        setModalVisible(false)
    };

    const downloadCode = e => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = props.challengeSelected.title + '.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        setModalVisible(false)
    };
    const submitCode = () => {
        let language = "";
        if (props.challengeSelected.challengeType > -1 && props.challengeSelected.challengeType < 100) {
            language = "NodejsTest"
        } else if (props.challengeSelected.challengeType >= 100 && props.challengeSelected.challengeType < 200) {
            language = "Java"
        }

        let data = {
            "codeSubmit": {
                "code": props.challengeSelected.tests + " " + code
            },
            "language": language,
            "test": {
                "code": "string"
            }
        }
        callApiAsPromise("post", "http://104.248.148.136:8080/itcodeweb-0.0.1-SNAPSHOT/" + "code", null, JSON.stringify(data)).then((response) => {   
        console.log(response.data);

            if (response.data.errorMessage.errorComplieMessage == null && response.data.successMessage.successComplieMessage) {
                setTestInfo(response.data.successMessage.successComplieMessage)
                if (props.userInfo._id){
                    const listChallengeIdPassed = props.userInfo.listChallengeIdPassed;                    
                    if (!listChallengeIdPassed.includes(challengeId)){
                        listChallengeIdPassed.push(challengeId);                        
                        callApiAsPromise("put", apiBaseUrl + 'users/'+props.userInfo._id, null, JSON.stringify({'listChallengeIdPassed':listChallengeIdPassed}))
                            .then((res) => {
                                props.updateUserInfo(res.data.value);
                            })
                            .catch(console.log())
                    }
                }
                showModal()
            } else {
                setTestInfo(response.data.successMessage.successComplieMessage +
                    '<br/> <br/>' +
                    response.data.errorMessage.errorComplieMessage)
            }
        })
    }
    const resetCode = () => {
        setCode(props.challengeSelected.contents)
        setTestInfo(" //Test will shown here")
    }

    return (
        <ChallengeStyleWrapper>
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
                                {props.challengeSelected.instructions == "" ? "" : <hr />}
                                <ReactMarkdown source={props.challengeSelected.instructions} escapeHtml={false}
                                               visible={props.challengeSelected.instructions == "" ? false : true} />
                                {/* <br/> */}
                                <hr />
                                <br />
                                <div className="grid grid-cols-3 gap-8">
                                    <button className="btn-bottom-action"
                                            onClick={() => submitCode()}>
                                        Submit code
                                    </button>
                                    <button className="btn-bottom-action"
                                            onClick={() => resetCode()}>
                                        Reset all code
                                    </button>
                                    <Link className="btn-bottom-action"
                                          to={`/forum/` + props.challengeSelected.forumTopicId } >
                                        Go to Forum
                                    </Link>
                                </div>
                            </Layout>
                        </ReflexElement>
                        <ReflexSplitter />
                        <ReflexElement className="right-pane">
                            <ReflexContainer orientation="horizontal">
                                {/* <Layout id="layout-code"> */}
                                <ReflexElement className="top-pannel" propagateDimensionsRate={200}
                                               propagateDimensions={true}
                                               flex={0.8}>
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
                                </ReflexElement>
                                <ReflexSplitter propagate={true} />
                                <ReflexElement className="bottom-pane overflow-y-scroll test-area">
                                    <ReactMarkdown source={testInfo} escapeHtml={false} />
                                </ReflexElement>
                                {/* </Layout> */}

                            </ReflexContainer>
                        </ReflexElement>
                    </ReflexContainer>
                </Layout>
                <Modal
                    title="Passed the Test"
                    visible={modalVisible}
                    // onOk={handleSubmit}
                    onCancel={() => setModalVisible(false)}
                    // closable = {false}
                    footer={
                        listChallengeIds.indexOf(challengeId) < listChallengeIds.length - 1 ?
                            [
                                <Link key="next" to={`/learn/` + listChallengeIds[listChallengeIds.indexOf(challengeId) + 1]} onClick={() => goToNextChallenge()}>
                                    Go to next challenge
                                </Link>,
                                <Button key="Download" type="primary" onClick={() => downloadCode()}>
                                    Download code
                                </Button>
                            ] :
                            [
                                <Link key="next" to={`/learn/`}>
                                    Go back learning page
                                </Link>,
                                <Button key="Download" type="primary" onClick={() => downloadCode()}>
                                    Download code
                                </Button>
                            ]
                    }
                >
                    <p>{props.challengeSelected.title}</p>

                </Modal>
            </div>
        </ChallengeStyleWrapper>

    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        challengeSelected: state.challengeSelected,
        courses: state.courses,
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChallengeSelected: (challengeId) => {
            dispatch(setChallengeSelectedAction(challengeId))
        },
        updateUserInfo: (data) => {
            dispatch(updateUser(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Challenge);