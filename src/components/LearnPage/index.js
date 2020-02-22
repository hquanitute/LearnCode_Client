import React from 'react';
import { Layout } from 'antd';
import '../../style/css/learn.css';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-github";

const { Header, Footer, Sider, Content } = Layout;

function onChange(newValue) {
    console.log("change", newValue);
}

function LearnPage(props) {
    return (
        <div>
            <Layout id="layout-main">
                <Sider>Muc Luc</Sider>
                <Layout>
                    <Header>Tiêu đề</Header>
                    <Content>Nội dung</Content>
                    <Footer>Bye</Footer>
                </Layout>
                <Layout id="layout-code">
                    <AceEditor
                        mode="javascript"
                        theme="github"
                        name="aceeditorContainer"
                        onChange={onChange}
                        fontSize={16}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={`hello`}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 4,
                        }} />
                    <Content>Test pass or fail</Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default LearnPage;