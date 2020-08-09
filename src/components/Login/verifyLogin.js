import React, { useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserByTokenAction } from '../../actions/userAction';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function VerifyLogin(props) {
    let query = useQuery();

    useEffect(() => {
        // var query = queryString.parse(props.location.search);
        if (query.get("token")) {
            
          window.localStorage.setItem("jwt", query.get("token"));
          props.setUserByToken(query.get("token"));
        }
    }, [])
    return (
        <Redirect push to="/" />
    );
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUserByToken: (token) => {
            dispatch(setUserByTokenAction(token))
        },
    }
}

export default connect(null, mapDispatchToProps)(VerifyLogin)