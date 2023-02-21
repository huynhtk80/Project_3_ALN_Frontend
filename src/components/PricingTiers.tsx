function PricingTiers() {
  return (
    <>
      <div className='flex flex-col items-center my-5'>
        <h1 className='text-4xl mb-5'>Choose Your Plan</h1>
        <p className='mb-6'>Choose a plan that works best for you.</p>
        <div className='flex flex-col  lg:flex-row justify-center items-center gap-4'>
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
            },
          ].map((card, index) => (
            <div
              key={index + card.plan}
              className='card w-80 min-h-[28rem] bg-primary-focus shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'
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
                          className='w-4 h-4  text-teal-700'
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
                  <button
                    className='btn btn-primary bg-base-100 border-none hover:bg-primary transition-all duration-300 ease-in-out'
                    disabled={card.disabled}
                  >
                    Choose this Plan
                  </button>
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
