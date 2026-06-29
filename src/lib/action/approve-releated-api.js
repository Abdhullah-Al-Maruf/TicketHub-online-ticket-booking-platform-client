"use server"
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const approveTicket = async (ticketId) => {
    const res = await serverMutation(`/api/admin/tickets/${ticketId}/approve`, {}, "PATCH");
    revalidatePath("/dashboard/admin/manage-tickets");
    return res;
}
export const rejectTicket = async (ticketId) => {
    const res = await serverMutation(`/api/admin/tickets/${ticketId}/reject`, {}, "PATCH");
    revalidatePath("/dashboard/admin/manage-tickets");
    return res;
}

