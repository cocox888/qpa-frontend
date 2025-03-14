'use client';

import api from '@/app/api/customApi';
import Toast from '@/components/toast';
import type { TypeProject, TypeReport } from '@/lib/types';
import { ChangeEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../reducers/store';

export default function Notes() {
  const [totalReports, setTotalReports] = useState<TypeReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [viewPreview, setViewPreview] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    api
      .get('/client/getAllReports')
      .then((res) => {
        console.log(res.data);
        setTotalReports(res.data);
      })
      .catch((e) => {
        Toast('error', e);
      });
  }, []);

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
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Reports
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {totalReports.length}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main Content Area --> */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* <!-- More Note Cards --> */}
              {totalReports.length > 0 ? (
                totalReports.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border cursor-pointer border-gray-100 rounded-xl hover:shadow-lg transition-all"
                    onClick={() => {
                      setPdfUrl(item.file_name || '');
                      setViewPreview((prev) => !prev);
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-purple-500"
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
                      <div className="flex-1 truncate">
                        <div className="flex justify-between items-start ">
                          <div className="w-3/4">
                            <h3 className="font-medium text-gray-900 ">
                              {item.project_name}
                              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max px-2 py-1 text-xs text-white bg-gray-800 rounded">
                                Your tooltip text here
                              </span>
                            </h3>
                            <div className="flex gap-3">
                              <p className="text-sm text-gray-500">
                                {item.project_type}
                              </p>
                              <p className="text-black">
                                {item.start_date} ~ {item.end_date}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              {item.client_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex col-span-3 justify-center items-center w-full py-10 text-gray-500">
                  No Uploaded Files
                </div>
              )}
            </div>
          </div>
          {pdfUrl && viewPreview && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 w-[650px] max-h-[90vh] overflow-y-auto z-[101] transition-all duration-300">
              <iframe src={pdfUrl} width="100%" height="600px" />
              <div className=" flex gap-3 justify-end">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-b-lg hover:bg-gray-50 transition-colors">
                  Go To Pay
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
