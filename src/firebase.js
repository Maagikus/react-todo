import  {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


export const app = initializeApp({
    apiKey: "AIzaSyAP-GaKT9FnTLXNphl4R9c2kOQwNbWhe2g",
    authDomain: "react-todo-app-765a7.firebaseapp.com",
    projectId: "react-todo-app-765a7",
    databaseURL: "https://react-todo-app-765a7-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "react-todo-app-765a7.appspot.com",
    messagingSenderId: "144779476559",
    appId: "1:144779476559:web:9ae4da853257939937343a"
});

export const auth = getAuth(app)
export const database = getDatabase(app)



