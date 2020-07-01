import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyB3ACxLH_cxyyWtYwhqRraLscxx4JErGKs",
    authDomain: "re-db-168d7.firebaseapp.com",
    databaseURL: "https://re-db-168d7.firebaseio.com",
    projectId: "re-db-168d7",
    storageBucket: "re-db-168d7.appspot.com",
    messagingSenderId: "993591778046",
    appId: "1:993591778046:web:4a627ee60757bcd945a3af",
    measurementId: "G-H9QX48NY6X"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth)
        return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error created user', error.messsage);
        }
    }
    return userRef;



}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
