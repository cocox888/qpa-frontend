import React, { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Loader from './Loader';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);

const PaymentForm = () => {
  return (
    <div className="payment-form-sec">
      <div className="container">
        <div className="payment-form-wrapper">
          <div className="top-heading">
            <h1 className="font-bold my-4 text-lg text-center">Payment</h1>
          </div>
          <UserPaymentMethodModal />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

const UserPaymentMethodModal = () => {
  const { orderConfirmationDetail } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (orderConfirmationDetail?.allInfo?.clientSecret) {
      setClientSecret(orderConfirmationDetail.allInfo.clientSecret);
    }
  }, [orderConfirmationDetail]);

  return clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  ) : (
    <div>Loading...</div>
  );
};

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsError('');

    if (!stripe || !elements) {
      setIsError('Stripe.js or Elements is not initialized.');
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setIsError('There was a complication processing the payment method.');
        return;
      }
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:5173'
        },
        redirect: 'if_required',
        clientSecret
      });
      if (error) {
        setIsError(
          error.message || 'An error occurred during payment processing.'
        );
        toast.error('An error occurred during payment processing.');
        return;
      }
      if (paymentIntent?.id) {
        const { paymentIntentId, allInfo, ...restData } =
          orderConfirmationDetail;

        const orderResponse = await createOrder({
          ...restData,
          paymentIntentId: paymentIntent.id
        }).unwrap();
        if (orderResponse?.status === 'PAID') {
          toast.success('Payment was successfully completed. Order placed!');
          dispatch(setOrderConfirmationDetail(null));
          dispatch(setCartDetail(null));
          dispatch(setShoppingCart(null));
          dispatch(setOrderId(orderResponse?.uuid));
          navigate(`/order-details/:${orderResponse?.uuid}`);
        } else {
          throw new Error('Order processing failed after payment.');
        }
      }
    } catch (err) {
      console.error('Error during payment processing:', err);
      setIsError(err.message || 'An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || (isOrderLoading && <Loader />)}
      <form
        onSubmit={handleSubmit}
        className="w-full mt-2 px-4 text-center mx-auto max-w-[500px]"
      >
        <PaymentElement />
        {isError && (
          <p className="error-message text-red-500 p-2 mt-2">{isError}</p>
        )}
        <button
          className="bg-black text-white text-base font-medium rounded-[6px] px-12 py-3 my-4"
          type="submit"
          disabled={!stripe || !clientSecret || loading}
        >
          {loading | isOrderLoading ? 'Processing...' : 'Confirm'}
        </button>
      </form>
    </>
  );
};
