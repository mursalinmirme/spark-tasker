import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase.config";
export const authContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    // sign up with email and password
    const createUserByEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
  // sign in with email and password
  const signinwithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //  update profile
    const updateName = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo);
      };
        // user log out
  const userLogout = () => {
    return signOut(auth);
  };
  // sign in or sign up with google
  const signInWihtGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
    // sign in with github
    const signinwithGithub = () => {
      setLoading(true);
      return signInWithPopup(auth, githubProvider);
    };
  // catch the current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);
    

    const useInfo = {
        createUserByEmail,
        updateName,
        user,
        loading,
        userLogout,
        signinwithEmail,
        signInWihtGoogle,
        signinwithGithub,
    }
    return (
        <authContext.Provider value={useInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;