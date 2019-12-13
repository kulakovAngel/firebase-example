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
    Col,
} from 'antd';

import firebase from './../firebase';
import {
    formateDate,
} from './../functions';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const COLLECTION_NAME = 'messages';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
        };
        this.snapLast();
        
        this.loadMore = this.loadMore.bind(this);
        this.handleWriteMessage = this.handleWriteMessage.bind(this);
        this.firestore = firebase.firestore();
        this.post = this.post.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.new = this.new.bind(this);
    }
    
    componentDidUpdate(prevProps) {
        (!this.props.user.status) && this.unsubscribeFromMessages();
        if (this.props.loadMoreMessages !== prevProps.loadMoreMessages) {
            this.snapLast();
        }
    }
    
    loadMore(e) {
        const prev = this.props.loadMoreMessages
        this.props.dispatch({
            type: 'LOAD_MORE_MESSAGES',
            payload: prev + 1,
        });
    }
    
    handleWriteMessage(e) {
        this.setState({
            newMessage: e.target.value,
        });
    }

    post(e) {
        e.preventDefault();
        const { newMessage } = this.state;
        const { uid, name } = this.props.user;
        this.firestore.collection(COLLECTION_NAME).add({
            content: newMessage,
            author: name,
            date: Date.now(),
            author_uid: uid ? uid : null,
        });
        this.setState({newMessage: ''});
    }

    update(e) {
        const {
            firestore
        } = this;
        const id = e.target.dataset.id;
        this.setState({
            updateId: id,
        });
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
    
    new() {
//        const { uid, name } = this.props.user;
//        this.firestore.collection(uid).add({
//            content: newMessage,
//            author: name,
//            date: Date.now(),
//            author_uid: uid ? uid : null,
//        });
    }
    
    snapLast() {
        const user_uid = this.props.user.uid;
        this.unsubscribe = firebase.firestore().collection('messages').orderBy("date", "desc").limit(this.props.loadMoreMessages).onSnapshot((snapshot) => {
            const messages = [];
            let user_messages = 0;
            snapshot.forEach(doc => {
                const message = doc.data();
                if (message.author_uid === user_uid) {
                    user_messages++;
                }
                message.id = doc.id;
                messages.push(message);
            });
            messages.sort((a, b) => (
                a.date - b.date
            ));
            this.props.dispatch({
                type: 'ADD_MESSAGES',
                payload: messages,
            });
            this.props.dispatch({
                type: 'ADD_NUM_OF_USER_MESSAGES',
                payload: user_messages,
            });
        });
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render() {
        const { user, messages, loadMoreMessages: numOfMessages } = this.props;
        return (
            <>
                Last { numOfMessages } messages: <Button type="dashed" onClick={this.loadMore}>Load more</Button>
                {this.props.messages.length ?
                    <List
                        size="large"
                        bordered
                        dataSource={ messages }
                        renderItem={ message =>
                            <List.Item>
                                <Row style={{ width: '100%' }}>
                                    <Col xs={9}>
                                        <Tag color='green'>{message.author}{message.author_uid === user.uid && <b style={{color: '#f77'}}> (You)</b>}:<br/>{formateDate(message.date)}</Tag>
                                    </Col>
                                    <Col xs={12}>
                                        {this.state.updateId === message.id ? <Input.TextArea value={ message.content } /> : message.content}
                                        {}
                                    </Col>
                                    <Col xs={3}>
                                        {message.author_uid === user.uid &&
                                            <>
                                                <Button type="primary" ghost onClick={this.update} data-id={message.id}>Edit</Button>
                                                <Button type="danger" ghost onClick={this.delete} data-id={message.id}>Delete</Button>
                                            </>
                                        }
                                    </Col>
                                </Row>
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
                <Button type="primary" onClick={this.new}>
                    <Icon type="plus" />
                    Create new chat
                </Button>
            </>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user,
    messages: state.messages,
    loadMoreMessages: state.loadMoreMessages,
});
export default connect(mapStateToProps)(Chat);