'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/users/${userid}`, {
            method: 'DELETE',
          });

          if (res.ok) {
            const filteredUsers = users.filter(
              (user) => user.userid !== userid
            );
            setUsers(filteredUsers);

            Swal.fire({
              title: 'Deleted!',
              text: 'The user has been deleted.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete the user.',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'User data is safe!',
          icon: 'info',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleDetail = (userid) => {
    router.push(`/users/${userid}`);
  };

  const handleEdit = (userid) => {
    router.push(`/users/update-user/${userid}`);
  };

  return (
    <TableContainer component={Paper}>
      {isLoading ? (
        <div className='w-full flex flex-col gap-6 items-center justify-center py-20'>
          <p>Loading...</p>
          <BeatLoader color='#131921' size={40} />
        </div>
      ) : (
        <Table sx={{ minWidth: 768 }} aria-label='user table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nama Lengkap</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userid}>
                <TableCell>{user.userid}</TableCell>
                <TableCell>{user.namalengkap}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    className='mr-2'
                    onClick={() => handleDetail(user.userid)}
                  >
                    Detail
                  </Button>
                  <Button
                    variant='contained'
                    color='warning'
                    size='small'
                    className='mr-2'
                    onClick={() => handleEdit(user.userid)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    size='small'
                    onClick={() => handleDelete(user.userid)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default UserList;
