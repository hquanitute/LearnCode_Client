import React, { useEffect, useState } from 'react';
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

import parseMD from 'parse-md'
import marked from 'marked'

import { useParams, useRouteMatch, Link } from 'react-router-dom';

const ReactMarkdown = require('react-markdown')

const { Header, Footer, Sider, Content } = Layout;

function onChange(newValue) {
    console.log("change", newValue);
}



function LearnPage(props) {
    function chooseLesson(e) {
        console.log(e)
        setLessonName(e.target.key)
    }
    let { path, url } = useRouteMatch();

    const [lessonName, setLessonName] = useState("");
    const [challenge, setChallenge] = useState({ challengeSeed: "" });

    let { topicId } = useParams();

    useEffect(() => {
        const fileContents = require("../../challenge/test.md");
        fetch(fileContents)
            .then(response => {
                return response.text()
            })
            .then(text => {
                // this.setState({
                //     markdown: marked(text)
                // })
                const { metadata, content } = parseMD(text)
                let contentRemovedKey = content.replace("## Description", "##").replace("## Instructions", "##").replace("## Tests", "##").replace("## Challenge Seed", "##").replace("## Solution", "##");
                let arrStringContent = contentRemovedKey.split("##");
                console.log(arrStringContent)
                setChallenge({
                    ...challenge,
                    id: metadata.id,
                    title: metadata.title,
                    challengeType: metadata.challengeType,
                    videoUrl: metadata.videoUrl,
                    forumTopicId: metadata.forumTopicId,
                    description: arrStringContent[1],
                    instructions: arrStringContent[2],
                    tests: arrStringContent[3],
                    challengeSeed: (arrStringContent[4]),
                    solution: arrStringContent[5]
                });
            })

    }, [topicId])

    useEffect(() => {
        console.log(challenge.challengeSeed)
    }, [challenge])

    useEffect(() => {
        console.log(lessonName);
    }, [lessonName])
    return (
        <div>
            <Layout id="layout-main">
                <Sider>
                    <Row className="font-Roboto font-bold p-5 h-10">
                        Lessons
                    </Row>
                    <Link key="1" to={`${url}/rendering`}>
                        <button onClick={() => setLessonName("abc")}>
                            Chaining If Else Statements
                        </button>
                    </Link>
                </Sider>
                <ReflexContainer orientation="vertical">
                    <ReflexElement className="left-pane">
                        <Layout className="m-2" id="layout-content">
                            <Header className="font-Roboto font-bold" id="title">{challenge.title}</Header>
                            <Content>
                                <ReactMarkdown source={challenge.description} escapeHtml={false} />
                            </Content> 
                            <br/>
                            <hr/>
                            <br/>
                            <Content>
                                <ReactMarkdown source={challenge.instructions} escapeHtml={false} />
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
                                value={challenge.challengeSeed}
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

export default LearnPage;