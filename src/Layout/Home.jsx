import React from 'react';
import Banner from '../Page/Banner';
import FeaturedRoom from '../Page/FeaturedRooms';
import AllReview from '../Page/AllReview';
import Faq from '../Page/Faq';
import Services from '../Page/Services';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            {/* Featured Rooms: */}
            <div className='mt-5'>
                <FeaturedRoom></FeaturedRoom>
            </div>
          
          {/* services */}
            <div className='mt-10'>
                <Services></Services>
            </div>
            {/* faq */}
              <div className='mt-10'>
                <Faq></Faq>
            </div>
                {/* all revew */}
              <div>
                <AllReview></AllReview>
            </div>
        
        </div>
    );
};

export default Home;