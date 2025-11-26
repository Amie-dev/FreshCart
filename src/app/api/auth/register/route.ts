import connectDB from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, mobile } = await request.json();

    // Basic validation
    if (!name || !email || !password || !mobile) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    if (mobile.length !== 10) {
      return NextResponse.json({ error: "Mobile number must be 10 digits" }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser._id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
