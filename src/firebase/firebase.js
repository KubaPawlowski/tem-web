import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { apiKey } from './firebaseApiKey';

const config = apiKey;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
