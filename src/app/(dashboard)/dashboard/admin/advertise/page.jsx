// src/app/(dashboard)/dashboard/admin/advertise/page.jsx
import AdCapacityCard from "@/components/dashboard/admin/AdCapacityCard";
import AdvertisedTable from "@/components/dashboard/admin/AdvertisedTable";
import PaginationWrapper from "@/components/shared/PaginationWrapper";
import { getActiveAdCount, getAllTickets } from "@/lib/api/tickets";


const advertiseMentPage = async ({ searchParams }) => {
const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const limit = 10;

  let tickets = [];
  let activeAds = 0;
  let totalPages = 1;
  const totalCapacity = 6;

    try {
    // Fetch both in parallel
    const [ticketsData, activeCount] = await Promise.all([
      getAllTickets(currentPage, limit),
      getActiveAdCount(),
    ]);

    tickets = ticketsData.result || [];
    activeAds = activeCount; 
    totalPages = ticketsData.pagination?.totalPages || 1;
  } catch (error) {
    console.error("Failed to load data:", error);
  }

  return (
    <div>
      <AdCapacityCard totalCapacity={totalCapacity} activeAds={activeAds} />
      <AdvertisedTable tickets={tickets} />
      <div className="flex justify-center items-center">
        <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default advertiseMentPage;