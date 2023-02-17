function PricingTiers() {
  return (
    <>
      <div className='flex flex-col items-center my-5'>
        <h1 className='text-4xl mb-5'>Choose Your Plan</h1>
        <p className='mb-6'>Choose a plan that works best for you.</p>
        <div className='flex flex-col  sm:flex-row justify-center items-center gap-4'>
          {[
            {
              plan: 'Beta Trial',
              cost: 'free',
              features: ['preliminary access', 'connection with network'],
              disabled: false,
            },
            {
              plan: 'Starter',
              cost: 'tbd',
              features: ['preliminary access', 'connection with network'],
              disabled: true,
            },
            {
              plan: 'Premium',
              cost: 'tbd',
              features: ['preliminary access', 'connection with network'],
              disabled: true,
            },
          ].map((card, index) => (
            <div
              key={index + card.plan}
              className='card max-w-96 bg-primary-focus shadow-xl hover:scale-105 transition-all duration-300 ease-in-out'
            >
              <div className='card-body items-center gap-6'>
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
