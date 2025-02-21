import { auth } from '@/firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // const axiosPublic = useAxiosPublic()
// create user with email pass
    const creteUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const provider = new GoogleAuthProvider();
    //sign in with google
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //update profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    //logout
    const logOut = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // if (currentUser) {
            //     // todo: get token and store client
            //     const userInfo = { email: currentUser.email }
            //     axiosPublic.post('/jwt', userInfo)
            //         .then(res => {
            //             if (res.data.token) {
            //                 localStorage.setItem('access-token', res.data.token)
            //                 setLoading(false)

            //             }
            //         })
            // }
            // else {
            //     localStorage.removeItem('access-token')
            //     setLoading(false)

            // }
            // console.log(currentUser);
            setLoading(false)


        })
        return () => {
            return unSubscribe()
        }
    }, [])


    const authInfo = {
        user,
        loading,
        creteUser,
        loginUser,
        logOut,
        updateUserProfile,
        signInWithGoogle,
        setLoading,





    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

