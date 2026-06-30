import { payment } from "@/lib/action/pay";
import { stripe } from "@/lib/payment/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaCalendarAlt, FaTicketAlt, FaReceipt } from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  // Retrieve Stripe Checkout Session
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  // If payment is not complete
  if (session.status === "open") {
    redirect("/");
  }

  if (session.status === "complete") {
    // Process backend database status updating
    await payment({
      sessionId: session.id,
      bookingId: session.metadata?.bookingId,
      userId: session.metadata?.userId,
      price: Number(session.metadata?.price || 0),
      paymentIntent: typeof session.payment_intent === "string" 
        ? session.payment_intent 
        : session.payment_intent?.id,
    });

    const transactionId = typeof session.payment_intent === "string" 
      ? session.payment_intent 
      : session.payment_intent?.id;

    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 transition-colors duration-200 dark:bg-[#120d1a] dark:text-white">
        {/* Style injection for the dynamic animated checkmark vector draw scales */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes stroke { 100% { stroke-dashoffset: 0; } }
          @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
          @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 40px #22c55e; } }
          .checkmark-circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: #22c55e; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
          .checkmark { w-16; h-16; border-radius: 50%; display: block; stroke-width: 2; stroke: #fff; stroke-miterlimit: 10; margin: 0 auto; box-shadow: inset 0px 0px 0px #22c55e; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s forwards; }
          .checkmark-check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards; }
        `}} />

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl transition-all dark:border-[#2d223c] dark:bg-[#1a1424] dark:shadow-none">
          
          {/* Checkmark Animation Container */}
          <div className="relative mb-6 h-16 w-16 mx-auto">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-green-600 dark:text-green-400">
            Payment Successful!
          </h1>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Thank you for your order. Your ticket booking has been confirmed and updated dynamically.
          </p>

          {/* Metadata Display Cards */}
          <div className="mt-6 space-y-3 rounded-xl bg-slate-100 p-4 text-left font-sans text-xs border border-slate-200 dark:bg-[#231b30] dark:border-[#362a4a]">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium"><FaReceipt /> Transaction ID</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 select-all break-all ml-4 max-w-[200px] text-right">
                {transactionId || "N/A"}
              </span>
            </div>
            
            {session.metadata?.bookingId && (
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-[#362a4a]/50">
                <span className="flex items-center gap-1.5 font-medium"><FaTicketAlt /> Booking Ref</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  #{session.metadata.bookingId.slice(-8)}
                </span>
              </div>
            )}

            {session.metadata?.price && (
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-[#362a4a]/50">
                <span className="flex items-center gap-1.5 font-medium"><FaCalendarAlt /> Total Amount Paid</span>
                <span className="font-bold text-purple-600 dark:text-[#c084fc] text-sm">
                  ৳{Number(session.metadata.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Redirection Options */}
          <div className="mt-8">
            <Link href="/dashboard/user/bookings">
              <button className="w-full rounded-xl bg-purple-600 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/10 hover:bg-purple-700 transition-all dark:bg-[#c084fc] dark:text-[#120d1a] dark:hover:bg-[#b06bf2] active:scale-98">
                View My Bookings
              </button>
            </Link>
            
            <Link href="/" className="mt-3 block text-xs font-semibold text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
              Return to Homepage
            </Link>
          </div>

        </div>
      </section>
    );
  }

  redirect("/");
}