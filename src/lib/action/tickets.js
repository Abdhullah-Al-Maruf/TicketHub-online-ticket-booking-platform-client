// tickets related actions 

import { serverMutation } from "../core/server";
// for vendor tickets add 
export const addTicket= async (ticketData)=>{
    const res= await serverMutation("/api/add-ticket",ticketData);
    return res;
}


export const updateTicket= async (ticketData,ticketId)=>{
    const res= await serverMutation(`/api/update-tickets/${ticketId}`,ticketData,"PATCH");
    return res;
}

export const deleteTicket= async (ticketId)=>{
    const res= await serverMutation(`/api/delete-tickets/${ticketId}`,{},"DELETE");
    return res;
}