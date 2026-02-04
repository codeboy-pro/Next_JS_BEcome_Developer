import React from 'react'
import UserList from './components/users-list'
import AddUserForm from './components/add-user-form'

const Home = () => {
  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Tanstack Query Demo</h1>
      <div className='grid gap-6 md:grid-cols-2'>
    <div className='space-y-6'>
      <UserList/>
      <AddUserForm/>
    </div>
      </div>
    </div>
  )
}

export default Home