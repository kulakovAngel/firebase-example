import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    Layout,
    Row,
    Col,
} from 'antd';

import firebase from './firebase';

import PageError from './pages/PageError';
import _404 from './pages/_404';
import Document from './components/Document';
import ToDoList from './ToDoList';
import Chat from './components/Chat';
import SideBar from './components/SideBar';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                this.props.dispatch({
                    type: 'ADD_USER',
                    payload: {status: true,
                              name: user.displayName,
                              uid: user.uid,
                              email: user.email,
                              avatar: user.photoURL
                             },
                });
                registerNewUser(user);
            } else {
                this.props.dispatch({
                    type: 'ADD_USER',
                    payload: {status: false,
                              name: '',
                              uid: '',
                              email: '',
                              avatar: ''
                             },
                });
            }
        });
        function registerNewUser({ uid, displayName: name, email, photoURL: avatar }) {
            firebase.firestore().collection('users').doc(uid).get().then(doc => {
                if (!doc.exists) {
                    firebase.firestore().collection('users').doc(uid).set({
                        name,
                        uid,
                        email,
                        avatar,
                        date: Date.now(),
                    });
                }
            });
        }
    }
    
    render() {
        const { auth } = this.props;
        return (
            <Router>
                <SideBar />
                <Layout>
                    <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Row>
                            <Col span={ 8 } offset={ 1 }>&#9729;Logo</Col>
                            <Col span={ 14 }>Header</Col>
                        </Row>
                    </Layout.Header>
                    <Layout.Content style={{ marginTop: 64 }}>
                        <Row>
                            <Col xs={{ span: 24 }} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }}>
                                <Switch>
                                    <Route exact path='/'>
                                        { auth ? <Chat /> : <PageError message='You are not an authorized user'/> }
                                    </Route>
                                    <Route exact path='/chat'>
                                        { auth ? <Chat /> : <PageError message='You are not an authorized user'/> }
                                    </Route>
                                    <Route exact path='/todo-list'>
                                        { auth ? <ToDoList /> : <PageError message='You are not an authorized user'/> }
                                    </Route>
                                    <Route exact path='/document' component={ Document } />
                                    <Route path='*' component={ _404 } />
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


const mapStateToProps = state => ({
    auth: state.user.status,
})
export default connect(mapStateToProps)(App);

//                <ToDoList />


//                    <Route exact path='/' component={PageHome} />
//                    <Route exact path='/list' component={PageViewList} />
//                    <Route path='/list/:id' component={PageViewSingleHuman} />
//                    <Route path='/echarts' component={PageViewEcharts} />
//                    <Route path='/about' component={PageAbout} />
//                    <Route path='*' component={PageNotFound} />