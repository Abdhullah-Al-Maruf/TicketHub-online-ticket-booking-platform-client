import { demoTickets } from '@/components/Home/FeaturedTicketsSection';
import FilterAndSearch from '@/components/tickets/FilterAndSearch';
import TicketCard from '@/components/tickets/TicketCard';
import React from 'react';

const allTicketPage = () => {
    return (
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-5xl text-[var(--tertiary)] mb-2'>All Tickets</h1>
          <p className='mb-10'><span className='text-2xl font-bold text-purple-500'>128</span> Ticket Available</p>
      
       <div className="grid  max-w-7xl mx-auto mt-10 md:grid-cols-2   lg:grid-cols-3 gap-6">
        {/* todo : the tickets data will be come from database */}
              {demoTickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
        </div>
    );
};

export default allTicketPage;