'use client';
import { useEffect, useRef, useState } from 'react';

import type { TypeProject } from '@/lib/types';
import Toast from '../toast';
import { ToastContainer } from 'react-toastify';
import type { ClientProps, UserProps } from '@/app/admin/projects/page';
import { AppDispatch } from '@/app/admin/reducers/store';
import { useDispatch } from 'react-redux';
import { getAllProjects } from '@/app/admin/reducers/projects';
export interface ProjectModalProps {
  closeEvent: () => void;
  clients: ClientProps[];
  users: UserProps[];
}

const ProjectCreateModal: React.FC<ProjectModalProps> = ({
  closeEvent,
  clients,
  users
}) => {
  const dispatch:AppDispatch= useDispatch()

  const progressBar = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const [packageType, setPackageType] = useState('');
  const [packageTypeError, setPackageTypeError] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [projectNameError, setProjectNameError] = useState(false);

  const [client, setClient] = useState(0);
  const [clientError, setClientError] = useState(false);

  // for VA package
  const [startDate, setStartDate] = useState('');
  const [startDateError, setStartDateError] = useState(false);

  const [monthlyHours, setMonthlyHours] = useState<number>();
  const [monthlyHoursError, setMonthlyHoursError] = useState(false);

  const [rate, setRate] = useState<number>();
  const [rateError, setRateError] = useState(false);

  const [enableRollover, setEnableRollover] = useState(false);

  //for SMM package
  const [startDate1, setStartDate1] = useState('');
  const [startDateError1, setStartDateError1] = useState(false);

  const [platform, setPlatform] = useState<string[]>([]);
  const [platformError, setPlatformError] = useState(false);

  const [duration, setDuration] = useState('');
  const [durationError, setDurationError] = useState(false);

  const [packageLevel, setPackageLevel] = useState('');
  const [packageLevelError, setPackageLevelError] = useState(false);

  //for OBM package
  const [monthlyHours1, setMonthlyHours1] = useState<number>();
  const [monthlyHoursError1, setMonthlyHoursError1] = useState(false);

  const [rate1, setRate1] = useState<number>();
  const [rateError1, setRateError1] = useState(false);

  const [service, setService] = useState<string[]>([]);
  const [serviceError, setServiceError] = useState(false);

  const [startDate2, setStartDate2] = useState('');
  const [startDateError2, setStartDateError2] = useState(false);

  //for WDS package
  const [duration1, setDuration1] = useState('');
  const [durationError1, setDurationError1] = useState(false);

  const [startDate3, setStartDate3] = useState('');
  const [startDateError3, setStartDateError3] = useState(false);

  const [tech, setTech] = useState<string[]>([]);
  const [techError, setTechError] = useState(false);

  const [projectType, setProjectType] = useState('');
  const [projectTypeError, setProjectTypeError] = useState(false);
  //for THIRD step
  const [members, setMembers] = useState<number[]>([]);
  const [membersError, setMembersError] = useState(false);

  const [portalAccess, setPortalAccess] = useState(false);

  const [portals, setPortals] = useState<string[]>([]);
  const [additional, setAdditional] = useState<string[]>([]);

  useEffect(() => {
    const updateProgress = () => {
      if (progressBar.current) {
        if (step === 0) {
          progressBar.current.style.width = '0%';
        } else if (step === 1) {
          progressBar.current.style.width = '50%';
        } else if (step === 2) {
          progressBar.current.style.width = '100%';
        }
      }
    };
    updateProgress();
  }, [step]);




  const createProject = async () => {
    if (validation()) {
      try {
        let data: TypeProject = {
          title: projectName,
          clientId: client,
          package_type: packageType,
          start_date:
            packageType === 'va'
              ? startDate
              : packageType === 'obm'
                ? startDate2
                : packageType === 'smm'
                  ? startDate1
                  : startDate3,
          additional_setting: additional.join(','),
          portal_access: portals.join(','),
          projectTimeTrack: [],
          state: 'In Progress'
        };

        switch (packageType) {
          case 'va':
            data = {
              ...data,
              monthly_hours: monthlyHours || 0,
              rate: rate,
              rollover: enableRollover
            };
            break;
          case 'obm':
            data = {
              ...data,
              monthly_hours: monthlyHours1,
              rate: rate1,
              services: service.join(',')
            };
            break;
          case 'smm':
            data = {
              ...data,
              platforms: platform.join(','),
              duration: duration,
              package_level: packageLevel
            };
            break;
          case 'wds':
            data = {
              ...data,
              project_type: projectType,
              duration: duration1,
              technology: tech.join(',')
            };
            break;
        }

        const payload = {
          data: data,
          users: members
        };

        const token = localStorage.getItem('refresh_token');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/createProject`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ...payload })
          }
        );
        const project = await response.json();
        Toast('success', `${project.Project.title} Created Successfully.`);
        dispatch(getAllProjects());
        closeEvent();
      } catch (error) {
        console.log(error);
        Toast('error', 'Server error');
      }
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = e.target;
    if (checked) {
      setPlatform((prev) => [...prev, value]);
    } else {
      setPlatform((prev) =>
        prev.filter((platform: string) => platform !== value)
      );
    }
    console.log(platformError);
  };

  const handleCheckboxChange1 = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = e.target;
    if (checked) {
      setTech((prev) => [...prev, value]);
    } else {
      setTech((prev) => prev.filter((platform: string) => platform !== value));
    }
  };

  const handleCheckboxChange2 = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = e.target;
    if (checked) {
      setService((prev) => [...prev, value]);
    } else {
      setService((prev) =>
        prev.filter((platform: string) => platform !== value)
      );
    }
  };

  const handleCheckboxChange3 = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Number(e.target.value);
    const checked = e.target.checked;

    if (checked) {
      setMembers((prev) => [...prev, value]);
    } else {
      setMembers((prev) => prev.filter((platform) => platform !== value));
    }
  };

  const handleCheckboxChange4 = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = e.target;
    if (checked) {
      setPortals((prev) => [...prev, value]);
    } else {
      setPortals((prev) =>
        prev.filter((platform: string) => platform !== value)
      );
    }
  };
  const handleCheckboxChange5 = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value, checked } = e.target;
    if (checked) {
      setAdditional((prev) => [...prev, value]);
    } else {
      setAdditional((prev) =>
        prev.filter((platform: string) => platform !== value)
      );
    }
  };

  const handleContinue = () => {
    if (step + 1 === 3) {
    } else {
      const valid = validation();
      console.log(packageType);
      if (valid) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step - 1 < 0) {
    } else {
      setStep(step - 1);
    }
  };

  const validationPackage = () => {
    if (packageType === 'va') {
      if (monthlyHours) {
        setMonthlyHoursError(false);
      } else {
        setMonthlyHoursError(true);
      }

      if (rate) {
        setRateError(false);
      } else {
        setRateError(true);
      }

      if (startDate) {
        setStartDateError(false);
      } else {
        setStartDateError(true);
      }

      if (!monthlyHours || !rate || !startDate) {
        return false;
      }
      return true;
    }
    if (packageType === 'obm') {
      if (monthlyHours1) {
        setMonthlyHoursError1(false);
      } else {
        setMonthlyHoursError1(true);
      }

      if (rate1) {
        setRateError1(false);
      } else {
        setRateError1(true);
      }

      if (startDate2) {
        setStartDateError2(false);
      } else {
        setStartDateError2(true);
      }

      if (service.length !== 0) {
        setServiceError(false);
      } else {
        setServiceError(true);
      }

      if (!monthlyHours1 || !rate1 || !startDate2 || service.length === 0) {
        return false;
      }
      return true;
    }
    if (packageType === 'smm') {
      if (startDate1) {
        setStartDateError1(false);
      } else {
        setStartDateError1(true);
      }

      if (duration) {
        setDurationError(false);
      } else {
        setDurationError(true);
      }

      if (packageLevel) {
        setPackageLevelError(false);
      } else {
        setPackageLevelError(true);
      }

      if (platform.length !== 0) {
        setPlatformError(false);
      } else {
        setPlatformError(true);
      }

      if (!startDate1 || !duration || !packageLevel || platform.length === 0) {
        return false;
      }
      return true;
    }
    if (startDate3) {
      setStartDateError3(false);
    } else {
      setStartDateError3(true);
    }

    if (duration1) {
      setDurationError1(false);
    } else {
      setDurationError1(true);
    }

    if (projectType) {
      setProjectTypeError(false);
    } else {
      setProjectTypeError(true);
    }

    if (tech.length !== 0) {
      setTechError(false);
    } else {
      setTechError(true);
    }

    if (!startDate3 || !duration1 || !projectType || tech.length === 0) {
      return false;
    }
    return true;
  };

  const validation = () => {
    if (step === 0) {
      if (projectName) {
        setProjectNameError(false);
      } else {
        setProjectNameError(true);
      }

      if (client === 0) {
        setClientError(true);
      } else {
        setClientError(false);
      }

      if (packageType === '') {
        setPackageTypeError(true);
      } else {
        setPackageTypeError(false);
      }

      if (!projectName || client === 0 || packageType === '') {
        return false;
      }
      return true;
    }
    if (step === 1) {
      if (validationPackage()) {
        return true;
      }
      return false;
    }
    if (members.length === 0) {
      setMembersError(true);
      return false;
    }
    setMembersError(false);
    return true;
  };

  return (
    <div>
      <ToastContainer />
      <div
        id="projectModal"
        className="active fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 modal bg-white rounded-xl shadow-lg w-[800px] max-h-[90vh] overflow-y-auto z-50"
      >
        <form id="newProjectForm" className="relative">
          {/* <!-- Header --> */}
          <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Project
              </h2>
              <button
                type="button"
                onClick={closeEvent}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Progress Steps --> */}
            <div className="px-6 mt-6">
              {/* <!-- Container for steps --> */}
              <div className="relative flex justify-between">
                {/* <!-- Main progress bar background --> */}
                <div className="absolute top-[22px] left-0 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  {/* <!-- Animated progress fill with primary green --> */}
                  <div
                    ref={progressBar}
                    className="relative h-full w-0 bg-primary transition-all duration-500 ease-in-out"
                  >
                    {/* <!-- Shine effect overlay --> */}
                    <div className="shine-effect absolute inset-0" />
                  </div>
                </div>

                {/* <!-- Steps with green active state --> */}
                <div className="relative flex flex-col items-center z-10 group">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform hover:-translate-y-0.5">
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-900">
                      Basic Details
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-col items-center z-10 group">
                  <div
                    className={`w-12 h-12 rounded-xl ${step > 0
                        ? 'bg-primary shadow-green-500/30'
                        : 'bg-gray-100 '
                      }  flex items-center justify-center transition-transform hover:-translate-y-0.5`}
                  >
                    <span
                      className={`${step > 0 ? 'text-white ' : ' text-gray-400'
                        } font-medium`}
                    >
                      2
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <span
                      className={`text-sm  ${step > 0
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-400 font-medium'
                        }`}
                    >
                      Package Details
                    </span>
                  </div>
                </div>

                <div className="relative flex flex-col items-center z-10 group">
                  <div
                    className={`w-12 h-12 rounded-xl ${step > 1
                        ? 'bg-primary shadow-green-500/30'
                        : 'bg-gray-100 '
                      }  flex items-center justify-center transition-transform hover:-translate-y-0.5`}
                  >
                    <span
                      className={`${step > 1 ? 'text-white ' : ' text-gray-400'
                        } font-medium`}
                    >
                      3
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <span
                      className={`text-sm  ${step > 1
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-400 font-medium'
                        }`}
                    >
                      Team Setup
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {step === 0 && (
            <div className="step step-1 active">
              <div className="p-6 space-y-6">
                {/* <!-- Project Name --> */}
                <div>
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={projectName}
                    required
                    className={`${projectNameError ? 'border-red-500' : ''
                      } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                    placeholder="Enter project name"
                    onChange={(e) => {
                      setProjectName(e.target.value);
                      console.log(projectName);
                    }}
                  />
                  {projectNameError ? (
                    <div className="active error-message text-sm text-red-500 mt-1">
                      Project name is required
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* <!-- Client Selection --> */}
                <div>
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="client"
                    name="client"
                    value={client}
                    required
                    className={`${clientError ? 'border-red-500' : ''
                      } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setClient(val);
                    }}
                  >
                    <option value={0}>Select Client</option>
                    {clients.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.full_name}
                        </option>
                      );
                    })}
                  </select>
                  {clientError ? (
                    <div className="active error-message text-sm text-red-500 mt-1">
                      Please select a client
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* <!-- Package Type Selection --> */}
                <div>
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Package Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* <!-- Hourly Packages --> */}
                    <div className="space-y-3">
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-500">
                        Hourly Packages
                      </label>
                      <div className="relative">
                        <input
                          type="radio"
                          name="package"
                          value="va"
                          id="va-package"
                          className="peer hidden"
                          onChange={(e) => setPackageType(e.target.value)}
                          checked={packageType === 'va'}
                        />
                        <label
                          htmlFor="va-package"
                          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-checked:border-brand-500 peer-checked:bg-brand-50 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden={true}
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
                            <div className="font-medium text-gray-900">
                              VA Package
                            </div>
                            <div className="text-xs text-gray-500">
                              Virtual Assistant Services
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          name="package"
                          value="obm"
                          id="obm-package"
                          className="peer hidden"
                          onChange={(e) => setPackageType(e.target.value)}
                          checked={packageType === 'obm'}
                        />
                        <label
                          htmlFor="obm-package"
                          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-checked:border-brand-500 peer-checked:bg-brand-50 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-indigo-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden={true}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              OBM Package
                            </div>
                            <div className="text-xs text-gray-500">
                              Online Business Management
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* <!-- Fixed Price Packages --> */}
                    <div className="space-y-3">
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-500">
                        Fixed Price Packages
                      </label>
                      <div className="relative">
                        <input
                          type="radio"
                          name="package"
                          value="smm"
                          id="smm-package"
                          className="peer hidden"
                          onChange={(e) => setPackageType(e.target.value)}
                          checked={packageType === 'smm'}
                        />
                        <label
                          htmlFor="smm-package"
                          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-checked:border-brand-500 peer-checked:bg-brand-50 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-purple-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden={true}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              SMM Package
                            </div>
                            <div className="text-xs text-gray-500">
                              Social Media Management
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          name="package"
                          value="wds"
                          id="wds-package"
                          className="peer hidden"
                          onChange={(e) => setPackageType(e.target.value)}
                          checked={packageType === 'wds'}
                        />
                        <label
                          htmlFor="wds-package"
                          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-checked:border-brand-500 peer-checked:bg-brand-50 transition-all"
                        >
                          <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-rose-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden={true}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              WDS Package
                            </div>
                            <div className="text-xs text-gray-500">
                              Web Development Service
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  {packageTypeError ? (
                    <div className="active error-message text-sm text-red-500 mt-2">
                      Please select a package type
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="step step-2 active">
              {/* <!-- VA Package Form --> */}
              {packageType === 'va' ? (
                <div className="p-6 space-y-6 active">
                  <h3 className="text-lg font-medium text-gray-900">
                    VA Package Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Hours
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="monthlyHours"
                        name="monthlyHours"
                        min="1"
                        className={`${monthlyHoursError ? 'border-red-500' : ' '
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        placeholder="Enter hours"
                        value={monthlyHours}
                        onChange={(e) => {
                          setMonthlyHours(Number(e.target.value));
                        }}
                      />
                      {monthlyHoursError ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please enter valid monthly hours
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rate per Hour ($)
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        min="1"
                        step="0.01"
                        className={`${rateError ? 'border-red-500' : ' '
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        placeholder="Enter rate"
                        value={rate}
                        onChange={(e) => {
                          setRate(Number(e.target.value));
                        }}
                      />
                      {rateError ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please enter valid hourly rate
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="vaStartDate"
                      name="startDate"
                      className={`${startDateError ? 'border-red-500' : ''
                        } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                      value={startDate}
                    />
                    {startDateError ? (
                      <div className="active error-message text-sm text-red-500 mt-1">
                        Please select a start date
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableRollover"
                      name="enableRollover"
                      className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      checked={enableRollover}
                      onChange={(e) => {
                        setEnableRollover(e.target.checked);
                      }}
                    />
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="text-sm text-gray-700">
                      Enable hours rollover to next month
                    </label>
                  </div>
                </div>
              ) : packageType == 'smm' ? (
                <div className="p-6 space-y-6 active">
                  <h3 className="text-lg font-medium text-gray-900">
                    Social Media Package Details
                  </h3>
                  <div>
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platforms <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {['instagram', 'facebook', 'linkedin', 'twitter'].map(
                        (plat) => (
                          <label key={plat} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="platforms[]"
                              value={plat}
                              onChange={handleCheckboxChange}
                              className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                              checked={platform.includes(plat)}
                            />
                            <span className="text-sm text-gray-700">
                              {plat.charAt(0).toUpperCase() + plat.slice(1)}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                    {platformError ? (
                      <div className="active error-message text-sm text-red-500 mt-1">
                        Please select at least one platform
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="smmStartDate"
                        name="startDate"
                        value={startDate1}
                        className={`${startDateError1 ? 'border-red-500' : ''
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        onChange={(e) => {
                          setStartDate1(e.target.value);
                        }}
                      />
                      {startDateError1 ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please select a start date
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="smmDuration"
                        name="duration"
                        className={`${durationError ? 'border-red-500' : ''
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        value={duration}
                        onChange={(e) => {
                          setDuration(e.target.value);
                        }}
                      >
                        <option value="">Select duration</option>
                        <option value="m3">3 months</option>
                        <option value="m6">6 months</option>
                        <option value="m12">12 months</option>
                      </select>
                      {durationError ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please select a duration
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                  <div>
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Level
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="smmPackageLevel"
                      name="packageLevel"
                      className={`${packageLevelError ? 'border-red-500' : ''
                        } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                      onChange={(e) => {
                        setPackageLevel(e.target.value);
                      }}
                      value={packageLevel}
                    >
                      <option value="">Select package level</option>
                      <option value="basic">Basic - 3 posts/week</option>
                      <option value="standard">Standard - 5 posts/week</option>
                      <option value="premium">Premium - 7 posts/week</option>
                    </select>
                    {packageLevelError ? (
                      <div className="active error-message text-sm text-red-500 mt-1">
                        Please select a package level
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : packageType == 'wds' ? (
                <div className="p-6 space-y-6 active">
                  <h3 className="text-lg font-medium text-gray-900">
                    Web Development Package Details
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className={`${projectTypeError ? 'border-red-500' : ''
                        } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                      onChange={(e) => {
                        setProjectType(e.target.value);
                      }}
                      value={projectType}
                    >
                      <option value="">Select project type</option>
                      <option value="website">New Website</option>
                      <option value="redesign">Redesign</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="ecommerce">E-commerce Development</option>
                    </select>
                    {projectTypeError ? (
                      <div className="active error-message text-sm text-red-500 mt-1">
                        Please select a project type
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="wdsStartDate"
                        name="wdsStartDate"
                        className={`${startDateError3 ? 'border-red-500' : ''
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        onChange={(e) => {
                          setStartDate3(e.target.value);
                        }}
                        value={startDate3}
                      />
                      {startDateError3 ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please select a start date
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Duration
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="wdsDuration"
                        name="wdsDuration"
                        value={duration1}
                        onChange={(e) => {
                          setDuration1(e.target.value);
                        }}
                        className={`${durationError1 ? 'border-red-500' : ''
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                      >
                        <option value="">Select duration</option>
                        <option value="w2">2 weeks</option>
                        <option value="m1">1 month</option>
                        <option value="m2">2 months</option>
                        <option value="m3">3 months</option>
                        <option value="custom">Custom</option>
                      </select>
                      {durationError1 ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please select expected duration
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div>
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technologies <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        'WordPress',
                        'Custom PHP',
                        'React',
                        'Node.js',
                        'Laravel',
                        'Other'
                      ].map((plat) => (
                        <label
                          key={plat}
                          className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="technologies[]"
                            value={plat}
                            onChange={handleCheckboxChange1}
                            className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                            checked={tech.includes(plat)}
                          />
                          <span className="text-sm text-gray-700">{plat}</span>
                        </label>
                      ))}
                    </div>
                    {techError ? (
                      <div className="active error-message text-sm text-red-500 mt-2">
                        Please select at least one technology
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-6 active">
                  <h3 className="text-lg font-medium text-gray-900">
                    OBM Package Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Hours
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="obmMonthlyHours"
                        name="monthlyHours"
                        min="1"
                        className={`${monthlyHoursError1 ? 'border-red-500' : ''
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        placeholder="Enter hours"
                        value={monthlyHours1}
                        onChange={(e) => {
                          setMonthlyHours1(Number(e.target.value));
                        }}
                      />
                      {monthlyHoursError1 ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please enter valid monthly hours
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rate per Hour ($){' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="obmHourlyRate"
                        name="hourlyRate"
                        min="1"
                        step="0.01"
                        className={`${rateError1 ? 'border-red-500' : ''
                          } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                        placeholder="Enter rate"
                        value={rate1}
                        onChange={(e) => {
                          setRate1(Number(e.target.value));
                        }}
                      />
                      {rateError1 ? (
                        <div className="active error-message text-sm text-red-500 mt-1">
                          Please enter valid hourly rate
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                  <div>
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="obmStartDate"
                      name="startDate"
                      value={startDate2}
                      onChange={(e) => {
                        setStartDate2(e.target.value);
                      }}
                      className={`${startDateError2 ? 'border-red-500' : ''
                        } w-full h-10 px-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors`}
                    />
                    {startDateError2 ? (
                      <div className="active error-message text-sm text-red-500 mt-1">
                        Please select a start date
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div>
                    {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services Required
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Project Management',
                        'Team Management',
                        'Process Optimization',
                        'System Implementation'
                      ].map((plat) => (
                        <label
                          key={plat}
                          className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="obmServices[]"
                            value={plat}
                            onChange={handleCheckboxChange2}
                            className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                            checked={service.includes(plat)}
                          />
                          <span className="text-sm text-gray-700">{plat}</span>
                        </label>
                      ))}
                    </div>
                    {serviceError ? (
                      <div className="active error-message text-sm text-red-500 mt-2">
                        Please select at least one service
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="step step-3 active">
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Team Assignment & Portal Setup
                </h3>

                {/* <!-- Team Members --> */}
                <div>
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Team Members <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {users.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src="/images/person1.jpg"
                          alt="Sarah Wilson"
                          className="w-8 h-8 rounded-lg"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.position}
                          </div>
                        </div>
                        <label className="flex items-center gap-2 ml-auto">
                          <input
                            type="checkbox"
                            name="teamMembers[]"
                            value={user.id}
                            checked={members.includes(user.id || -1)}
                            onChange={handleCheckboxChange3}
                            className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                          />
                          <span className="text-sm text-gray-700">Assign</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {membersError ? (
                    <div className="active error-message text-sm text-red-500 mt-2">
                      Please assign at least one team member
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* <!-- Client Portal Setup --> */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Client Portal Access
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Enable client access to project updates and files
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="enablePortal"
                        className="sr-only peer"
                        id="portalToggle"
                        checked={portalAccess}
                        onChange={(e) => {
                          setPortalAccess(e.target.checked);
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-brand-500/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500" />
                    </label>
                  </div>
                  {portalAccess ? (
                    <div className="space-y-3 active" id="portalOptions">
                      {[
                        'Time tracking visibility',
                        'File sharing',
                        'Progress reports',
                        'Direct messaging'
                      ].map((plat) => (
                        <label
                          key={plat}
                          className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="portalFeatures[]"
                            value={plat}
                            onChange={handleCheckboxChange4}
                            className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                            checked={portals.includes(plat)}
                          />
                          <span className="text-sm text-gray-700">{plat}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>

                {/* <!-- Additional Settings --> */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Additional Settings
                  </h4>
                  <div className="space-y-3">
                    {[
                      'Send welcome email to client',
                      'Schedule kickoff meeting',
                      'Create Slack channel'
                    ].map((plat) => (
                      <label key={plat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="portalFeatures[]"
                          value={plat}
                          onChange={handleCheckboxChange5}
                          className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                          checked={additional.includes(plat)}
                        />
                        <span className="text-sm text-gray-700">{plat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
            <div className="flex items-center justify-end gap-3">
              {/* <!-- Left side - Back button --> */}
              {step > 0 ? (
                <div className="mr-auto">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                  >
                    Back
                  </button>
                </div>
              ) : (
                <></>
              )}

              {/* <!-- Right side - Action buttons --> */}
              <button
                type="button"
                onClick={closeEvent}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
              >
                Cancel
              </button>
              {step === 2 ? (
                <button
                  type="button"
                  onClick={createProject}
                  className="items-center px-5 py-2 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                >
                  Create Project
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-brand-500 border border-transparent rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreateModal;
