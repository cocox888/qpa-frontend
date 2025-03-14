'use client';

import api from '@/app/api/customApi';
import apiForFile from '@/app/api/customApiForFile';
import Toast from '@/components/toast';
import type {
  TypeClient,
  TypeInvoice,
  TypeProject,
  TypeReport
} from '@/lib/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { fileSizeFormat } from '@/lib/utils/fileUtils';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../reducers/store';
import Image from 'next/image';
import { isNonEmptyArray } from '@/lib/utils/functions';
import InvoiceTable from '@/components/ClientComponent/invoiceTable';

export default function Notes() {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [invoices, setInvoices] = useState<TypeInvoice[]>();
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    const fetchInvoice = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/client/getAllInvoice`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      console.log(data);
      setInvoices(data?.invoices);
    };
    fetchInvoice();
  }, [fresh]);

  const onClick = () => {
    console.log('ok');
    setFresh((prev) => !prev);
  };

  return (
    <div className="pt-20 pl-64 pr-6 min-h-screen w-screen overflow-x-hidden">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin className="w-10 h-10" />
        </div>
      ) : (
        <div className=" mx-auto space-y-6">
          {/* <!-- Header Section --> */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all your invoices in one place
              </p>
            </div>
            {/* <div className="flex gap-3">
              <label
                htmlFor="file-upload"
                className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </label>
              <input
                id="file-upload"
                type="file"
                // onChange={handleFileChange}
                accept=".doc,.pdf,.docx"
              />
            </div> */}
          </div>

          {/* <!-- Stats Cards --> */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="w-full flex align-center">
                  <p className="text-xl font-medium text-gray-500">
                    Total Invoices:
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {invoices?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 gap-4">
              <InvoiceTable data={invoices || []} onClick={onClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
