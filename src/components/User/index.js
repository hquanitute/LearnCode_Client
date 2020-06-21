import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { callApiAsPromise, apiBaseUrl } from '../../api';
import { updateUser, updateUserByStorage } from '../../actions/userAction';

function UserProfile(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        setUserName(props.userInfo.name);
        setAvatar(props.userInfo.avater);
    }, [props.userInfo])

    const confirmUpdate = () => {
        setIsEditing(false);
        callApiAsPromise('put', apiBaseUrl+'/users/'+props.userInfo._id, null,{
            name: userName,
            avater : avatar
        }).then((response) => {            
            props.updateUserInfo(response.data.value);
            localStorage.setItem('updatedUser',JSON.stringify(response.data.value));
        })
    }
    const updateButton = (
        <div>
            <button onClick={() => { setIsEditing(true) }}>Update profile</button>
        </div>
    )
    const confirmUpdateButton = (
        <div>
            <button onClick={() => confirmUpdate()}>OK</button>
        </div>
    )
    let avatarComponent = isEditing ? (
        <div className="">
            <input className="" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </div>
    ) : (
        <div className="">
            <img className='h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto mt-2' src={props.userInfo.avater} alt='user avatar' />
        </div>
    );
    return (
        <div>
            {isEditing ? confirmUpdateButton : updateButton}
            <input className="" readOnly={!isEditing} value={userName} onChange={(e) => setUserName(e.target.value)} />
            <div className=""> {props.userInfo.email}</div>
            {avatarComponent}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUserInfo: (data) => {
            dispatch(updateUser(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)