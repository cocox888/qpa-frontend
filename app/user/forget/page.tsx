"use client"

import ButtonPrimary from "@/components/button/buttonPrimary";
import Image from "next/image";
import Link from "next/link";

export default function Forget() {

    const sendMessage = () => {

    }
    return (
        <>
            <div className="w-64 mb-8">
                <Image src="/images/logo.svg" alt="Logo" width={100} height={100} className="w-full" />
            </div>

            <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
            <p className="text-gray-500 mb-8">Enter your email address and we&apos;ll send you instructions to reset your password.</p>


            <form className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Email address</label>
                    <input type="email" placeholder="Enter your email"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" />
                </div>

                <ButtonPrimary title="Send Reset Instructions" onClick={sendMessage} />

                <p className="text-center text-gray-600 text-sm">
                    Remember your password?&nbsp;
                    <Link href="/user/login" className="text-gray-900 hover:underline">Back to login</Link>
                </p>
            </form>


            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Need help?</h3>
                <p className="text-sm text-gray-500">
                    If you&apos;re having trouble accessing your account, please contact our support team at&nbsp;
                    <a href="mailto:support@qpa.com" className="text-gray-900 hover:underline">support@qpa.com</a>
                </p>
            </div>
        </>
    );
}
