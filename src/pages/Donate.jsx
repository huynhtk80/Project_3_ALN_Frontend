import getStripe from '../providers/lib/getStripe';

export default function () {
  async function handleCheckout() {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: import.meta.env.VITE_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `http://localhost:5173/success`,
      cancelUrl: `http://localhost:5173/cancel`,
      customerEmail: 'customer@email.com',
    });
    console.warn(error.message);
  }
  console.log('price key', import.meta.env.VITE_PUBLIC_STRIPE_PRICE_ID);
  return (
    <div className='pt-24'>
      <button onClick={handleCheckout} className='btn btn-sm ml-1 btn-primary'>
        Donate!!!!
      </button>
    </div>
  );
}
