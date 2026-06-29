import AdminUsersTable from '@/components/dashboard/admin/AdminUsersTable';
import { getUsers } from '@/lib/api/allUsersAdmin';
import React from 'react';

const manageUserPage = async() => {
const users= await getUsers();

    return (
        <div>
      <AdminUsersTable users={users}/>
        </div>
    );
};

export default manageUserPage;