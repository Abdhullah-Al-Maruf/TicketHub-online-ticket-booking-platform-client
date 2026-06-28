"use server"
// tickets related actions 
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";
// for vendor tickets add 
export const addTicket= async (ticketData)=>{
    const res= await serverMutation("/api/add-ticket",ticketData);
    return res;
}


export const updateTicket= async (ticketId,ticketData)=>{
    const res= await serverMutation(`/api/update-tickets/${ticketId}`,ticketData,"PATCH");
    revalidatePath("/dashboard/vendor/my-tickets");
    return res;
}

export const deleteTicket= async (ticketId)=>{
    const res= await serverMutation(`/api/delete-tickets/${ticketId}`,{},"DELETE");
    revalidatePath("/dashboard/vendor/my-tickets");
    return res;
}