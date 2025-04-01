import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyADfoK9Z3d4o6aNdS5A8KfMWZmqujkfUYc",
    authDomain: "netflix-clone-a613c.firebaseapp.com",
    projectId: "netflix-clone-a613c",
    storageBucket: "netflix-clone-a613c.appspot.com", // ✅ Fixed storage bucket
    messagingSenderId: "824413746744",
    appId: "1:824413746744:web:ff40238fb985251d5f58cd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), { // ✅ Changed "user" to "users" (if necessary)
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error.message); // ✅ Only log the error message
        toast.error(error.code.split('/')[1].split('-').join(" ")); // ✅ Show only the readable error message
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message); // ✅ Only log error message
        toast.error(error.code.split('/')[1].split('-').join(" ")); ; // ✅ Show only readable error
    }
};

const logout = async () => {  // ✅ Make logout async for better error handling
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error.message); // Log the error message
        alert("Error signing out: " + error.message); // Show error message if sign out fails
    }
};

export { auth, db, login, signup, logout };
