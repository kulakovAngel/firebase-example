import { combineReducers } from 'redux';


const userReducer = (state = {}, action) => {
    switch(action.type) {
        case 'ADD_USER':
            return action.payload;
        case 'ADD_NUM_OF_USER_MESSAGES':
            return Object.assign({}, state, {numOfMessages: action.payload});
        default:
            return state;
    }
}

const messagesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_MESSAGES':
            return action.payload;
        case 'ADD_MESSAGE':
            console.log(action.payload);
            const newState = state.concat([action.payload]);
            return newState;
        case 'REMOVE_MESSAGES':
            return [];
        default:
            return state;
    }
}

const loadMoreReducer = (state = 3, action) => {
    switch(action.type) {
        case 'LOAD_MORE_MESSAGES':
            return action.payload;
        default:
            return state;
    }
}

const reducers = combineReducers({
    user: userReducer,
    messages: messagesReducer,
    loadMoreMessages: loadMoreReducer,
});

export default reducers;