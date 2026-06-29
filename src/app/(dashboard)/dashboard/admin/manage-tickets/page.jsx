// app/(dashboard)/dashboard/admin/manage-tickets/page.jsx
import { getVendorRequestedBooking } from '@/lib/api/vendor_tickets_request';
import PaginationWrapper from '@/components/shared/PaginationWrapper';
import ManageTicketsPage from './ManageTicketsPage';

const ManageTicketsHomePage = async ({ searchParams }) => {

  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const limit = 10;

  let bookings = [];
  let totalPages = 1;

  try {
    const data = await getVendorRequestedBooking(currentPage, limit);
    bookings = data.result || [];
    totalPages = data.pagination?.totalPages || 1;
  } catch (error) {
    console.error('Failed to load bookings:', error);
  }

  return (
    <div>
      <ManageTicketsPage initialBookings={bookings} />
      <div className='flex justify-center items-center'>
        <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default ManageTicketsHomePage;