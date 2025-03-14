'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch
  } = useForm({
    defaultValues: {
      // Step 1: Client Information
      full_name: '',
      business_name: '',
      personal_address: '',
      business_address: '',
      position: '',
      email: '',
      phone: '',
      preferred_contact_method: '',
      timezone: '',

      // Step 2: Services & Goals
      services: {
        personalVA: false,
        businessVA: false,
        socialMedia: false,
        businessManagement: false,
        contentCreation: false,
        brandKit: false,
        legalVA: false,
        website: false,
        eventPlanning: false
      },
      other_services: '',
      deadlines: '',
      hours_needed: '',

      // Step 3: Tools and Access
      use_tools: '',
      need_access: 'no',
      tools_to_access: '',
      file_share_method: '',

      // Step 4: Communication Preferences
      update_frequency: '',
      update_method: '',
      stakeholders: '',

      // Step 5: Priorities
      priority_tasks: '',
      start_date: '',

      // Step 6: Billing & Agreements
      billing_method: '',
      billing_cycle: '',
      invoice_email: '',

      // Step 7: Emergency Contact & Agreement
      emergency_contact_name: '',
      emergency_phone: '',
      emergency_relationship: '',
      digital_sign: '',
      agreementDate: '',
      agree_to_terms: false,
      password: '',
      confpassword: ''
    }
  });

  const need_accessValue = watch('need_access');

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = async () => {
    const data = getValues();
    console.log(data);
    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    if (data.password !== data.confpassword) {
      toast.error('Password Does not Match!');
      return;
    }

    try {
      setLoading(true);

      // Submit form data to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/createClient`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
          },
          body: JSON.stringify(data)
        }
      );

      if (response.ok) {
        toast.success('Onboarding completed successfully!');
        // Redirect to appropriate dashboard based on role
        const role = localStorage.getItem('role');
        router.push('/user/login');
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || 'Failed to submit onboarding information'
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during onboarding');
    } finally {
      setLoading(false);
    }
  };

  // Progress indicator - Removed since we're using the new UI style
  const renderProgressBar = () => {
    return null; // Remove the old progress indicator
  };

  // Step 1: Client Information
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Client Information
          </h2>
          <p className="text-gray-600 mb-8">
            Please provide your basic contact information.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Full Name*
            </div>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('full_name', { required: 'Full name is required' })}
            />
            {errors.full_name && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.full_name.message}
              </div>
            )}
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Business Name
            </div>
            <input
              type="text"
              placeholder="Enter your business name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('business_name')}
            />
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Personal Address*
            </div>
            <textarea
              placeholder="Enter your address"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              rows={2}
              {...register('personal_address', {
                required: 'Personal address is required'
              })}
            ></textarea>
            {errors.personal_address && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.personal_address.message}
              </div>
            )}
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Business Address
            </div>
            <textarea
              placeholder="Enter your business address"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              rows={2}
              {...register('business_address')}
            ></textarea>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Position/Title*
            </div>
            <input
              type="text"
              placeholder="Enter your position or title"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('position', {
                required: 'Position/Title is required'
              })}
            />
            {errors.position && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.position.message}
              </div>
            )}
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Email Address*
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email'
                }
              })}
            />
            {errors.email && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Phone Number*
            </div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('phone', {
                required: 'Phone number is required'
              })}
            />
            {errors.phone && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.phone.message}
              </div>
            )}
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Preferred Contact Method
            </div>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('preferred_contact_method')}
            >
              <option value="">Select method</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="messaging">Messaging App</option>
            </select>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-medium">
              Timezone*
            </div>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('timezone', { required: 'Timezone is required' })}
            >
              <option value="">Select timezone</option>
              <option value="EST">Eastern Time (EST)</option>
              <option value="CST">Central Time (CST)</option>
              <option value="MST">Mountain Time (MST)</option>
              <option value="PST">Pacific Time (PST)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
              <option value="GMT">Greenwich Mean Time (GMT)</option>
            </select>
            {errors.timezone && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.timezone.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Step 2: Services & Goals
  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Services & Goals
          </h2>
          <p className="text-gray-600 mb-8">
            Select the services you need and tell us about your requirements.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Which services do you require? (Check all that apply)
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="personalVA"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.personalVA')}
                />
                <label htmlFor="personalVA" className="text-gray-700">
                  Virtual Assistant (Personal / Lifestyle)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="businessVA"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.businessVA')}
                />
                <label htmlFor="businessVA" className="text-gray-700">
                  Virtual Assistant (Business Admin)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="socialMedia"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.socialMedia')}
                />
                <label htmlFor="socialMedia" className="text-gray-700">
                  Social Media Management
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="businessManagement"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.businessManagement')}
                />
                <label htmlFor="businessManagement" className="text-gray-700">
                  Online Business Management
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="contentCreation"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.contentCreation')}
                />
                <label htmlFor="contentCreation" className="text-gray-700">
                  Content Creation (Videography / Photography)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="brandKit"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.brandKit')}
                />
                <label htmlFor="brandKit" className="text-gray-700">
                  Brand Kit (Logo etc)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="legalVA"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.legalVA')}
                />
                <label htmlFor="legalVA" className="text-gray-700">
                  Legal VA
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="website"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.website')}
                />
                <label htmlFor="website" className="text-gray-700">
                  Website Creation / Management
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="eventPlanning"
                  className="rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('services.eventPlanning')}
                />
                <label htmlFor="eventPlanning" className="text-gray-700">
                  Event Planning / Coordination
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Other (please specify)
            </div>
            <input
              type="text"
              placeholder="Specify other services needed"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('other_services')}
            />
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Do you have any upcoming deadlines or priorities we should be
              aware of?
            </div>
            <textarea
              placeholder="Enter any upcoming deadlines or priorities"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              rows={3}
              {...register('deadlines')}
            ></textarea>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              How many hours per week or month do you anticipate needing
              support?
            </div>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('hours_needed')}
            >
              <option value="">Select hours</option>
              <option value="1-5 hours per week">1-5 hours per week</option>
              <option value="5-10 hours per week">5-10 hours per week</option>
              <option value="10-20 hours per week">10-20 hours per week</option>
              <option value="20+ hours per week">20+ hours per week</option>
              <option value="Project-based">Project-based</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  // Step 3: Tools and Access
  const renderStep3 = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Tools and Access</h2>
        <p className="text-gray-600 mb-4">
          Tell us about the tools and platforms you use.
        </p>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            What tools/software/platforms do you currently use?
          </label>
          <textarea
            placeholder="E.g., Google Workspace, Slack, Asana, Canva, etc."
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            rows={3}
            {...register('use_tools')}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Do we need access to any specific tools or accounts?
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="accessNo"
                value="no"
                className="form-radio text-primary"
                {...register('need_access')}
              />
              <label htmlFor="accessNo" className="text-gray-700">
                No
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="accessYes"
                value="yes"
                className="form-radio text-primary"
                {...register('need_access')}
              />
              <label htmlFor="accessYes" className="text-gray-700">
                Yes
              </label>
            </div>
          </div>
        </div>

        {need_accessValue === 'yes' && (
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Please specify which tools:
            </label>
            <textarea
              placeholder="List the tools we'll need access to"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              rows={2}
              {...register('tools_to_access')}
            ></textarea>
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            What is your preferred file-sharing method?
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register('file_share_method')}
          >
            <option value="">Select method</option>
            <option value="Google Drive">Google Drive</option>
            <option value="Dropbox">Dropbox</option>
            <option value="OneDrive">OneDrive</option>
            {/* <option value="SharePoint">SharePoint</option> */}
            {/* <option value="Box">Box</option> */}
            {/* <option value="Email attachments">Email attachments</option> */}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    );
  };

  // Step 4: Communication Preferences
  const renderStep4 = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">
          Communication Preferences
        </h2>
        <p className="text-gray-600 mb-4">
          Let us know how you prefer to communicate.
        </p>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            How often would you like updates or check-ins?
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register('update_frequency')}
          >
            <option value="">Select update frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            What is your preferred method for receiving updates?
          </label>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register('update_method')}
          >
            <option value="">Select method</option>
            <option value="Email">Email</option>
            <option value="Video Call">Video Call</option>
            <option value="Messaging App">Messaging App</option>
            <option value="Project Management Tool">
              Project Management Tool
            </option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Who are the key stakeholders / team members we should keep in the
            loop?
          </label>
          <textarea
            placeholder="List names, roles, and contact information"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            rows={3}
            {...register('stakeholders')}
          ></textarea>
        </div>
      </div>
    );
  };

  // Step 5: Priorities
  const renderStep5 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Priorities
          </h2>
          <p className="text-gray-600 mb-8">
            Help us understand your immediate needs.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Are there any particular tasks you would like us to prioritize?
            </div>
            <textarea
              placeholder="Describe your priority tasks"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              rows={4}
              {...register('priority_tasks')}
            ></textarea>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              What is your onboarding timeline or ideal start date?
            </div>
            <input
              type="date"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('start_date')}
            />
          </div>
        </div>
      </div>
    );
  };

  // Step 6: Billing & Agreements
  const renderStep6 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Billing & Agreements
          </h2>
          <p className="text-gray-600 mb-8">Set up your billing preferences.</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Preferred Billing Method
            </div>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('billing_method')}
            >
              <option value="">Select method</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Billing Cycle Preference
            </div>
            <select
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('billing_cycle')}
            >
              <option value="">Select cycle</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Invoice Email Address (if different from above)
            </div>
            <input
              type="email"
              placeholder="Enter invoice email address (optional)"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('invoice_email', {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email'
                }
              })}
            />
            {errors.invoice_email && (
              <div className="mt-0.5 text-xs text-red-600">
                {errors.invoice_email.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Step 7: Emergency Contact & Agreement
  const renderStep7 = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Emergency Contact (Optional)
          </h2>
          <p className="text-gray-600 mb-8">
            Please provide emergency contact information and review the
            agreement.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Emergency Contact Name
            </div>
            <input
              type="text"
              placeholder="Enter emergency contact name"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('emergency_contact_name')}
            />
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Emergency Contact Phone
            </div>
            <input
              type="tel"
              placeholder="Enter emergency contact phone"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('emergency_phone')}
            />
          </div>

          <div>
            <div className="block text-gray-700 mb-2 font-semibold">
              Relationship to You/Your Business
            </div>
            <input
              type="text"
              placeholder="Enter relationship"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
              {...register('emergency_relationship')}
            />
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Agreement</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                By submitting this form, you agree to the terms and conditions
                of working with QPA Virtual Assistants and confirm that all
                provided information is accurate to the best of your knowledge.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="block text-gray-700 mb-2 font-semibold">
                  Digital Signature (Type Full Name)*
                </div>
                <input
                  type="text"
                  placeholder="Type your full name as signature"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                  {...register('digital_sign', {
                    required: 'Digital signature is required'
                  })}
                />
                {errors.digital_sign && (
                  <div className="mt-0.5 text-xs text-red-600">
                    {errors.digital_sign.message}
                  </div>
                )}
              </div>

              <div>
                <div className="block text-gray-700 mb-2 font-semibold">
                  Date*
                </div>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                  {...register('agreementDate', {
                    required: 'Date is required'
                  })}
                />
                {errors.agreementDate && (
                  <div className="mt-0.5 text-xs text-red-600">
                    {errors.agreementDate.message}
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className="mt-1 rounded text-[#84b894] focus:ring-[#84b894]"
                  {...register('agree_to_terms', {
                    required: 'You must agree to the terms and conditions'
                  })}
                />
                <label htmlFor="agreeTerms" className="text-gray-700">
                  I agree to the terms and conditions*
                </label>
              </div>
              <input
                type="text"
                placeholder="Set your Password"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                {...register('password', { required: "Password is Required" })}
              />
              {errors.password && (
                <div className="mt-0.5 text-xs text-red-600">
                  {errors.password.message}
                </div>
              )}
              <input
                type="text"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                {...register('confpassword', { required: "Password is Required" })}
              />
              {errors.confpassword && (
                <div className="mt-0.5 text-xs text-red-600">
                  {errors.confpassword.message}
                </div>
              )}
              {errors.agree_to_terms && (
                <div className="mt-0.5 text-xs text-red-600">
                  {errors.agree_to_terms.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      default:
        return renderStep1();
    }
  };

  // Navigation buttons
  const renderNavButtons = () => {
    return null; // Remove the old navigation buttons since we're handling them directly in the return
  };

  // Ensure rendering only happens on the client-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Image Side */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="sticky top-0 h-screen">
          <div className="relative h-full">
            <Image
              src="/images/loginImg.png"
              alt="QPA Virtual Assistants"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-br-[80px]"
            />

            {/* Base Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#84b894]/70 via-[#84b894]/50 to-[#a8cbb4]/30 rounded-br-[80px]" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-br-[80px]">
              <div className="absolute bottom-12 left-12 right-12">
                <h2 className="text-4xl font-semibold mb-4 text-white">
                  Getting Started
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Tell us about yourself and your needs so we can provide the
                  best possible service.
                </p>

                <div className="w-full bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-white transition-all duration-500 rounded-full"
                      style={{
                        width: `${(currentStep / totalSteps) * 100}%`
                      }}
                    />
                  </div>
                  <div className="mt-2 text-white/90 text-sm text-center">
                    Step {currentStep} of {totalSteps}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form Side */}
      <div className="w-full md:w-1/2 min-h-screen bg-white">
        <div className="px-8">
          <div className="w-full max-w-md mx-auto py-12">
            <div className="w-64 mb-12">
              <Image
                src="/images/logo.svg"
                width={100}
                height={100}
                alt="Logo"
                className="w-full"
              />
            </div>

            <ToastContainer />

            <form onSubmit={handleSubmit(onSubmit)}>
              {renderCurrentStep()}

              <div className="flex justify-between mt-8 mb-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#84b894] text-white rounded-lg hover:bg-[#6a9377] transition-colors flex items-center gap-2 ml-auto"
                  disabled={loading}
                >
                  {loading
                    ? 'Processing...'
                    : currentStep === totalSteps
                      ? 'Submit'
                      : 'Next'}
                  {!loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Need help?{' '}
              <Link href="/contact" className="text-[#84b894] hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
