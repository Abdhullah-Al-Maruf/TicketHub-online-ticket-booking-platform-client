

import BookingList from "@/components/dashboard/user/BookingList";
import { getUserBookings } from "@/lib/api/getUserBookings";
import { getUserSession } from "@/lib/core/session";

export default async function MyBookingsPage() {
  // 1. Get session on the server
  const session = await  getUserSession() ;
  const userEmail = session?.email;

  // 2. If no user, show a message
  if (!userEmail) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-[var(--on-surface)]">Please log in</h2>
        <p className="text-[var(--on-surface-variant)]">You need to be signed in to view your bookings.</p>
      </div>
    );
  }

  // 3. Fetch bookings from the database
  let bookings = [];
  let error = null;
  try {
    bookings = await getUserBookings(userEmail);
  } catch (err) {
    error = err.message || "Failed to load bookings.";
  }

  // 4. Render the client component with fetched data
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--on-surface)] mb-6">My Bookings</h1>
      <BookingList bookings={bookings} error={error} />
    </div>
  );
}