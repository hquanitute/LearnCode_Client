import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useRouteMatch, Link } from 'react-router-dom';

import { Layout, Row } from 'antd';
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
const ReactMarkdown = require('react-markdown')
const { Header, Footer, Sider, Content } = Layout;

function Challenge(props) {
    let { challengeId } = useParams();
    const [challenge, setChallenge] = useState({ challengeSeed: "" });
    useEffect(() => {
        props.setChallengeSelected(challengeId)
        
        
    },[])
    function onChange(newValue) {
        console.log("change", newValue);
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
                            <br/>
                            <hr/>
                            <br/>
                            <Content>
                                <ReactMarkdown source={props.challengeSelected.instructions} escapeHtml={false} />
                            </Content>
                            <br/>
                            <hr/>
                            <br/>
                            
                        </Layout>
                    </ReflexElement>
                    <ReflexSplitter />

                    <ReflexElement className="right-pane">
                        <Layout id="layout-code">
                            <AceEditor
                                mode="javascript"
                                theme="terminal"
                                name="aceeditorContainer"
                                onChange={onChange}
                                fontSize={16}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={props.challengeSelected.contents|| "" }
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