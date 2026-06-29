// tickets related api calls

import { serverFetch } from "../core/server"

export const getTickets=async(emailId)=>{
const res= await serverFetch(`/api/tickets/vendor/${emailId}`)

return res.result;
}
export const getAllTickets=async(page=1,limit=10)=>{
const res= await serverFetch(`/api/tickets?page=${page}&limit=${limit}`);
return res;
}

export const getActiveAdCount = async () => {
  const res = await serverFetch("/api/tickets/count-active");
  return res.count || 0;
};