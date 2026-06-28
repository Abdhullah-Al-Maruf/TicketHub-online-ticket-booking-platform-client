// tickets related api calls

import { serverFetch } from "../core/server"

export const getTickets=async(emailId)=>{
const res= await serverFetch(`/api/tickets/vendor/${emailId}`)

return res.result;
}
