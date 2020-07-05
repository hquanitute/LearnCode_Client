import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Home(props) {
    const buttonStarted = props.userInfo._id ? (
        <Link to={'/learn'} className='w-full h-12 border-1 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'> Get started </Link>
    ) : (
            <a className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                href={process.env.REACT_APP_GOOGLE} > Login with Google </a>
        );
    return (
        <div className ='topic-bg min-h-screen'>
            <h1 className="pt-4 mb-6 font-bold">Welcome to Learn Code</h1>
            <h2 className="mt-3 mb-10 font-normal">Learn Code on your bed</h2>
            <h2 className="mt-3 mb-10 font-normal">Discuss Technical</h2>
            <h3 className="mt-3 mb-10 font-normal">Dissertation of 2-member team - Quan and Dat, which will help you to improve coding skills</h3>
            {props.userInfo._id ? (<h2 className="my-4">Let's do it !!!</h2>) : (<h2 className="my-4">
                Let's get started now!</h2>)}
            {buttonStarted}
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Home)