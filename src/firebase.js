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

firebase.auth().onAuthStateChanged((user) => {
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


function snap() {
    unsubscribe = firebase.firestore().collection('messages').onSnapshot(snapshot => {
        let messages = [];
        snapshot.forEach(doc => {
            const message = doc.data();
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
    });
}


//firebase.firestore().collection('messages').onSnapshot(snapshot => {
//    console.log('onSnapshot onSnapshot onSnapshot onSnapshot');
//            let messages = [];
//            snapshot.forEach(doc => {
//                const message = doc.data();
//                message.id = doc.id;
//                messages.push(message);
//            });
//            messages.sort((a, b) => (
//                a.date - b.date
//            ));
//            store.dispatch({
//                type: 'ADD_MESSAGES',
//                payload: messages,
//            });
//        });

export default firebase;
//    get() {
//        const {
//            firestore
//        } = this;
//        firestore.collection(COLLECTION_NAME).onSnapshot(snapshot => {
//            let messages = [];
//            snapshot.forEach(doc => {
//                const message = doc.data();
//                message.id = doc.id;
//                messages.push(message);
//            });
//            messages.sort((a, b) => (
//                a.date - b.date
//            ));
////            this.setState({
////                messages,
////            });
//            this.props.dispatch({
//                type: 'ADD_MESSAGES',
//                payload: messages,
//            });
//        });
//    }


//auth: {
//                    status: false,
//                    token: '',
//                    name: '',
//                    email: '',
//                    avatar: '',
//                    error: {
//                        status: false,
//                        info: {
//                            code: '',
//                            message: '',
//                            email: '',
//                            credential: '',
//                        },
//                    },
//                },