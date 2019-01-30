import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC66cCHp_RxYXhSQi0-iaiawSm8PiHZLzU",
    authDomain: "site-document.firebaseapp.com",
    databaseURL: "https://site-document.firebaseio.com",
    projectId: "site-document",
    storageBucket: "site-document.appspot.com",
    messagingSenderId: "145269404106"
};

console.log('Firebase Import')

const app = firebase.initializeApp(config);
const settings = {timestampsInSnapshots: true};

const db = app.firestore();
db.settings(settings);

export default db;
export const auth = app.auth();

  