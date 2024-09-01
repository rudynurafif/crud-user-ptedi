'use client'

import { Button } from '@mui/material';
import UserList from './components/UserList';
import Link from 'next/link';
import Meta from './components/Meta';

const UsersPage = () => {
  return (
    <div className='container mx-auto py-8'>
      <Meta title='Dashboard Page - User App' />

      <h1 className='text-2xl font-bold mb-6'>Welcome, Admin</h1>
      <div className='mt-8'>
        <Link href='/users/create-user'>
          <Button variant='contained' color='success' className='mb-5'>
            Create User
          </Button>
        </Link>
        <UserList />
      </div>
    </div>
  );
};

export default UsersPage;
