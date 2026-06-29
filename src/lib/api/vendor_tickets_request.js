import { serverFetch } from "../core/server"

export const getVendorRequestedBooking = async (page = 1, limit = 10) => {
  const res = await serverFetch(`/api/admin/tickets?page=${page}&limit=${limit}`);
  return res; // returns { result, pagination }
};