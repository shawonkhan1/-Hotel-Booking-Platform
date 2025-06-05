import React from 'react';
import Banner from '../Page/Banner';
import FeaturedRooms from '../Page/FeaturedRooms';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            {/* Featured Rooms: */}
            <div className='mt-5'>
                <FeaturedRooms></FeaturedRooms>
            </div>
          
        </div>
    );
};

export default Home;