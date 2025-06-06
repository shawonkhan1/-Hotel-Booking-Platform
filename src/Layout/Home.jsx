import React from 'react';
import Banner from '../Page/Banner';
import FeaturedRoom from '../Page/FeaturedRooms';
import AllReview from '../Page/AllReview';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* Featured Rooms: */}
            <div className='mt-5'>
                <FeaturedRoom></FeaturedRoom>
            </div>
            <div>
                <AllReview></AllReview>
            </div>
        
        </div>
    );
};

export default Home;