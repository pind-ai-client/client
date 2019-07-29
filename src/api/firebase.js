// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDoyydLwwVoReuTTiinYw7UBZ4CdaWOrTM',
  authDomain: 'pindai-bf9cc.firebaseapp.com',
  projectId: 'pindai-bf9cc'
});

export default firebase