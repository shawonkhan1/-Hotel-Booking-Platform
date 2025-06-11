import React, { useContext } from 'react';
import userAxiosSecure from './userAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';

const UserApplicationApi = () => {
    const {user} = useContext(AuthContext)

    
    const axiosSecure = userAxiosSecure()
    
    const myBookingPromise = email => {
        return axiosSecure.get(`/bookings/${user.email}`).then(res => res.data)
    }


    return {
        myBookingPromise

    }
};

export default UserApplicationApi;