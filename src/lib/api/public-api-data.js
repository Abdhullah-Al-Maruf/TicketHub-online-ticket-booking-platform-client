import { serverFetch } from "../core/server";

export const getLatestTickets=async()=>{
const res= await serverFetch("/api/home/latest", {
  cache: "no-store",
});
return res.result;
}
export const getAdvertisedTickets=async()=>{
const res = await serverFetch("/api/home/advertised", {
  cache: "no-store",
});
return res.result;
}

