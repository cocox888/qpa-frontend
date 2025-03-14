import type React from 'react';
import { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';

interface PaymentMethodFormProps {
  onPaymentMethodCreated: (paymentMethodId: string) => void;
  client_secret: string;
  Close: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  onPaymentMethodCreated,
  client_secret,
  Close
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(PaymentElement);
    if (!cardElement) {
      setError('Card details are required.');
      setIsProcessing(false);
      return;
    }

    try {
      await elements.submit();
      const token = localStorage.getItem('refresh_token');

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: 'http://localhost:5173'
        },
        redirect: 'if_required',
        clientSecret: client_secret
      });
      console.log(setupIntent);
      if (error) {
        setError(error.message || 'An error occurred while processing.');
        setIsProcessing(false);
        return;
      }

      // Successfully attached the payment method
      onPaymentMethodCreated(setupIntent.payment_method as string);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
      Close();
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[650px] max-h-[90vh] overflow-y-auto z-[101] transition-all duration-300">
      <form onSubmit={handleSubmit} className="p-8 w-full">
        <h2 className="font-bold text-[24px] pb-8">
          Attach Your Payment Method
        </h2>
        <PaymentElement className="p-4 border rounded-lg" />
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? 'Processing...' : 'Save Payment Method'}
          </button>
          <button
            type="button"
            onClick={Close}
            className="bg-red-400 text-white px-4 py-2 rounded-lg ml-4"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
