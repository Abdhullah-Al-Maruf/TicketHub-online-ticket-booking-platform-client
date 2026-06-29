// app/(dashboard)/tickets/all/page.jsx
import PaginationWrapper from "@/components/shared/PaginationWrapper";
import FilterAndSearch from "@/components/tickets/FilterAndSearch";
import TicketCard from "@/components/tickets/TicketCard";
import { searchTickets } from "@/lib/api/tickets";

const allTicketPage = async ({ searchParams }) => {
  const { page, from, to, transportType, sort } = await searchParams;

  const currentPage = parseInt(page) || 1;
  const limit = 9;

  const filters = { from, to, transportType, sort };

  let tickets = [];
  let totalPages = 1;

  try {
    const data = await searchTickets(currentPage, limit, filters);
    tickets = data.result || [];
    totalPages = data.pagination?.totalPages || 1;
  } catch (error) {
    console.error("Failed to load tickets:", error);
  }

  const getTicketId = (ticket) => ticket._id?.$oid || ticket._id || ticket.id;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-5xl text-[var(--tertiary)] mb-2">All Tickets</h1>
      <p className="mb-10">
        Enjoy luxury and first class journey with TicketHub. Book Ticket Now
      </p>

      {/* No props needed – component reads URL directly */}
      <FilterAndSearch />

      <p className="mt-4 mb-2">
        <span className="text-2xl font-bold text-purple-500">{tickets.length}</span>{" "}
        Ticket{tickets.length !== 1 ? "s" : ""} Available
      </p>

      <div className="grid max-w-7xl mx-auto mt-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard key={getTicketId(ticket)} ticket={ticket} />
        ))}
      </div>

      <div className="flex justify-center items-center mt-8">
        <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default allTicketPage;