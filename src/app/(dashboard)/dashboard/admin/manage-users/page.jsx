import AdminUsersTable from '@/components/dashboard/admin/AdminUsersTable';
import { getUsers } from '@/lib/api/allUsersAdmin';
import React from 'react';

const manageUserPage = async() => {
const users= await getUsers();
// todo: later add pagination
    return (
        <div>

        <div className='mb-5'>
             <h1 className='text-4xl font-bold text-black dark:text-amber-50'>Manage Users</h1>
             <p className=' text-black dark:text-amber-50'>Overview of all system users, their roles, and access status.</p>
        </div>
      <AdminUsersTable users={users}/>
      <p className='mt-2'>add pagination later</p>
        </div>
    );
};

export default manageUserPage;