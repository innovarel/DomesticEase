import { getUser, getUserInfo } from "@/app/actions/user";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const email = body?.email;
  // Create a Nodemailer transporter
  console.log({ email });
  const user = await getUserInfo(email);
  const password = user?.password;

  if (!user) {
    console.log("Email not found");
    return NextResponse.json({
      success: false,
      message: "Email not found",
    });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "usmanjutt8132@gmail.com",
        pass: "ncsyaivxpcudqrye",
      },
    });

    // Define email options
    let mailOptions = {
      from: "usmanjutt8132@gmail.com",
      to: email,
      subject: "Confirm your email -Book Your Oil Change",
      html: `Click here to confirm your email -> <a href='http://localhost:3000/approve?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}'>CONFIRM</a>`,
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
