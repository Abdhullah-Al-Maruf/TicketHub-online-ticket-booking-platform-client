"use server"
// tickets related actions 
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";
// for vendor tickets add 
export const addTicket= async (ticketData)=>{
    const res= await serverMutation("/api/add-ticket",ticketData);
    return res;
}

// for user add booking
export const addBooking = async (bookingData) => {
  const res = await serverMutation("/api/bookings", bookingData);
      revalidatePath("/dashboard/user/my-bookings");
  return res;
};

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
export const advertiseTicket= async (ticketId)=>{
    const res= await serverMutation(`/api/admin/tickets/${ticketId}/advertise`,{},"PATCH");
    revalidatePath("/dashboard/admin/manage-users");
    return res;
}
export const unadvertiseTicket= async (ticketId)=>{
    const res= await serverMutation(`/api/admin/tickets/${ticketId}/unadvertise`,{},"PATCH");
    revalidatePath("/dashboard/admin/manage-users");
    return res;
}

