function Advertising() {
  return (
    <div className='grid justify-items-center pt-3 container mx-auto text-base-100 card-bordered shadow-xl bg-neutral pb-5 m-20 rounded-lg'>
      <h1 className='text-3xl font-bold p-3'>
        Looking for a Advertising Services?
      </h1>

      <div className='card w-96 bg-base-100 shadow-xl image-full'>
        <div className='card-body'>
          <h2 className='card-title'>
            Ad Placement Opportunities Coming Soon!
          </h2>
          <p>
            {' '}
            You can promote & advertise your companies products & services with
            us by advertising on our platform. In the future, Africa Live
            Network will provide opportunities for banners in different parts of
            the platform on pages with a lot of traffic that will help your
            business generate more business.
            <br />
            <br />
            Advertising is a feature coming soon to your subscription as an
            additional subscription bonus. Allowing budding entrepreneur's the
            extra boost their business needs to generate more clients traffic by
            giving them the space to have their advertisement aired.
            <br />
            <br />
            Companies chosen, are chosen based on if the content aligns &
            represents Africa Live Networks's brand.
          </p>

          <button className='btn btn-sm mt-5'>
            <a href='https://jacksshackint.com/' target='_blank'>
              Click Here If You Wish to Make an Ad
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Advertising;
