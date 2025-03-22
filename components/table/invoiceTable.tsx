'use client';
import type { TypeInvoice } from '@/lib/types';
import Image from 'next/image';
import type React from 'react';
import { useState, useEffect } from 'react';

interface InvoiceTableProps {
  data: TypeInvoice[];
}
const InvoiceTable: React.FC<InvoiceTableProps> = ({ data }) => {
  const [pdfUrl, setUrl] = useState('');
  const [preview, setPreview] = useState(false);

  const viewInvoice = async (id: string) => {
    const token = localStorage.getItem('refresh_token');
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/InvoiceById`,
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

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  interface CheckboxChangeEvent {
    target: {
      checked: boolean;
    };
  }

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
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Contact Person
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Amount
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Amount Paid
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Amount Remaining
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Amount Shipping
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Currency Type
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Status
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, index) => {
            return (
              <tr
                className="table-row-hover text-right"
                onClick={(e) => viewInvoice(item.id)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/person1.jpg"
                      alt="user"
                      width={32}
                      height={32}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-600">
                      {item.customer_name || 'Undefined'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-900 font-medium">
                    {(item.amount_due / 100).toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {(item.amount_paid / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {(item.amount_remaining / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {(item.amount_shipping / 100).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium text-center">
                  {item.currency?.toUpperCase()}
                </td>
                <td className="px-4 py-3 justify-center">
                  <div className="flex justify-center items-center gap-1.5">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.paid ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
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
    </div>
  );
};

export default InvoiceTable;
