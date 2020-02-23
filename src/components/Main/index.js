import React from 'react';
import LearnPage from '../LearnPage';
import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import '../../style/css/navbar.css';
const { Search } = Input;

function Main(props) {
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <Row>
                            <Col span={6}>
                                <Search id="search-input" placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                            </Col>
                            {/* Offset: grid=24 grid-6:for search. offset = ((24/2-6)-(span))/2= 5 */}
                            <Col span={2} offset={5}> 
                                <Link to="/">
                                    LearnCodeClient
                                </Link>
                            </Col>
                            <Col span={1} offset={7}>
                                <Link className="rightNav" to="/new">/new</Link>
                            </Col>
                            <Col span={1} offset={0}>
                                <Link className="rightNav" to="/forum">/forum</Link>
                            </Col>
                            <Col span={1} offset={0}>
                                <Link className="rightNav" to="/learn">/learn</Link>
                            </Col>
                        </Row>
                    </nav>
                    <Switch>
                        <Route exat path="/learn">
                            <LearnPage />
                        </Route>
                        {/* <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route> */}
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

function Home() {
    return <h2>Home</h2>;
}

export default Main;