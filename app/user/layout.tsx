'use client';

import React from 'react';
import '@/assets/css/custom.css';
import Image from 'next/image';
export default function UserLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <Image
              src="/images/loginImg.png"
              alt="Furniture"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-br-[80px]"
            />

            <div className="absolute inset-0 image-overlay rounded-br-[80px]"></div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-br-[80px]">
              <div className="absolute bottom-12 left-12 right-12">
                <h2 className="text-4xl font-semibold mb-4 text-white">
                  Efficient Business Management at Your Fingertips
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Our practice is providing comprehensive virtual assistant
                  services to streamline your business operations.
                </p>

                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="white"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      />
                    </svg>
                    <span className="text-white">
                      100% Satisfication Guarantee
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-full">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="white"
                        d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z"
                      />
                    </svg>
                    <span className="text-white">
                      Reliable and dedicated support
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white px-8 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
