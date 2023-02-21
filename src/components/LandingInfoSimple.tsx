import { FaGlobeAfrica, FaRegMoneyBillAlt } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';

function LandingInfoSimple() {
  return (
    <div className='w-full h-fit flex flex-row justify-between items-center gap-3 bg-white my-5'>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div className='text-orange-600'>
          <HiOutlineLightBulb size={'60px'} />
        </div>
        <h2 className='text-2xl font-bold text-center'>The African Story</h2>
        <div className=' text-center'>
          This platform gives you a glimpse of Africa in detail, its various
          distinctions its diversity, richness, value, uniqueness, and wealth.
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div className='text-orange-600'>
          <FaGlobeAfrica size={'60px'} />
        </div>
        <h2 className='text-2xl font-bold text-center'>Continental Reach</h2>
        <div className=' text-center'>
          New documentaries and films are being made in various cities in
          America, the United Kingdom, Australia, and Asia.
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div className='text-orange-600'>
          <FaRegMoneyBillAlt size={'60px'} />
        </div>
        <h2 className='text-2xl font-bold text-center'>invest in Africa</h2>
        <div className=' text-center'>
          We offer exclusive access to valuable, rich content from Africa that
          is guaranteed to bring investors profit due to its lucrative model.
        </div>
      </div>
    </div>
  );
}

export default LandingInfoSimple;
