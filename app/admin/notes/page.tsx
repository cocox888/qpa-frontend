'use client';

import api from "@/app/api/customApi";
import apiForFile from "@/app/api/customApiForFile";
import Toast from "@/components/toast";
import { TypeDocument } from "@/lib/types";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from "react-toastify";
import { fileSizeFormat } from "@/lib/utils/fileUtils";


export default function Notes() {

  const [totalDocuments, setTotalDocuments] = useState<TypeDocument[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/getAllUploads').then((res) => {
      console.log(res.data);
      setTotalDocuments(res.data)
    }).catch((e) => {
      Toast('error', e);
    })
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file)
    if (file) {
      setLoading(true);
      const formData = new FormData();
      const userId = localStorage.getItem("userId");

      const payload = {
        user_id: Number(userId),
        title: file.name,
        upload_time: (new Date()).toISOString().split('T')[0].replace(/^(\d{4}-\d{2}-)(\d{1,2})$/, '$1$2'),
        badge: 'important',
        file_format: file.name.split('.')[1].toUpperCase(),
        file_size: Math.floor((file.size / 1024)),
        file_path: ""
      }

      formData.append('file', file);
      formData.append('extraData', JSON.stringify(payload));

      apiForFile.post('/upload', formData).then((res) => {
        console.log(res.data)
        setTotalDocuments(res.data);
        Toast('success', 'File Upload Completed')
      }).catch((e) => {
        Toast('error', 'File Upload Failed')
      }).finally(() => {
        setLoading(false);
      })

    } else {
      console.error('No file selected');
    }
  }

  const handleDownload = async (filename: string) => {
    console.log(filename)
    const role = localStorage.getItem("role");
    api.get(`/${role}/download/${filename}`, { responseType: 'blob' }).then( (response) => {
      console.log(response.data)
      const blob:Blob = response.data
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Clean up by removing the link element
    }).catch(() => {

    });

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
                Documents & Notes
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all your documents and notes in one place
              </p>
            </div>
            <div className="flex gap-3">
              {/* <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
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
              New Note
            </div> */}
              {/* <div className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              <input type="file" accept=".pdf, .docx" className=""/>
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
              Upload Document
            </div> */}

              <label htmlFor="file-upload" className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
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
                Click to Upload File
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} accept=".doc,.pdf,.docx" />
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
                    Total Documents
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">{totalDocuments.length}</h3>
                </div>
              </div>
            </div>

            {/* <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Notes
                </p>
                <h3 className="text-xl font-bold text-gray-900">45</h3>
              </div>
            </div>
          </div>

          <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
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
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Shared Files
                </p>
                <h3 className="text-xl font-bold text-gray-900">67</h3>
              </div>
            </div>
          </div>

          <div className="stats-card gradient-border card-shine p-4 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Recent Changes
                </p>
                <h3 className="text-xl font-bold text-gray-900">28</h3>
              </div>
            </div>
          </div> */}
          </div>

          {/* <!-- Main Content Area --> */}
          <div className="bg-white rounded-xl border border-gray-100">
            {/* <!-- Filters Bar --> */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 text-sm font-medium rounded-lg text-brand-500 bg-brand-50">
                    All Files
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                      {totalDocuments.length}
                    </span>
                  </div>
                  <div className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">
                    Documents
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                      {totalDocuments.length}
                    </span>
                  </div>
                  {/* <div className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">
                    Notes
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                      45
                    </span>
                  </div>
                  <div className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50">
                    Shared
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                      67
                    </span>
                  </div> */}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search files..."
                      className="w-64 h-10 pl-10 pr-4 text-sm bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-500/20"
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filters
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Documents Grid --> */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* <!-- Document Card --> */}
              {/* <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
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
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      Project Requirements.docx
                    </h3>
                    <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                        <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <!-- More Note Cards --> */}
              {
                totalDocuments.length > 0 ? (
                  totalDocuments.map((item, index) => (
                    <div className="p-4 border cursor-pointer border-gray-100 rounded-xl hover:shadow-lg transition-all"
                      onClick={() => handleDownload(item.file_path || "")}>
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
                                {item.title}
                                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-max px-2 py-1 text-xs text-white bg-gray-800 rounded">
                                  Your tooltip text here
                                </span>
                              </h3>
                              <p className="text-sm text-gray-500">{item.upload_time}</p>
                            </div>
                            {item.badge == "important" && (<span className="px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-600 rounded-lg">
                              Important
                            </span>)}
                            {item.badge == 'confidential' && (<span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-lg">
                              Confidential
                            </span>)}
                            {item.badge == "none" && (<></>)}

                          </div>
                          <div className="mt-3 flex items-center gap-4">
                            <span className="text-xs text-gray-500">{fileSizeFormat(Number(item.file_size))}</span>
                            <span className="text-xs text-gray-500">{item.file_format} Document</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))

                ) : (
                  <div className="flex col-span-3 justify-center items-center w-full py-10 text-gray-500">No Uploaded Files</div>
                )
              }
              {/* <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Sprint Planning Notes
                        </h3>
                        <p className="text-sm text-gray-500">
                          Updated 3 days ago
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-600 rounded-lg">
                        Important
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-500">
                          Shared with team
                        </span>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <!-- Document Card --> */}


              {/* <!-- Shared Document Card --> */}
              {/* <div className="p-4 border border-gray-100 rounded-xl hover:shadow-lg transition-all">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
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
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Design System Guidelines
                        </h3>
                        <p className="text-sm text-gray-500">
                          Last edited by Sarah
                        </p>
                      </div>
                      <div className="flex -space-x-2">
                        <img className="w-6 h-6 rounded-full border-2 border-white"
                                                src="/api/placeholder/24/24" alt="User 1" />
                        <img
                          className="w-6 h-6 rounded-full border-2 border-white"
                          src="/images/person1.jpg"
                          alt="User 2"
                        />
                        <img
                          className="w-6 h-6 rounded-full border-2 border-white"
                          src="/images/person1.jpg"
                          alt="User 2"
                        />
                        <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-500">+3</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-xs text-gray-500">
                          Viewed by 28 people
                        </span>
                      </div>
                      <div className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <!-- Load More Button --> */}
              {/* <div className="col-span-full flex justify-center py-4">
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Load More
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )
      }

    </div >
  );
}
