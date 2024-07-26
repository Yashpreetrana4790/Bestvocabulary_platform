import ReButton from '@/components/Button'
import Link from 'next/link'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/auth"
import Image from 'next/image';

const page = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block md:w-1/2 bg-gray-200  relative">
        <Link href="/" className=' underline underline-offset-8 absolute top-10 left-10 text-3xl px-5 font-semibold text-center mb-2  font-playfair text-red-900  '>
          Logophile

        </Link>
        <Image
          className="object-cover w-full h-full "
          src="/books.jpg"
          alt="Login Image"
          width={800}
          height={800}
          priority
        />
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-4">
          <h2 className="text-7xl font-semibold text-center mb-2  font-playfair text-red-900">Register</h2>
          <p className="text-md  text-center mb-6 text-black font-merriam font-thin  italic -translate-y-4 translate-x-24  ">Welcome to Logophile</p>

          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium ml-2 font-opensans text-gray-700">First Name</label>
              <InputText type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Username</label>
              <InputText type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Password</label>
              <InputText type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border rounded-full border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <div className='flex justify-end font-xs underline decoration-red-900 my-1'>

              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium ml-2 font-opensans text-gray-700">Password</label>
              <InputText type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border rounded-full border-gray-300  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <div className='flex justify-end font-xs underline decoration-red-900 my-1'>

             
              </div>
            </div>
            <ReButton iconleft="fas fa-sign-in-alt" label="Login" type="secondary" className="w-full" />

            <div className='flex justify-center underline py-2 '>
              <Link href="/login">Already have any account</Link>

            </div>
          </form>
          <div className=' mt-8'>
            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-[1px] mt-1   w-full inline-block"></div>
              <span className="text-gray-800 mx-1 uppercase font-semibold">or</span>
              <div className="bg-gray-300 h-[1px] mt-1  w-full inline-block"></div>
            </div>
            <div className='flex items-center mt-5 w-full '>
              <form
                action={async () => {
                  "use server"
                  await signIn("google", { redirectTo: "/" })
                }}
                className='w-full'
              >
                <button type="submit" className='flex w-full items-center justify-center gap-2 mt-4 p-2 border rounded-full'>
                  <FcGoogle className='text-3xl' />
                  Sign In with Google

                  {/* <button type="submit">Signin with Google</button> */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page