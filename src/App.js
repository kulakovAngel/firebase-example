import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    Layout,
    Row,
    Col,
} from 'antd';

import ToDoList from './ToDoList';
import Chat from './Chat';
import SideBar from './components/SideBar';
import './App.css';


class App extends React.Component {
    render() {
        return (
            <Router>
                <SideBar />
                <Layout>
                    <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={8} offset={1}>Logo</Col>
                            <Col span={14}>Header</Col>
                        </Row>
                    </Layout.Header>
                    <Layout.Content>
                        <Row>
                            <Col span={12} offset={6}>
                                <Switch>
                                    <Route exact path='/' component={Chat} />
                                    <Route exact path='/chat' component={Chat} />
                                    <Route exact path='/todo-list' component={ToDoList} />
                                </Switch>
                            </Col>
                        </Row>
                    </Layout.Content>
                    <Layout.Footer>Footer</Layout.Footer>
                </Layout>
            </Router>
        );
    }
}

export default App;

//                <ToDoList />


//                    <Route exact path='/' component={PageHome} />
//                    <Route exact path='/list' component={PageViewList} />
//                    <Route path='/list/:id' component={PageViewSingleHuman} />
//                    <Route path='/echarts' component={PageViewEcharts} />
//                    <Route path='/about' component={PageAbout} />
//                    <Route path='*' component={PageNotFound} />