'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faSpinner } from '@fortawesome/free-solid-svg-icons';

type dataType = { email: string; password: string };

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const url = localStorage.getItem('stripe_account_link');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: dataType) => {
    try {
      setLoading(true);
      console.log(register);
      console.log(process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL);
      const status = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: data.email, password: data.password })
        }
      );

      if (status.status === 200) {
        const responseData = await status.json();
        const { access_token, refresh_token, role, userId, username } =
          responseData;
        console.log(responseData);
        // Only access localStorage on the client side
        if (isClient) {
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('role', role);
          localStorage.setItem('username', username);
          localStorage.setItem('userId', userId);

          if (role === 'admin') {
            router.push('/admin/dashboard');
          } else if (role === 'client') {
            router.push('/client/dashboard');
          } else if (role === 'manager') {
            router.push('/manager/dashboard');
          } else if (role === 'member') {
            router.push('/member/dashboard');
          }
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while logging in');
      setLoading(false);
    } finally {
      setLoading(false); // Ensure loading is reset on error as well
    }
  };

  // Ensure rendering only happens on the client-side
  if (!isClient) {
    return null; // Return nothing while the component is being hydrated
  }

  return (
    <>
      <div className="w-64 mb-8">
        <Image
          src="/images/logo.svg"
          width={100}
          height={100}
          alt="Logo"
          className="w-full"
        />
      </div>

      <ToastContainer />
      {url && (
        <Link
          href={url}
          className="py-3 flex items-center text-sm text-black uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600"
        >
          Complete Stripe Account Setting...
        </Link>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="block text-gray-700 mb-2">Email*</div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          <div className="block text-gray-700 mb-2">Password*</div>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^.+$/,
                message: 'Password must be strong'
              }
            })}
          />
          {errors.password && (
            <div className="mt-0.5 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 form-checkbox rounded border-gray-300"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <button
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition-colors text-center"
          type="submit"
          disabled={loading}
        >
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <>Sign In</>}
        </button>

        <p className="text-center text-gray-600 text-sm">
          Forgot your password?&nbsp;
          <Link href="/user/forget" className="text-gray-900 hover:underline">
            Reset it
          </Link>
        </p>
        <Link
          href="/user/register"
          className="py-3 flex items-center text-sm text-black uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600"
        >
          Register
        </Link>
      </form>
    </>
  );
}
