import { requireRole } from '@/lib/core/session';
import React from 'react';

const vendorLayout = async ({children}) => {
    await requireRole("vendor") //check the role of the user, if not vendor then redirect to unauthorized page
    return (
        <div>
            {children}
        </div>
    );
};

export default vendorLayout;