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
import { getAllProjects } from '../../reducers/projects';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../reducers/store';
import Image from 'next/image';
import { isNonEmptyArray } from '@/lib/utils/functions';
import InvoiceTable from '@/components/table/invoiceTable';

export default function Notes() {
  const [totalReports, setTotalReports] = useState<TypeReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [viewPreview, setViewPreview] = useState(false);
  const [project, setProject] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const [revenue, setRevenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [reFetch, setReFetch] = useState(false);
  const [clients, setClients] = useState<TypeClient[]>([]);
  const [projects, setProjects] = useState<TypeProject[]>([]);
  const [client, setClient] = useState(0);
  const [endDateError, setEndDateError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currencyType, setCurrencyType] = useState('usd');
  const [description, setDescription] = useState('');
  const [invoices, setInvoices] = useState<TypeInvoice[]>();

  useEffect(() => {
    const token = localStorage.getItem('refresh_token');
    const fetchClient = async () => {
      const cli_res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/clients`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const clients = await cli_res.json();
      setClients(clients);
    };
    fetchClient();
  }, [reFetch]);

  useEffect(() => {
    if (!client) return;
    const token = localStorage.getItem('refresh_token');
    const fetchProject = async () => {
      const pro_res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getAllProjectsForClient`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ client })
        }
      );
      const proj = await pro_res.json();
      setProjects(proj);
    };
    fetchProject();
  }, [client]);

  useEffect(() => {
    console.log(client);
    const token = localStorage.getItem('refresh_token');
    const fetchInvoice = async () => {
      const pro_res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getAllInvoice`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          }
        }
      );
      const proj = await pro_res.json();
      console.log(proj);
      setInvoices(proj.data);
    };
    fetchInvoice();
  }, [client]);

  const newReportHandle = async () => {
    console.log('ok');
    if (!client) {
      console.log('Please Select Client!');
      return;
    }
    const token = localStorage.getItem('refresh_token');
    const report = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/newInvoice`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          clientId: client,
          project_id: project,
          amount,
          currencyType,
          description,
          startDate,
          endDate
        })
      }
    );
    const filePath = await report.json();
    const fileUrl = `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/reports/${filePath}`;
    console.log(filePath);
    setPdfUrl(fileUrl);
  };

  const sendToClient = async () => {
    const token = localStorage.getItem('refresh_token');
    if (project && pdfUrl) {
      const report = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/sendReport`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            project_id: project,
            pdfUrl,
            startDate,
            endDate
          })
        }
      );
    }
    setReFetch((prev) => !prev);
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
              <h1 className="text-2xl font-semibold text-gray-900">
                Documents & Reports
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all your reports in one place
              </p>
            </div>
            <div className="flex gap-3">
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
            </div>
          </div>

          <div className="gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="py-4 text-lg font-bold text-gray-600">
              New InVoice
            </div>
            <div className="flex gap-2 h-[40px] content-center">
              <div className="text-lg">Client:</div>
              <div className="px-4 ">
                <select
                  id="client"
                  name="client"
                  value={client}
                  required
                  className="bg-green-100 border rounded-md p-1"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setClient(val);
                  }}
                >
                  <option value={0}>Select Client</option>
                  {clients.map((client: TypeClient, index: number) => {
                    return (
                      <option key={index} value={client.id}>
                        {client.full_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex gap-2 h-[40px] content-center">
              <div className="text-lg">Project:</div>
              <div className="px-4 ">
                <select
                  id="project"
                  name="project"
                  value={project}
                  required
                  className="bg-green-300 border rounded-md p-1"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setProject(val);
                  }}
                >
                  <option value={0}>Select Project</option>
                  {isNonEmptyArray(projects) &&
                    projects.map((project: TypeProject, index: number) => {
                      return (
                        <option key={index} value={project.id}>
                          {project.title}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="flex content-center py-2">
              <div className="p-3 border-none border-gray-200">Amount:</div>
              <input
                type="text"
                placeholder="Enter your full name"
                value={amount}
                className="w-3/16 p-3 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <select
                id="project"
                name="project"
                value={currencyType}
                required
                className="bg-yellow-100 border rounded-r-md p-1"
                onChange={(e) => {
                  setCurrencyType(e.target.value);
                }}
              >
                <option value={'usd'}>USD</option>
                <option value={'gbp'}>GBP</option>
                <option value={'ghs'}>GHS</option>
              </select>
            </div>
            <div className="py-4 w-1/3">
              <textarea
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-1/3 flex justify-center gap-2">
              <div
                onClick={newReportHandle}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
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
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Send Invoice
              </div>
            </div>
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
                    {invoices?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 gap-4">
              <InvoiceTable data={invoices || []} />
            </div>
          </div>
          {pdfUrl && viewPreview && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[650px] max-h-[90vh] overflow-y-auto z-[101] transition-all duration-300">
              <iframe src={pdfUrl} width="100%" height="600px"></iframe>
              <div className=" flex gap-3 justify-end">
                <div
                  onClick={sendToClient}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-b-lg hover:bg-gray-50 transition-colors"
                >
                  Send to Client
                </div>
                <div
                  onClick={() => setViewPreview((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-b-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
