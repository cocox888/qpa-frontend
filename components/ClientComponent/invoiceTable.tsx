'use client';
import type { TypeInvoice } from '@/lib/types';
import type React from 'react';
import { useState, useEffect } from 'react';
import AddNewMethod from './AddNewMethod';

interface InvoiceTableProps {
  data: TypeInvoice[];
  onClick?: () => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ data, onClick }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentMethodSaved, setIsPaymentMethodSaved] = useState(false);
  const [preview, setPreview] = useState(false);
  const [pdfUrl, setUrl] = useState('');

  interface CheckboxChangeEvent {
    target: {
      checked: boolean;
    };
  }

  const close = () => {
    setIsModalOpen(false);
  };

  const handlePreviewInvoice = async (id: string) => {
    const token = localStorage.getItem('refresh_token');
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/InvoiceById`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          invoice_id: id
        })
      }
    );

    const invoiceUrl = await req.json();
    const fileUrl = `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/invoices/${invoiceUrl.invoice.file_path}`;
    setUrl(fileUrl);
    setPreview(true);
  };

  const handlePaymentMethodCreated = async (paymentMethodId: string) => {
    try {
      const token = localStorage.getItem('refresh_token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/attach-payment-method`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            paymentMethodId
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsPaymentMethodSaved(true);
        alert('Payment method attached successfully!');
      } else {
        alert('Failed to attach payment method');
      }
    } catch (error) {
      console.error('Error attaching payment method:', error);
      alert('An error occurred while attaching the payment method');
    }
  };
  const handlePayment = async (invoiceId: string) => {
    try {
      const token = localStorage.getItem('refresh_token');
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/paymentAttatched`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const paymentMethods = await resp.json();
      console.log(paymentMethods.hasPaymentMethod);
      if (paymentMethods.hasPaymentMethod === false) {
        setIsModalOpen(true);
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/pay-default-invoice`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ invoiceId })
        }
      );
      const data = await response.json();
      alert('Successfully Paid!');
      if (onClick) onClick();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const handleCheckboxChange = (event: CheckboxChangeEvent, id: number) => {
    setCheckedItems({
      ...checkedItems,
      [id]: event.target.checked
    });
  };

  const handleSelectAllChange = (event: CheckboxChangeEvent) => {
    const isChecked = event.target.checked;
    setIsSelectAllChecked(isChecked);

    const updatedCheckedItems = Object.keys(checkedItems).reduce(
      (acc, curr) => {
        acc[Number.parseInt(curr)] = isChecked;
        return acc;
      },
      {} as { [key: number]: boolean }
    );

    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const allChecked = Object.values(checkedItems).every((checked) => checked);
    setIsSelectAllChecked(allChecked);
  }, [checkedItems]);

  useEffect(() => {
    if (Object.keys(checkedItems).length === 0) {
      setIsSelectAllChecked(false);
    }
  }, [checkedItems]);

  return (
    <div id="clients-panel" role="tabpanel" className="h-full">
      <table className="w-full border-spacing-0">
        <thead>
          <tr className="text-right">
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project Title
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount Paid
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount Remaining
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount Shipping
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Currency Type
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pay Now
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, index) => {
            return (
              <tr key={item.id} className="table-row-hover text-center">
                <td
                  className="px-4 py-3"
                  onClick={(e) => handlePreviewInvoice(item.id)}
                >
                  {item.project_title || 'Untitled'}
                </td>
                <td className="px-4 py-3">
                  {(item.amount_due || 0 / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {(item.amount_paid || 0 / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {(item.amount_remaining || 0 / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {(item.amount_shipping / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium text-center">
                  {item.currency?.toUpperCase()}
                </td>
                <td className="px-4 py-3 justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ${item.paid ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                  />
                </td>
                <td className="px-4 py-3">
                  {!item.paid ? (
<<<<<<< HEAD
                    <button
                      className={`flex justify-center items-center gap-1.5 px-2 bg-green-400 hover:bg-green-300 ${item.paid ? 'disabled' : ''
                        }`}
                      id={item?.id.toString()}
=======
                    <div
                      className={`px-2 bg-green-400 hover:bg-green-300 ${
                        item.paid ? 'disabled' : ''
                      }`}
                      id={item.id.toString()}
>>>>>>> 5a0f939388685f32b0e087d559acf8470f541513
                      onClick={(e) => handlePayment(e.currentTarget.id)}
                    >
                      Pay Now
                    </div>
                  ) : (
                    <div className="px-2 bg-blue-400 hover:bg-blue-300">
                      Paid
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pdfUrl && preview && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[650px] max-h-[90vh] overflow-y-auto z-[101] transition-all duration-300">
          <iframe src={pdfUrl} width="100%" height="600px"></iframe>
          <div className=" flex gap-3 justify-end">
            <div
              onClick={(e) => setPreview((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-b-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <AddNewMethod
          onPaymentMethodCreated={handlePaymentMethodCreated}
          Close={close}
        />
      )}
    </div>
  );
};

export default InvoiceTable;
