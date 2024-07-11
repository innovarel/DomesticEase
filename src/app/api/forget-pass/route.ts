import { getUser, getUserInfo } from "@/app/actions/user";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const email = body?.email;
  // Create a Nodemailer transporter

  const user = await getUserInfo(email);
  const password = user?.password;

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Email not found",
    });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "basitdev76@gmail.com",
        pass: "mvmrzvikxtaioyfh",
      },
    });

    // Define email options
    let mailOptions = {
      from: "basitdev76@gmail.com",
      to: email,
      subject: "Reset password - Domestic ease",
      html: `Click here to reset your password -> <a href='http://localhost:3000/reset?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}'>RESET</a>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Email not sent",
    });
  }
};
