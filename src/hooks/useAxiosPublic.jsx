import axios from 'axios';
import React from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://daily-to-do-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosSecure
};

export default useAxiosPublic;