// tickets related api calls

import { serverFetch } from "../core/server"

export const getTickets=async(emailId)=>{
const res= await serverFetch(`/api/tickets/vendor/${emailId}`)

return res.result;
}
// for user dashboard get all his booking
export const getBookings = async (email) => {
  const res = await serverFetch(`/api/bookings/${email}`);
  return res.result;
};



export const getAllTickets=async(page=1,limit=10)=>{
const res= await serverFetch(`/api/tickets?page=${page}&limit=${limit}`);
return res;
}



export const getTicketById = async (id) => {

  const res = await serverFetch(`/api/ticket/${id}`);
   
  return res.result
};

export const getActiveAdCount = async () => {
  const res = await serverFetch("/api/tickets/count-active");
  return res.count || 0;
};
export const searchTickets = async (page = 1, limit = 10, filters = {}) => {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);

  const validTypes = ["bus", "train", "launch", "flight"];

  if (filters.from?.trim()) params.set("from", filters.from.trim());
  if (filters.to?.trim()) params.set("to", filters.to.trim());
  if (filters.transportType && validTypes.includes(filters.transportType.toLowerCase())) {
    params.set("transportType", filters.transportType.toLowerCase());
  }
  if (filters.sort === "low-high" || filters.sort === "high-low") {
    params.set("sort", filters.sort);
  }

  const res = await serverFetch(`/api/tickets/search?${params.toString()}`);
  return res;
};