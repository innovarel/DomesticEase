import { getUser, getUserInfo } from "@/app/actions/user";
import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const email = body?.email;

  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mail@bookyouroilchange.com",
        pass: "ncsyaivxpcudqrye",
      },
    });

    // Define email options
    let mailOptions = {
      from: "mail@bookyouroilchange.com",
      to: email,
      subject: "New order -Book Your Oil Change",
      html: `You received a new order check now on your portal.`,
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
