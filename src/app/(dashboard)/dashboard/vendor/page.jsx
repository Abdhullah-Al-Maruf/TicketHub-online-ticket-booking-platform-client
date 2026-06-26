import ReusableProfileComponent from '@/components/shared/ReusableProfileComponent';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const vendorHomePage =async () => {
    const user= await getUserSession();
    return (
        <div>
        <ReusableProfileComponent user={user}/>
        </div>
    );
};

export default vendorHomePage;