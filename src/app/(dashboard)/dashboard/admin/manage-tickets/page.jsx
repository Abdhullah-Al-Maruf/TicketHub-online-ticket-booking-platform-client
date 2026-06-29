import { getVendorRequestedBooking } from '@/lib/api/vendor_tickets_request';
import React from 'react';
import ManageTicketsPage from './ManageTicketsPage';

const ManageTicketsHomePage =async () => {
const initialBookings = await getVendorRequestedBooking();

    return <ManageTicketsPage initialBookings={initialBookings || []} />
};

export default ManageTicketsHomePage;