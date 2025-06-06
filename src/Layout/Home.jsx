import React from 'react';
import Banner from '../Page/Banner';
import FeaturedRoom from '../Page/FeaturedRooms';
import AllReview from '../Page/AllReview';
import Faq from '../Page/Faq';
import Services from '../Page/Services';
import SpecialOffer from '../Page/SpecialOffer';
import { Helmet } from 'react-helmet';
import Maps from '../Page/Maps';


const Home = () => {
    return (
       <>
        <div className='relative'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <SpecialOffer />
            <Banner />

            <div className='mt-5'>
                <FeaturedRoom />
            </div>
          

            <div className='mt-10'>
                <Services />
            </div>

            <div className='mt-10'>
                <Faq />
            </div>

            <div>
                <AllReview />
            </div>

                <div className='mt-10' style={{ height: '400px', width: '100%' }}>
                <Maps />
            </div>
        </div>
       </>
    );
};

export default Home;