'use client';

import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import Image from 'next/image';
import { getData } from '@/utils/register/register';
import { Button } from 'primereact/button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();

    // Basic validation
    const { fullName, email, password, confirmPassword } = formData;
    if (!fullName || !email || !password || password !== confirmPassword) {
      console.error("Please fill in all fields correctly.");
      return; // Exit if validation fails
    }

    try {
      const response = await getData(formData);
      console.log('Response from server:', response);

      // Check for successful response and clear form if successful
      if (response.status) {
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2 bg-gray-200 relative">
        <Link href="/" className='underline underline-offset-8 absolute top-10 left-10 text-3xl px-5 font-semibold text-center mb-2 font-playfair text-red-900'>
          Logophile
        </Link>
        <Image
          className="object-cover w-full h-full"
          src="/books.jpg"
          alt="Login Image"
          width={800}
          height={800}
          priority
        />
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-4">
          <h2 className="text-7xl font-semibold text-center mb-2 font-playfair text-red-900">Register</h2>
          <p className="text-md text-center mb-6 text-black font-merriam font-thin italic -translate-y-4 translate-x-24">Welcome to Logophile</p>

          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Fullname</label>
              <InputText
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Email</label>
              <InputText
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Password</label>
              <InputText
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Confirm Password</label>
              <InputText
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-full border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <Button type="submit" label="Register" className="w-full bg-black rounded-full text-white p-3" />
            <div className='flex justify-center underline py-2'>
              <Link href="/login">Already have an account</Link>
            </div>
          </form>
          <div className='mt-4'>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-[1px] mt-1 w-full inline-block"></div>
              <span className="text-gray-800 mx-1 uppercase font-semibold">or</span>
              <div className="bg-gray-300 h-[1px] mt-1 w-full inline-block"></div>
            </div>
            <div className='flex items-center mt-4 w-full'>
              {/* <form
                action={async () => {
                  "use server"
                  await signIn("google", { redirectTo: "/" })
                }}
                className='w-full'
              >
                <button type="submit" className='flex w-full items-center justify-center gap-2 mt-4 p-2 border rounded-full'>
                  <FcGoogle className='text-3xl' />
                  Sign In with Google
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
