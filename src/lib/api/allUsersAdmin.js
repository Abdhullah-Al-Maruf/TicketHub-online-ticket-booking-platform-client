
import { serverFetch } from "../core/server"

export const getUsers=async()=>{
const res= await serverFetch(`/api/admin/users`)

return res.result;
}