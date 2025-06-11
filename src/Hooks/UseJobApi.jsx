import React from 'react';
import userAxiosSecure from './userAxiosSecure';

const UseJobApi = () => {
     const axiosSecure = userAxiosSecure()

     const booking = email => {
        return axiosSecure.get(`/bookings/${user.email}`).then(res => res.data)

     }


    return {
        booking
    }
};

export default UseJobApi;