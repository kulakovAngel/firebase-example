import React from 'react';

//import ToDoList from './ToDoList';
import Chat from './Chat';
import Auth from './components/Auth';
import './App.css';


class App extends React.Component {
    render() {
        return (
            <>
                <Auth />
                <Chat />
            </>
        );
    }
}

export default App;

//                <ToDoList />