import getStripe from '../providers/lib/getStripe';
import React from 'react';

export default function () {
  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.price_1MajCdLnXWX93vSN4vvgULQk,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'customer@email.com',
    });
    console.warn(error.message);
  

  return    <button className='btn btn-sm ml-1 btn-primary'>
            onClick={handleCheckout}
  Login
</button>;
}









}
