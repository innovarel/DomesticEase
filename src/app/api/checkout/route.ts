import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51NOGC42KGHLgqKUzPcgCe6vGFHmY36skDkl6bmywCEMXutpwDbU4roa6GsgevPveCZCDtvcVoB8YNWD92r8Jco5400HiivdFAr"
);
export const GET = async (req: NextRequest) => {
  const orderId = req.nextUrl.searchParams.get("orderId");

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: "price_1P5RyV2KGHLgqKUzrRsLsF2p", quantity: 1 }],
    mode: "payment",
    success_url:
      "https://usman-domestic.vercel.app/api/checkout-success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://usman-domestic.vercel.app/",
    metadata: { orderId: orderId },
  });

  return NextResponse.json({ session });
};
