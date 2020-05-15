import React, { useEffect, useState } from 'react';
import '../../style/css/learn.css';

import { useParams, useRouteMatch, Link } from 'react-router-dom';
import Welcome from './welcome';
import ListPractice from './listPractice';

function LearnPage(props) {
    return (
        <div>
            <Welcome/>
            <ListPractice/>
        </div>
    );
}

export default LearnPage;