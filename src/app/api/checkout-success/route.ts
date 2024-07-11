// app/api/stripe/success/route.ts

import connectMongo from "@/app/libs/mongo";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
const stripe = require("stripe")(
  "sk_test_51NOGC42KGHLgqKUzPcgCe6vGFHmY36skDkl6bmywCEMXutpwDbU4roa6GsgevPveCZCDtvcVoB8YNWD92r8Jco5400HiivdFAr"
);
export const GET = async (request: NextRequest) => {
  // Assuming the session ID is passed as a query parameter
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    console.error("Session ID not provided");
  }

  try {
    // Retrieve the session object from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Access the metadata from the session
    const metadata = session.metadata;
    console.log({ metadata });

    const mongo = await connectMongo();
    const { database, client } = mongo!;

    const shop = database.collection("order");

    const item = await shop.updateOne(
      { _id: new ObjectId(metadata.orderId) },
      { $set: { paid: true } }
    );
    client.close();

    // Respond with the metadata
    return NextResponse.json({ success: "go back to the app" });
  } catch (error) {
    console.error("Error retrieving session:", error);
    console.error("Errr");
  }
};
