import React from 'react';
import { connect } from 'react-redux';
import {
    Input,
} from 'antd';

import firebase from './../firebase';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const COLLECTION_NAME = 'document';


class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.firestore = firebase.firestore();
        this.firestore.collection(COLLECTION_NAME).doc('1').onSnapshot(snapshot => {
            this.setState(snapshot.data());
        });
    }
    
    handleChange = (e) => {
        console.dir(e.target.selectionStart);
        this.firestore.collection(COLLECTION_NAME).doc('1').set({
            'text': e.target.value,
        }, { merge: true });
    }
    
    render() {
        return (
            <>
                <Input.TextArea placeholder="Write something here..." autoSize={{ minRows: 6 }} value={ this.state.text } onChange={ this.handleChange }/>
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


export default connect(mapStateToProps)(Document);