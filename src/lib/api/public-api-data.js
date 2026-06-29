import { serverFetch } from "../core/server";

export const getLatestTickets=async()=>{
const res= await serverFetch("/api/home/latest")
return res.result;
}
export const getAdvertisedTickets=async()=>{
const res= await serverFetch("/api/home/advertised")
return res.result;
}

