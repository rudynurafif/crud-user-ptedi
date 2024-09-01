'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { BeatLoader } from 'react-spinners';

const UserDetail = () => {
  const router = useRouter();
  const { userid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userid) {
      const fetchUser = async () => {
        const response = await fetch(`/api/users/${userid}`);
        const data = await response.json();
        setUser(data);
      };
      fetchUser();
    }
  }, [userid]);

  if (!user)
    return (
      <div className='w-full flex flex-col gap-6 items-center justify-center py-20'>
        <p>Loading...</p>
        <BeatLoader color='#131921' size={40} />
      </div>
    );

  return (
    <div className='container mx-auto py-8 max-w-lg'>
      <h1 className='text-2xl font-bold mb-4'>User Detail</h1>
      <div className='bg-white p-6 shadow-md rounded-md'>
        <p>
          <strong>User ID:</strong> {user.userid}
        </p>
        <p>
          <strong>Nama Lengkap:</strong> {user.namalengkap}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Status:</strong> {user.status}
        </p>
      </div>
      <Button
        variant='contained'
        color='primary'
        className='mt-4'
        onClick={() => router.push('/')}
      >
        Back to User List
      </Button>
    </div>
  );
};

export default UserDetail;
