import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBHWqBCanvvyBEzIlAW5mzaSROjBzhQwV8",
    authDomain: "ring-75058.firebaseapp.com",
    databaseURL: "https://ring-75058-default-rtdb.firebaseio.com",
    projectId: "ring-75058",
    storageBucket: "ring-75058.appspot.com",
    messagingSenderId: "1020896355530",
    appId: "1:1020896355530:web:06c7f9477b6fb3a5ad0033",
    measurementId: "G-0TKF0H3KRM"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);