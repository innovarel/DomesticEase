import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    id: "20",
    price: 50.0,
    url: "https://usman-domestic.vercel.app/api/prods",
  });
};
