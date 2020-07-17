import React from 'react';
import Loader from "react-loader-spinner";

function ThreeDots(props) {

    return (
        <div className="flex flex-row justify-center"><Loader type="ThreeDots" color="#292929" height={80} width={80} /></div>
        )


}

export default ThreeDots;