import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Home(props) {
    const buttonStarted = props.userInfo._id ? (
        <Link to={'/learn'} className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'> Get started </Link>
    ) : (
            <a className='w-full h-12 border-4 border-solid border-gray-900 bg-gray-400 hover:bg-gray-900 text-gray-900 font-extrabold hover:text-white py-2 px-4'
                href='https://learn-server-api.herokuapp.com/auth/google' > Login with Google </a>
        );
    return (
        <div>
            <h1 className="mt-4">Welcome to Learn Code</h1>
            <h2 className="mt-4">Learn Code on your bed</h2>
            <h2 className="mt-4">Discuss Technical</h2>
            <h3 className="mt-4 font-normal">Dissertation of 2-member team - Quan and Dat, which will help you to improve coding skills</h3>
            {props.userInfo._id ? (<h2 className="mt-4">Let's do it !!!</h2>) : (<h2 className="mt-4">Login to save your results</h2>)}
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