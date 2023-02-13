import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }
  return stripePromise;
};

export default getStripe;
