import AddTicketForm from '@/components/dashboard/vendor/AddTicketForm';
import React from 'react';

const addTicketPage = () => {
    return (
        <div>
        <h1 className='font-bold text-5xl text-purple-700'>Add New Ticket</h1>
        <AddTicketForm/>
        </div>
    );
};

export default addTicketPage;