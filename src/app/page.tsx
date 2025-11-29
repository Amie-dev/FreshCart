// app/page.tsx
import { auth } from "@/auth"; 
import EditRoleMobile from "@/components/EditRoleMobile";
import Header from "@/components/Header"; // fixed typo: Herder -> Header
import User from "@/model/user.model";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
export default async function HomePage() {
  // Get the session on the server
  const session = await auth();
  console.log(session);

  if (!session?.user?._id) {
    redirect("/login");
  }
  await connectDB()

  const user = await User.findById(new mongoose.Types.ObjectId(session.user._id));
  if (!user) {
    redirect("/login");
  }

  // Check if profile is incomplete
  const isIncomplete = !user.mobile || !user.role;
  if (isIncomplete) {
    return <EditRoleMobile />;
  }

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
        {/* Add your dashboard or homepage content here */}
      </div>
    </>
  );
}
