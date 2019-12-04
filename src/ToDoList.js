import React from 'react';
import { Button, List, Tag, Form, Input, Icon } from 'antd';

import firebase from './firebase';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newToDoInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.firestore = firebase.firestore();
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  
  handleChange(e) {
    this.setState({newToDoInput: e.target.value});
  }
  
  get() {
    const { firestore } = this;
    firestore.collection("todos").onSnapshot(snapshot => {
      let todos = [];
      snapshot.forEach(doc => {
        const todo = doc.data();
        todo.id = doc.id;
        todos.push(todo);
      });
      this.setState({todos});
    });
  }
  
  post(e) {
    e.preventDefault();
    const v = this.state.newToDoInput;
    this.firestore.collection("todos").add({
      content: v,
      completed: false,
    });
  }
  
  update(e) {
    const { firestore } = this;
    const id = e.target.dataset.id;
    firestore.collection("todos").doc(id).set({
      completed: true,
    }, { merge: true });
  }
  
  delete(e) {
    const { firestore } = this;
    const id = e.target.dataset.id;
    firestore.collection("todos").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
  
  render() {
    return (
      <>
        <Button type="primary" ghost onClick={this.get}>Get All ToDos</Button>
        {this.state.todos.length ?
          <List
            size="large"
            bordered
            dataSource={this.state.todos}
            renderItem={todo =>
              <List.Item>
                {todo.content}
                <Tag color={todo.completed ? 'green' : 'red'}>{todo.completed ? 'Completed' : 'NOT COMPLETED'}</Tag>
                <Button type="primary" ghost onClick={this.update} data-id={todo.id}>Done</Button>
                <Button type="danger" ghost onClick={this.delete} data-id={todo.id}>Delete</Button>
              </List.Item>}
          />
          :
          <p>No data to display...</p>
        }
        <Form layout="inline" onSubmit={this.post}>
          <Input type='text' placeholder="Add New ToDo" value={this.state.newToDoInput} onChange={this.handleChange} />
          <Button type="primary" htmlType="submit">
            <Icon type="plus" />
            Add ToDo
          </Button>
        </Form>
      </>
    );
  }
}

export default ToDoList;