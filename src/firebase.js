import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

// 🔐 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyADfoK9Z3d4o6aNdS5A8KfMWZmqujkfUYc",
  authDomain: "netflix-clone-a613c.firebaseapp.com",
  projectId: "netflix-clone-a613c",
  storageBucket: "netflix-clone-a613c.appspot.com",
  messagingSenderId: "824413746744",
  appId: "1:824413746744:web:ff40238fb985251d5f58cd"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Sign Up
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    if (name) {
      await updateProfile(user, { displayName: name });
    }

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });

    toast.success("Sign up successful!");
  } catch (error) {
    console.error("Signup error:", error.message);
    toast.error(error.code.split("/")[1]?.replace(/-/g, " ") || "Signup error");
  }
};

// ✅ Login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error("Login error:", error.message);
    toast.error(error.code.split("/")[1]?.replace(/-/g, " ") || "Login error");
  }
};

// ✅ Logout
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error.message);
    toast.error("Error signing out");
  }
};

// ✅ Password Reset
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent!");
  } catch (error) {
    console.error("Reset password error:", error.message);
    toast.error(error.code.split("/")[1]?.replace(/-/g, " ") || "Reset error");
  }
};

// 📦 Export everything
export { auth, db, login, signup, logout, resetPassword };
