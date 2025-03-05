import type { TypeUser } from '@/lib/types';
import { type ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Toast from '../toast';
import api from '@/app/api/customApi';

interface AddMemberModalProps {
  memberData?: TypeUser;
  closeModal: (params: boolean) => void;
}

const MemberModal: React.FC<AddMemberModalProps> = ({
  memberData,
  closeModal
}) => {
  const token = localStorage.getItem('access_token');
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({
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
      const role = localStorage.getItem('role');
      api
        .post(`/${role}/createMembers`, data)
        .then(() => {
          Toast('success', 'User Created Successfully.');
          closeModal(false);
        })
        .catch((e) => {
          Toast('error', String(e));
        });
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        First Name:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.first_name}
                      </div>
                    </div>

                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Last Name:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.last_name}
                      </div>
                    </div>
                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Email:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.email}
                      </div>
                    </div>

                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Phone Number:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Account Settings Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Account Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Position:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.position}
                      </div>
                    </div>

                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Role:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.role}
                      </div>
                    </div>

                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Date Of Birth:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.dob}
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Address Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Address Information
                  </h3>
                  <div className="space-y-6">
                    <div className=" flex gap-3 self-baseline">
                      <div className="text-sm font-medium text-gray-700">
                        Address:
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {memberData?.address}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className=" flex gap-3 self-baseline">
                        <div className="text-sm font-medium text-gray-700">
                          City:
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {memberData?.city}
                        </div>
                      </div>

                      <div className=" flex gap-3 self-baseline">
                        <div className="text-sm font-medium text-gray-700">
                          State:
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {memberData?.state}
                        </div>
                      </div>

                      <div className=" flex gap-3 self-baseline">
                        <div className="text-sm font-medium text-gray-700">
                          Country:
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {memberData?.country}
                        </div>
                      </div>

                      <div className=" flex gap-3 self-baseline">
                        <div className="text-sm font-medium text-gray-700">
                          Zip Code:
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {memberData?.zip_code}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-t border-gray-100 sticky bottom-0 bg-white backdrop-blur-xl">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => closeModal(false)}
                      className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Cancel
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

export default MemberModal;
