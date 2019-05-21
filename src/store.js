import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import 'firebase/firestore'
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
    apiKey: "AIzaSyD_pK0mf7PRlf0asj6R6Jx73Agto9XOR48",
    authDomain: "react-clientpanel-ac181.firebaseapp.com",
    databaseURL: "https://react-clientpanel-ac181.firebaseio.com",
    projectId: "react-clientpanel-ac181",
    storageBucket: "react-clientpanel-ac181.appspot.com",
    messagingSenderId: "948891166610"
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
)(createStore)

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
})

if (localStorage.getItem('settings') == null) {
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: true
    }
    localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    // reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store
