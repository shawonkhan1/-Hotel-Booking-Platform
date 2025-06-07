import React from 'react';
import Lottie from "lottie-react";
import nodatalottie from '../assets/Lottie/nodatafound.json';

const NoDataFound = () => {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="w-64 md:w-96">
                <Lottie animationData={nodatalottie} loop={true} />
              
            </div>
        </div>
    );
};

export default NoDataFound;
