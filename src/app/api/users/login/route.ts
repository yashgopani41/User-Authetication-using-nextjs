import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user?.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    console.log(user);

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    console.log("🚀 ~ POST ~ token:", token);

    const response = NextResponse.json({
      token: token,
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    console.log("🚀 ~ POST ~ response:", response);
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
