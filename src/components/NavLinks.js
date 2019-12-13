import React from 'react';
import { NavLink } from 'react-router-dom';


function NavLinks() {
    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink exact to='/chat'>Common Chat</NavLink>
            </li>
            <li>
                <NavLink exact to='/todo-list'>Todo List</NavLink>
            </li>
            <li>
                <NavLink exact to='/document'>Сommon Document</NavLink>
            </li>
        </ul>
    )
}


export default NavLinks;