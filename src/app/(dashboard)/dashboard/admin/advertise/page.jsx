import AdvertisedTable from '@/components/dashboard/admin/AdvertisedTable';
import { getAllTickets } from '@/lib/api/tickets';
import React from 'react';

const advertiseMentPage = async() => {
    const tickets=await getAllTickets();
    return (
        <div>
     <AdvertisedTable tickets={tickets}/>  
        </div>
    );
};

export default advertiseMentPage;