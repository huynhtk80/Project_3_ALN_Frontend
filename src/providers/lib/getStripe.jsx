import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.pk_test_51MaisELnXWX93vSNHSiNuOIr2iahknGPUn5f10sxgCr7nrXmCgHBbplR3HH1LQOzXVJDx6XvPNNEP9Gy1zlA2hFv00KcLbxofe);
  }
  return stripePromise;
};

export default getStripe;