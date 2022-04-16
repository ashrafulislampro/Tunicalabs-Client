import {
  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../FirebaseAuth/firebase.init.jsx";
import popupError from "../Popup/popupError";
import popupSuccess from "../Popup/popupSuccess";


const app = initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  /* -------------------------------------------------------------------------- */
  /*                                  PROVIDERS                                 */
  /* -------------------------------------------------------------------------- */
  const googleProvider = new GoogleAuthProvider();

  /* -------------------------------------------------------------------------- */
  /*                              UPDATE USER INFO                              */
  /* -------------------------------------------------------------------------- */
  const updateUserInfo = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                             CREATE NEW ACCOUNT                             */
  /* -------------------------------------------------------------------------- */
  const createNewAccount = (email, password, name) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(name);
        updateUserInfo(name);
        setUser(result.user);
        window.location.pathname = "/form/signin";
        logOut(false);
        popupSuccess("new");
      })
      .catch((err) => {
        popupError(err.message);
      });

    setLoading(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                        SIGN IN WITH EMAIL & PASSWORD                       */
  /* -------------------------------------------------------------------------- */
  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  /* -------------------------------------------------------------------------- */
  /*                         SIGN IN WITH SOCIAL ACCOUNT                        */
  /* -------------------------------------------------------------------------- */
  const signInWithSocial = (provider) => {
    return signInWithPopup(auth, provider);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 USER LOGOUT                                */
  /* -------------------------------------------------------------------------- */
  const logOut = (isfalse) => {
    signOut(auth)
      .then(() => {
        popupSuccess("logout", isfalse);
      })
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                               ON AUTH CHANGE                               */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribed;
  },[auth]);

  return {
    user,
    setUser,
    loading,
    setLoading,
    createNewAccount,
    signInWithEmail,
    signInWithSocial,
    googleProvider,
    logOut,
  };
};

export default useFirebase;
