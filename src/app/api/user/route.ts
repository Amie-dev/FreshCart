import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const { role, mobile } = await request.json();

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    // Validate input
    if (!mobile) {
      return NextResponse.json(
        { message: "Mobile number is required" },
        { status: 400 }
      );
    }

    const update: Record<string, any> = {};
    if (role) update.role = role;
    update.mobile = mobile;

    const user = await User.findByIdAndUpdate(
      { _id:new mongoose.Types.ObjectId(session.user._id) },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
