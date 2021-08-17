import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyA_Wf0sGyWOIJWHjgy1Dm36UV2NJxHrJNY",
	authDomain: "whatsapp-dbb90.firebaseapp.com",
	projectId: "whatsapp-dbb90",
	storageBucket: "whatsapp-dbb90.appspot.com",
	messagingSenderId: "308581491192",
	appId: "1:308581491192:web:73c9c372675c02ecb4f60d"
  };
const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };