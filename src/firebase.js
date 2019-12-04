import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
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

export default firebase;