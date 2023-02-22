import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

function PricingTiers() {
  const fbContext = useContext(FirebaseContext);
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const navigate = useNavigate();

  const onClickHandle = () => {
    navigate('/home/Category');
  };

  return (
    <>
      <div className='flex flex-col items-center my-5'>
        <h1 className='text-4xl mb-5'>Choose Your Plan</h1>
        <p className='mb-6'>Choose a plan that works best for you.</p>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-4'>
          {[
            {
              plan: 'Entertainment, first month free!',
              cost: '$4.99',
              features: [
                'Watch unlimited videos',
                'Setup profile and share your preferred content',
                'Share links of content with friends and family',
                'Watch highlights and trailers of all new content',
                'Access to film competitions and quizzes',
              ],
              disabled: false,
              currentPlan: true,
            },
            {
              plan: 'Networker, Coming soon!',
              cost: '$8.99',
              features: [
                'All Entertainment Features',
                'Connect with other networkers, Entreprenuers and businesses',
                'Have chat capability with the networker community',
                'Limited access to live streaming, webinars and product launches.',
              ],
              disabled: true,
              currentPlan: false,
            },
            {
              plan: 'Entrepreneur, Coming soon!',
              cost: '$11.99',
              features: [
                'All Networker Features',
                'Access to ALN the business directory',
                'Access to virtual business symposiums, conferences and fairs',
              ],
              disabled: true,
              currentPlan: false,
            },
          ].map((card, index) => (
            <div
              key={index + card.plan}
              className='card w-80 min-h-[28rem] bg-secondary text-base-100  shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'
            >
              <div className='card-body items-center justify-between h-full '>
                <h2 className='card-title'>{card.plan}</h2>
                <h2 className='card-title'>
                  <span className='text-4xl'>{card.cost}</span>/month
                </h2>
                <ul className=''>
                  {card.features.map((feat, index) => (
                    <li key={index} className='flex items-center'>
                      <div className='mr-3'>
                        <svg
                          className='w-4 h-4  text-accent'
                          viewBox='0 0 24 24'
                          strokeLinecap='round'
                          strokeWidth='2'
                        >
                          <polyline
                            fill='none'
                            stroke='currentColor'
                            points='6,12 10,16 18,8'
                          />
                          <circle
                            cx='12'
                            cy='12'
                            fill='none'
                            r='11'
                            stroke='currentColor'
                          />
                        </svg>
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className='card-actions'>
                  {user && card.currentPlan ? (
                    <button
                      className='btn bg-secondary-content border-none text-white hover:bg-primary transition-all duration-300 ease-in-out
                      disabled:text-white disabled:bg-secondary-content'
                      disabled={true}
                    >
                      Your Current Plan
                    </button>
                  ) : (
                    <button
                      className='btn bg-accent-focus text-white border-none hover:bg-primary transition-all duration-300 ease-in-out
                      disabled:text-white disabled:bg-accent-focus'
                      disabled={card.disabled}
                      onClick={onClickHandle}
                    >
                      Choose this Plan
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PricingTiers;
