'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { toast, ToastContainer } from 'react-toastify';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    namalengkap: '',
    username: '',
    password: '',
    status: 'Non-Active',
  });
  const router = useRouter();
  const { userid } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userid}`);
        const user = await response.json();

        if (response.ok) {
          setFormData({
            namalengkap: user.namalengkap,
            username: user.username,
            password: user.password,
            status: user.status,
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Something went wrong', error);
      }
    };

    fetchUser();
  }, [userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/');
      toast.success('Successfully update user');

      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-4'>Update User</h1>
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
            placeholder='Leave empty to keep current password'
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
          Update User
        </Button>
        <Button
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

export default UpdateUser;
