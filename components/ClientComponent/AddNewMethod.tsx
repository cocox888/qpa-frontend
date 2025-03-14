import React, { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodForm from './PaymentMethodForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ''
);

interface PaymentMethodFormProps {
  onPaymentMethodCreated: (paymentMethodId: string) => void;
  Close: () => void;
}

const AddNewMethod: React.FC<PaymentMethodFormProps> = ({
  onPaymentMethodCreated,
  Close
}) => {
  const [clientSecret, setClientSecret] = useState();

  const handleSecretKey = async () => {
    const token = localStorage.getItem('refresh_token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/setup-intent`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get setup intent.');
    }

    const { client_secret } = await response.json();
    setClientSecret(client_secret);
  };

  useEffect(() => {
    handleSecretKey();
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentMethodForm
            onPaymentMethodCreated={onPaymentMethodCreated}
            client_secret={clientSecret}
            Close={Close}
          />
        </Elements>
      )}
    </>
  );
};

export default AddNewMethod;
