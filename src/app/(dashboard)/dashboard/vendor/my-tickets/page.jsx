
import MyTicketCard from '@/components/tickets/MyTicketCard';
import React from 'react';

const myTicketsPage = () => {

    return (
        <div>
           <div>
            <h1 className=' text-black dark:text-purple-700 font-bold text-4xl  drop-shadow-2xl'>My Added Tickets</h1>
            <p className='text-black dark:text-[#cfc2d6]'>Manage and track your active inventory listings.</p>
           </div>
           <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>

            <MyTicketCard/>
 {/* {Tickets.map((ticket) => (
    <MyTicketCard
      key={ticket._id}
      ticket={ticket}
    />
  ))} */}
           </div>
        </div>
    );
};

export default myTicketsPage;