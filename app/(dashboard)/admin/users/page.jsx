import { Getalluser } from '@/app/utils/user.action'
import UserCard from '@/components/cards/UserCard'
import React from 'react'

const page = async () => {
  const users = await Getalluser()
  console.log(users)
  return (
    <div className='m-5'>
      <UserCard users={users} />
    </div>
  )
}

export default page