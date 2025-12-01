// app/page.tsx
import { auth } from "@/auth"; 
import EditRoleMobile from "@/components/EditRoleMobile";
import Header from "@/components/Header";
import User from "@/model/user.model";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Nav from "@/components/Nav";

export default async function HomePage() {
  // Get the session on the server
  const session = await auth();
  console.log(session);

  if (!session?.user?._id) {
    redirect("/login");
  }

  await connectDB();

  const userDoc = await User.findById(
    new mongoose.Types.ObjectId(session.user._id)
  ).select("-password");

  if (!userDoc) {
    redirect("/login");
  }

  // ✅ Convert to plain object
  const user = {
    ...userDoc.toObject(),
    _id: userDoc._id.toString(), // ObjectId → string
    createdAt: userDoc.createdAt?.toISOString(), // Date → string
    updatedAt: userDoc.updatedAt?.toISOString(), // Date → string
  };

  // Check if profile is incomplete
  const isIncomplete = !user.mobile || !user.role;
  if (isIncomplete) {
    return <EditRoleMobile />;
  }

  return (
    <>
      {/* <Header /> */}
      <Nav user={user} />
    </>
  );
}
