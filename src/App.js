import React from 'react';
import './App.css';
import Main from './components/Main';
import {createGlobalStyle} from "styled-components";

const AppWraper=createGlobalStyle`
body{
     @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,300;0,400;0,600;1,600;1,700&display=swap');
     font-family: 'Roboto Mono', monospace;
     color:#1B1B32;
}
`

function App() {

  return (
    <div className="App">
        <AppWraper/>
            <Main/>

    </div>
  );
}

export default App;
