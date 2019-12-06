import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Avatar, Badge, Alert, Card } from 'antd';

import firebase from './../firebase';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {}
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        //this.firestore = firebase.firestore();
        this.provider = new firebase.auth.GoogleAuthProvider();
//        firebase.auth().onAuthStateChanged(function(user) {
//          if (user) {
//             // успешно авторизован, объект user содержит username и т.п.
//              console.log('user uid:');
//             console.log(user.uid);
//          }
//        });
    }

    signIn(e) {
        firebase.auth().signInWithPopup(this.provider).then( (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            this.setState({
                auth: {
                    status: 'true',
                    token: result.credential.accessToken,
                    name: result.user.displayName,
                    email: result.user.email,
                    avatar: result.user.photoURL,
                    error: {
                        status: false,
                        info: {},
                    },
                },
            });
        }).catch( (error) => {
            console.log('LogIn error:');
            // Handle Errors here.
            var errorCode = error.code;
            console.log(errorCode);
            var errorMessage = error.message;
            // The email of the user's account used.
            console.log(errorMessage);
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            console.log(email);
            var credential = error.credential;
            console.log(credential);
            this.setState({
                auth: {
                    status: false,
                    token: '',
                    name: '',
                    email: '',
                    avatar: '',
                    error: {
                        status: true,
                        info: {
                            code: error.code,
                            message: error.message,
                            email: error.email,
                            credential: error.credential,
                        },
                    },
                },
            });
        });
    }

    signOut() {
        firebase.auth().signOut().then(() => {
            this.setState({
                auth: {
                    status: false,
                    token: '',
                    name: '',
                    email: '',
                    avatar: '',
                    error: {
                        status: false,
                        info: {
                            code: '',
                            message: '',
                            email: '',
                            credential: '',
                        },
                    },
                },
            });
            this.props.dispatch({
                type: 'REMOVE_MESSAGES',
            });
            console.log('Sign-out successful.');
        }).catch((error) => {
            this.setState({
                auth: {
                    error: {
                        status: false,
                        info: {
                            code: error.code,
                            message: error.message,
                            email: error.email,
                            credential: error.credential,
                        },
                    },
                },
            });
            console.log('An sign-out error happened.');
        });
    }

    render() {
//        const {
//            status,
//            name,
//            avatar
//        } = this.state.auth;
        const { avatar, name, status } = this.props.user;
        return (
            <>
                <Button type="primary" ghost onClick={this.signIn}>Sign In</Button>
                <Button type="primary" ghost onClick={this.signOut}>Sign Out</Button>
                { status &&
                    <Card title={`Hello, ${name}!`} extra={<a href="#"><Badge count={1}>
                                <Avatar icon="user" size="large" src={ avatar } />
                            </Badge></a>} >
                        <p>You may post the message</p>
                    </Card>
                }
            </>
        );
    }
}

//export default Auth;

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}


export default connect(mapStateToProps)(Auth);