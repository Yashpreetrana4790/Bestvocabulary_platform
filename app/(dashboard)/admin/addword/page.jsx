
import MeaningForm from '@/components/Forms/MeaningForm'
import React from 'react'

const page = () => {
  return (
    <div className="space-y-4" >
      <div className=' m-3 p-3'>
        <h1 className='text-2xl'>Add New Word</h1>
        <p>Please add new word information here </p>
      </div>
      <div className='bg-gray-100 rounded-sm p-10 m-5'>
        <h2 className='text-md text-black mb-5'>
          Basic Word Related Information
        </h2>
        <div>
          <MeaningForm />
        </div>
      </div>
    </div>
  )
}

export default page