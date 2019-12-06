import store from './store';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKbufVYusR-R2hVEEvknMw_nZ9IuBa4ps",
    authDomain: "kulakov-firebase.firebaseapp.com",
    databaseURL: "https://kulakov-firebase.firebaseio.com",
    projectId: "kulakov-firebase",
    storageBucket: "kulakov-firebase.appspot.com",
    messagingSenderId: "747992461483",
    appId: "1:747992461483:web:4e8379e108f5b7a79d07ee"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let unsubscribe = function(){};

firebase.auth().onAuthStateChanged( user => {
    if (user) {
        store.dispatch({
            type: 'ADD_USER',
            payload: {status: true,
                      name: user.displayName,
                      uid: user.uid,
                      email: user.email,
                      avatar: user.photoURL
                     },
        });
        snap();
        registerNewUser(user);
    } else {
        store.dispatch({
            type: 'ADD_USER',
            payload: {status: false,
                      name: '',
                      uid: '',
                      email: '',
                      avatar: ''
                     },
        });
        unsubscribe();
    }
});


//function snap() {
//    unsubscribe = firebase.firestore().collection('messages').onSnapshot(snapshot => {
//        let messages = [];
//        snapshot.forEach(doc => {
//            const message = doc.data();
//            message.id = doc.id;
//            messages.push(message);
//        });
//        messages.sort((a, b) => (
//            a.date - b.date
//        ));
//        store.dispatch({
//            type: 'ADD_MESSAGES',
//            payload: messages,
//        });
//    });
//}

function snap() {
    const user_uid = store.getState().user.uid;
    unsubscribe = firebase.firestore().collection('messages').onSnapshot(snapshot => {
        const messages = [];
//        snapshot.docChanges().forEach((change) => {
//            switch (change.type) {
//                case 'added':
//                    console.log("New city: ", change.doc.data());
//                    break;
//                case 'modified':
//                    console.log("Modified city: ", change.doc.data());
//                    break;
//                case 'removed':
//                    console.log("Removed city: ", change.doc.data());
//                    break;
//            }
//        });
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
        store.dispatch({
            type: 'ADD_MESSAGES',
            payload: messages,
        });
        store.dispatch({
            type: 'ADD_NUM_OF_USER_MESSAGES',
            payload: user_messages,
        });
    });
}

function registerNewUser({ uid, displayName: name }) {
    const store = firebase.firestore();
    store.collection('users').doc(uid).get().then(doc => {
        if (!doc.exists) {
            store.collection('users').doc(uid).set({
                name,
                uid,
                date: Date.now(),
            });
        }
    });
}

//function isUserExist({ uid }) {
//    const store = firebase.firestore();
//    store.collection('users').doc(uid).get().then(doc => {
//        if (doc.exists) {
//            console.log("Document data:", doc.data());
//            return true;
//        } else {
//            // doc.data() will be undefined in this case
//            console.log("No such document!");
//            return false;
//        }
//    });
//}

export default firebase;