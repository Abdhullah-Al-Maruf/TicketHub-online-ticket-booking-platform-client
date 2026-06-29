// make the componetnt server by a wrapper 
"use client" 
import RequestedBookingsTable from "@/components/dashboard/vendor/RequestedBookingsTable";


const requestedBookingPage = () => {
const bookings = [
  {
    id: "1",
    userName: "John Doe",
    userEmail: "john@example.com", // fallback if name missing
    ticketTitle: "Luxury Coach to Cox's Bazar",
    quantity: 2,
    unitPrice: 1850,
    totalPrice: 3700,
    requestedDate: "Oct 24",
    status: "pending", // "pending" | "approved" | "rejected"
  },
  // ...
];


const handleAccept = (bookingId) => {
  // Call API to accept booking
};

const handleReject = (bookingId) => {
  // Call API to reject booking
};
    return (
        <div>

          {
            
          }
        <RequestedBookingsTable
    bookings={bookings}
    onAccept={handleAccept}
    onReject={handleReject}
  />
        </div>
    );
};

export default requestedBookingPage;