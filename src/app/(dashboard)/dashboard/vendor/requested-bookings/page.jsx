import React from "react";
import RequestedBookingPage from "./RequestedBookingPage";
import { getUserSession } from "@/lib/core/session";

const RequestedBookingHome = async () => {
  const user = await getUserSession();
  const isFraud = user?.isFraud;

  return (
    <>
      {isFraud ? (
        <div className="min-h-screen   flex items-center justify-center">
          <div className="max-w-lg text-center border border-red-300 rounded-xl p-8 bg-red-500/20">
            <h2 className="text-2xl font-bold text-red-600">
              Account Restricted
            </h2>

            <p className="mt-4  text-red-600">
              Your vendor account has been marked as fraud.
            </p>

            <p className="mt-2  text-red-600">
              You cannot add new tickets. Please contact the administrator if
              you believe this is a mistake.
            </p>
          </div>
        </div>
      ) : (
        <RequestedBookingPage />
      )}
    </>
  );
};

export default RequestedBookingHome;
