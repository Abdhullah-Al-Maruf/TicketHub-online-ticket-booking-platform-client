
"use server"
import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const makeAdmin= async (userId)=>{
    const res= await serverMutation(`/api/admin/users/${userId}/make-admin`,{},"PATCH");
    revalidatePath("/dashboard/admin/manage-users");
    return res;
}
export const makeVendor= async (userId)=>{
    const res= await serverMutation(`/api/admin/users/${userId}/make-vendor`,{},"PATCH");
    revalidatePath("/dashboard/admin/manage-users");
    return res;
}
export const markFraud= async (userId)=>{
    const res= await serverMutation(`/api/admin/users/${userId}/fraud`,{},"PATCH");
    revalidatePath("/dashboard/admin/manage-users");
    return res;
}
export const markUnFraud= async (userId)=>{
    const res= await serverMutation(`/api/admin/users/${userId}/unfraud`,{},"PATCH");
    revalidatePath("/dashboard/admin/manage-users");
    return res;
}
