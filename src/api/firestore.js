const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
firebase.initializeApp({
    apiKey: 'AIzaSyDoyydLwwVoReuTTiinYw7UBZ4CdaWOrTM',
    authDomain: 'pindai-bf9cc.firebaseapp.com',
    projectId: 'pindai-bf9cc'
  });
const db = firebase.firestore()
export default db