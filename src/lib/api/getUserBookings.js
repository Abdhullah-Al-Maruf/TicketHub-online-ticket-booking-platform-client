import { serverFetch } from "../core/server";

export const getUserBookings=async(emailId)=>{
const res= await serverFetch(`/api/bookings/${emailId}`, {
  cache: "no-store",
});

return res.result;
}
// 