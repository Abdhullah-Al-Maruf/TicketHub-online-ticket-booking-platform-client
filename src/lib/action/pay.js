"use server"

import { serverMutation } from "../core/server";

export const payment = async (paymentData) => {
  const res = await serverMutation("/api/payment", paymentData);
  return res;
};