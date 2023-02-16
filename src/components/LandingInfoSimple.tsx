import React from 'react';

function LandingInfoSimple() {
  return (
    <div className='w-full h-60 flex flex-row justify-between items-center gap-3 bg-white'>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div>Icon lightbulb</div>
        <h2 className='text-xl'>The African Story</h2>
        <div className=' text-center'>
          This platform gives you a glimpse of Africa in detail, its various
          distinctions its diversity, richness, value, uniqueness, and wealth.
        </div>
      </div>
      <div className='flex flex-col justify-between items-center p-5'>
        <div>Icon globe</div>
        <div>Continental Reach</div>
        <div className=' text-center'>
          New documentaries and films are being made in various cities in
          America, the United Kingdom, Australia, and Asia.
        </div>
      </div>
      <div className='flex flex-col justify-between items-center p-5'>
        <div>Icon moneybill</div>
        <div>invest in Africa</div>
        <div className=' text-center'>
          We offer exclusive access to valuable, rich content from Africa that
          is guaranteed to bring investors profit due to its lucrative model.
        </div>
      </div>
    </div>
  );
}

export default LandingInfoSimple;
