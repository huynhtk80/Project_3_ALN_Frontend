import { FaGlobeAfrica, FaRegMoneyBillAlt } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';

function LandingInfoSimple() {
  return (
    <div className='w-full h-fit flex flex-row justify-between items-center gap-3 bg-primary my-5 rounded-xl'>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div className='text-orange-600'>
          <HiOutlineLightBulb size={'60px'} />
        </div>
        <h2 className='text-2xl font-bold text-center text-secondary-focus'>
          The African Story
        </h2>
        <div className=' text-center text-neutral-focus'>
          This platform gives you a glimpse of Africa in detail, its various
          distinctions its diversity, richness, value, uniqueness, and wealth.
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div className='text-orange-600'>
          <FaGlobeAfrica size={'60px'} />
        </div>
        <h2 className='text-2xl font-bold text-center text-secondary-focus'>
          Continental Reach
        </h2>
        <div className=' text-center text-neutral-focus'>
          New documentaries and films are being made in various cities in
          America, the United Kingdom, Australia, and Asia.
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-5 p-5'>
        <div className='text-orange-600'>
          <FaRegMoneyBillAlt size={'60px'} />
        </div>
        <h2 className='text-2xl font-bold text-center text-secondary-focus'>
          invest in Africa
        </h2>
        <div className=' text-center text-neutral-focus'>
          We offer exclusive access to valuable, rich content from Africa that
          is guaranteed to bring investors profit due to its lucrative model.
        </div>
      </div>
    </div>
  );
}

export default LandingInfoSimple;
