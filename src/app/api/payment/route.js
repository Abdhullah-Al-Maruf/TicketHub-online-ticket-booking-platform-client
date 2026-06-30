import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/payment/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(req) {
  try {
    // Get bookingId from form
    const formData = await req.formData();
    const bookingId = formData.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking id is required",
        },
        { status: 400 },
      );
    }

    // Logged in user
    const userSession = await getUserSession();

    console.log(userSession);
    if (!userSession) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Fetch booking from Express API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/booking/${bookingId}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Booking not found");
    }

    const booking = data.result;

    // Vendor must approve first
    if (booking.status !== "approved") {
      throw new Error("Booking has not been approved yet.");
    }

    // Prevent duplicate payment
    if (booking.paymentStatus === "paid") {
      throw new Error("This booking has already been paid.");
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: userSession.email,

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd", // Change to "bdt" if needed

            product_data: {
              name: booking.ticketTitle,
            },

            unit_amount: booking.totalPrice * 100,
          },

          quantity: 1,
        },
      ],

      metadata: {
        bookingId: String(booking._id),
        userId: String(userSession.id), 
        price: String(booking.totalPrice),
      },

      success_url: `${origin}/dashboard/user/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/dashboard/user/my-bookings`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
