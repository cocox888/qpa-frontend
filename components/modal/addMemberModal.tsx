import type { TypeUser } from '@/lib/types';
import { type ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Toast from '../toast';
import api from '@/app/api/customApi';

interface AddMemberModalProps {
  closeModal: (params: boolean) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ closeModal }) => {
  const token = localStorage.getItem('access_token');
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, formState: { errors }, handleSubmit, getValues } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      full_name: '',
      sex: '',
      email: '',
      password: '',
      phone: '',
      position: '',
      role: '',
      avatar: '',
      dob: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      status: '',
      ref_token: ''
    }
  });

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      let data = getValues();
      data.full_name = `${data.first_name} ${data.last_name}`;
      data.password = password;
      const role = localStorage.getItem('role')
      api.post(`/${role}/createMembers`, data).then(() => {
        Toast('success', 'User Created Successfully.');
        closeModal(false);
      }).catch((e) => {
        Toast('error', String(e));
      })
    }
  };


  return (
    <div>
      <ToastContainer />
      <div id="addMemberModal" className="fixed inset-0 z-50 active">
        {/* <!-- Improved Backdrop with more blur --> */}
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => closeModal(false)}
        />

        {/* <!-- Modal Content --> */}
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl">
            {/* <!-- Enhanced Header with gradient background --> */}
            <div className="p-6 sticky top-0 bg-white z-10 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Add New Team Member
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in the information below to create a new team member
                  </p>
                </div>
                <button
                  onClick={() => closeModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
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
            </div>

            {/* <!-- Modal Body with sections --> */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* <!-- Personal Information Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <!-- First Name --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        {...register('first_name', { required: "First Name is required" })}
                      />
                      {
                        errors.first_name && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.first_name.message}
                          </div>
                        )
                      }
                    </div>

                    {/* <!-- Last Name --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"

                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        {...register('last_name', { required: 'Last Name is required' })}
                      />
                      {
                        errors.last_name && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.last_name.message}
                          </div>
                        )
                      }
                    </div>

                    {/* <!-- Email --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        {...register('email', { required: 'Email is required' })}
                      />
                      {
                        errors.email && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.email.message}
                          </div>
                        )
                      }
                    </div>

                    {/* <!-- Phone --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"

                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        {...register('phone', { required: 'Phone is required' })}
                      />
                      {
                        errors.phone && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.phone.message}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>

                {/* <!-- Account Settings Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Account Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <!-- Password --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        minLength={8}
                        value={String(password)}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 8 characters
                      </p>
                    </div>

                    {/* <!-- Confirm Password --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {passwordError ? (
                        <p className="text-xs text-red-500 mt-1">
                          Minimum 8 characters
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"

                        placeholder="e.g. Product Manager, Frontend Developer"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        {...register('position', { required: 'Position is required' })}
                      />
                      {
                        errors.position && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.position.message}
                          </div>
                        )
                      }
                    </div>

                    {/* <!-- Role with enhanced select --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow appearance-none bg-white"
                          {...register('role', { required: 'Role is required' })}
                        >
                          {/* <option value="">Select Role</option> */}
                          {/* <option value="admin">Admin</option> */}
                          <option value="member">Member</option>
                          <option value="manager">Manager</option>
                          {/* <option value="client">Client</option> */}
                        </select>
                        {
                          errors.role && (
                            <div className="mt-0.5 text-xs text-red-600">
                              {errors.role.message}
                            </div>
                          )
                        }
                        <svg
                          className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none"
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
                      </div>
                    </div>

                    {/* <!-- Date of Birth --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"

                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        {...register('dob', { required: 'Date of birth is required' })}

                      />
                      {
                        errors.dob && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.dob.message}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>

                {/* <!-- Address Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Address Information
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea

                        rows={2}
                        className="w-full px-3 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow resize-none"
                        {...register('address', { required: 'Address is required' })}

                      />
                      {
                        errors.address && (
                          <div className="mt-0.5 text-xs text-red-600">
                            {errors.address.message}
                          </div>
                        )
                      }
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* <!-- City --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"

                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                          {...register('city', { required: 'City is required' })}

                        />
                        {
                          errors.city && (
                            <div className="mt-0.5 text-xs text-red-600">
                              {errors.city.message}
                            </div>
                          )
                        }
                      </div>

                      {/* <!-- State --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('state', { required: 'State is required' })}

                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"

                        />
                        {
                          errors.state && (
                            <div className="mt-0.5 text-xs text-red-600">
                              {errors.state.message}
                            </div>
                          )
                        }
                      </div>

                      {/* <!-- Country --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register('country', { required: 'Country is required' })}

                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"

                        />
                        {
                          errors.country && (
                            <div className="mt-0.5 text-xs text-red-600">
                              {errors.country.message}
                            </div>
                          )
                        }
                      </div>

                      {/* <!-- Zip Code --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"

                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                          {...register('zip_code', { required: 'Zip Code is required' })}

                        />
                        {
                          errors.zip_code && (
                            <div className="mt-0.5 text-xs text-red-600">
                              {errors.zip_code.message}
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-6 border-t border-gray-100 sticky bottom-0 bg-white backdrop-blur-xl">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => closeModal(false)}
                      className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition-colors shadow-lg shadow-brand-500/25"
                    >
                      Add Member
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
