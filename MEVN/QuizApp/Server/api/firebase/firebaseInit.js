import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();