import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    List,
    Tag,
    Form,
    Input,
    Icon,
    Row,
    Col
} from 'antd';

import firebase from './firebase';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const COLLECTION_NAME = 'messages';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
            author: 'Unknown Author',
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleWriteMessage = this.handleWriteMessage.bind(this);
        this.firestore = firebase.firestore();
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.get();
        }
    }
    
    handleChangeName(e) {
        this.setState({
            author: e.target.value
        });
    }
    
    handleWriteMessage(e) {
        this.setState({
            newMessage: e.target.value,
        });
    }

    get() {
//        console.log('this.props.user');
//        console.log(this.props.user);
//        
//        if (!this.props.user.status) return;
        const {
            firestore
        } = this;
        firestore.collection(COLLECTION_NAME).onSnapshot(snapshot => {
            let messages = [];
            snapshot.forEach(doc => {
                const message = doc.data();
                message.id = doc.id;
                messages.push(message);
            });
            messages.sort((a, b) => (
                a.date - b.date
            ));
//            this.setState({
//                messages,
//            });
            this.props.dispatch({
                type: 'ADD_MESSAGES',
                payload: messages,
            });
        });
    }

    post(e) {
        e.preventDefault();
        const { newMessage, author } = this.state;
        const { uid } = this.props.user;
        this.firestore.collection(COLLECTION_NAME).add({
            content: newMessage,
            author: this.props.user.name,
            date: Date.now(),
            author_uid: uid ? uid : null,
        });
    }

    update(e) {
//        const {
//            firestore
//        } = this;
//        const id = e.target.dataset.id;
//        firestore.collection(COLLECTION_NAME).doc(id).set({
//            completed: true,
//        }, { merge: true });
    }

    delete(e) {
        const {
            firestore
        } = this;
        const id = e.target.dataset.id;
        firestore.collection(COLLECTION_NAME).doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
  
    render() {
        //this.get();
        //console.log(this.props);
        //const { avatar, email, name, status, uid } = this.props.user;
        return (
            <>
                <Input type='text' placeholder="Your Name..." value={this.state.author} onChange={this.handleChangeName} />
                {this.props.messages.length ?
                    <List
                        size="large"
                        bordered
                        dataSource={this.props.messages}
                        renderItem={message =>
                            <List.Item>
                                <Tag color='green'>{message.author}:</Tag>
                                {message.content}
                                <Button type="primary" ghost onClick={this.update} data-id={message.id}>Edit</Button>
                                <Button type="danger" ghost onClick={this.delete} data-id={message.id}>Delete</Button>
                            </List.Item>}
                    />
                :
                <p>No messages to display...</p>
                }

                <Form layout="inline" onSubmit={this.post}>
                    <Row>
                        <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                            <Input type='text' placeholder="Write Your message..." value={this.state.newMessage} onChange={this.handleWriteMessage} />
                        </Col>
                        <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                            <Button type="primary" htmlType="submit">
                                <Icon type="message" />
                                Post!
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    }
}

//export default Chat;

const mapStateToProps = state => {
    return {
        user: state.user,
        messages: state.messages,
    }
}


export default connect(mapStateToProps)(Chat);