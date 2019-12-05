import { combineReducers } from 'redux';

const messagesReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_MESSAGES":
            return action.payload;
        default:
            return state;
    }
}

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_USER":
            return action.payload;
        default:
            return state;
    }
}

const reducers = combineReducers({
    user: userReducer,
    messages: messagesReducer,
});

export default reducers;