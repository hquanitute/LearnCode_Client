import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { callApiAsPromise, apiBaseUrl } from '../../api';
import { updateUser } from '../../actions/userAction';
import { Row, Col } from 'antd';

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
        callApiAsPromise('put', apiBaseUrl + '/users/' + props.userInfo._id, null, {
            name: userName,
            avater: avatar
        }).then((response) => {
            props.updateUserInfo(response.data.value);
            localStorage.setItem('updatedUser', JSON.stringify(response.data.value));
        })
    }

    const cancelUpdate = () => {
        setIsEditing(false);
        setUserName(props.userInfo.name);
        setAvatar(props.userInfo.avater)
    }

    const signOut = () => {
        localStorage.removeItem('jwt');
        props.updateUserInfo({})
    }
    const updateButton = (
        <div className="mb-2">
            <button className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                onClick={() => { setIsEditing(true) }}>Update my profile</button>
        </div>
    )
    const confirmUpdateButton = (
        <div className="mb-2">
            <button className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                onClick={() => confirmUpdate()}>Save</button>
        </div>
    )
    const cancleUpdateButton = (
        <div className="mb-2">
            <button className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                onClick={() => cancelUpdate()}>Cancel</button>
        </div>
    )
    const signOutButton = (
        <div className="mb-2">
            <button className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                onClick={() => signOut()}>Sign me out</button>
        </div>
    )
    let avatarComponent = isEditing ? (
        <div className="">
            <input className="" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </div>
    ) : (
            <div className="">
                <img className='h-32 w-32 md:h-32 md:w-32 rounded-full mx-auto mt-2' src={props.userInfo.avater} alt='user avatar' />
            </div>
        );
    return (
        <div>
            <Row className='pt-4'>
                <Col span={12} offset={6}>
                    {isEditing ? confirmUpdateButton : updateButton}

                    {isEditing ? cancleUpdateButton : signOutButton}

                    {/* <button className='mb-4 w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                        onClick={() => { setIsEditing(true) }}>Sign me out</button> */}

                    <input className="text-center font-bold text-2xl mb-2" readOnly={!isEditing} value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <div className="text-center font-base text-base mb-2"> {props.userInfo.email}</div>
                    {avatarComponent}
                </Col>
            </Row>
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