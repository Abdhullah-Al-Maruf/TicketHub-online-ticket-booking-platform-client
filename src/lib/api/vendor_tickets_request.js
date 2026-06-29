import { serverFetch } from "../core/server"

export const getVendorRequestedBooking =async()=>{
    const res =await serverFetch("/api/admin/tickets")
    return res.result;
}