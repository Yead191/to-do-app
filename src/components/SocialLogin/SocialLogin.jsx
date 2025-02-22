import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const SocialLogin = ({ setIsLoginModalOpen }) => {
    const navigate = useNavigate()
    const { signInWithGoogle } = useAuth()
    const location = useLocation()
    const from = location.pathname || '/'

    const axiosPublic = useAxiosPublic()

    const handleGoogleSignIn = async () => {
        const { user } = await toast.promise(signInWithGoogle(), {
            loading: "Signing in...",
            success: <b>Login Successful!</b>,
            error: <b>Could not Signin.</b>,
        });
        const { displayName, email, photoURL, metadata } = user;
        // console.log(user);
        const userDetails = {
            name: displayName, email, photoURL: photoURL, createdAt: metadata?.creationTime
        }
        await axiosPublic.post("/users", userDetails),
            navigate(from)
        setIsLoginModalOpen(false)

    }
    return (
        <div>
            <div className="flex gap-3 mb-2">
                <button onClick={handleGoogleSignIn} className="bg-gray-200 hover:bg-gray-300 rounded-xl px-5 h-10 flex  gap-3 items-center justify-center">
                    <FcGoogle /> Sign in With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;