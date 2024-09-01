'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { toast } from 'react-toastify';
import Meta from '@/app/components/Meta';

const UserForm = () => {
  const [formData, setFormData] = useState({
    namalengkap: '',
    username: '',
    password: '',
    status: 'Non-Active',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/');
        toast.success('Successfully create user data');
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <div className='container mx-auto py-8'>
      <Meta title='Create User Page' />
      <h1 className='text-2xl font-bold mb-4'>Create User</h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white max-w-lg p-6 shadow-md rounded-md'
      >
        <div className='mb-4'>
          <TextField
            label='Nama Lengkap'
            name='namalengkap'
            value={formData.namalengkap}
            onChange={handleChange}
            fullWidth
            autoComplete='off'
            required
          />
        </div>
        <div className='mb-4'>
          <TextField
            label='Username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            fullWidth
            autoComplete='off'
            required
          />
        </div>
        <div className='mb-4'>
          <TextField
            label='Password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div className='mb-4'>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name='status'
              value={formData.status}
              onChange={handleChange}
              fullWidth
              label='Status'
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Non-Active'>Non-Active</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='mr-3'
        >
          Create User
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='error'
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
