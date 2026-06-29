
import RequestedTicketBookingsTable from '@/components/dashboard/admin/RequestedTicketBookingsTable';
import { getVendorRequestedBooking } from '@/lib/api/vendor_tickets_request';
import React from 'react';

const manageTicketsPage = async() => {
const bookings= await getVendorRequestedBooking();

    return (
        <div>
   <RequestedTicketBookingsTable
   bookings={bookings}/>
        </div>
    );
};

export default manageTicketsPage;