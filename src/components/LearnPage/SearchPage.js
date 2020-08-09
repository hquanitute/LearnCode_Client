import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import {changeSearchCriteria, doSearch} from "../../actions/searchAction";
import {Tabs} from 'antd';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';
import TopicInList from "../fragment/TopicInList";
import ChallengeInLIst from "../fragment/ChallengeInLIst";
import {setChallengeSelectedAction} from "../../actions/challengesAction";
import {useHistory} from "react-router-dom";
import {usePromiseTracker} from "react-promise-tracker";
import ThreeDots from "../Loader/ThreeDots";


const {TabPane} = Tabs;
const SearchPageWrapper = styled.div`

    
    
    


`

function SearchPage(props) {
    const { promiseInProgress } = usePromiseTracker();
    useEffect(() => {
        props.doSearch(props.search.criteria);
    }, [props.search.criteria])

    useEffect(() => {
    }, [props.search.result])


    return  promiseInProgress&&<ThreeDots/>||<SearchPageWrapper>
        <Tabs defaultActiveKey="1">
            <TabPane
                tab={
                    <span>
          Topic
        </span>
                }
                key="1"
            >
                {(props.search.result.topics.length > 0 && props.search.result.topics.map((item) => (
                    <TopicInList topic={item}/>
                )))||" No Result"}
            </TabPane>
            <TabPane
                tab={
                    <span>
          Challenge
        </span>
                }
                key="2"
            >

                {(props.search.result.challenges.length > 0 && props.search.result.challenges.map((item) => (
                    <ChallengeInLIst challenge={item}
                                     />
                )))|| "No Result"}
            </TabPane>
        </Tabs>
    </SearchPageWrapper>
}

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doSearch: (criteria) => {
            dispatch(doSearch(criteria))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);