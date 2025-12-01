"use client";

import { Search, ShoppingCartIcon } from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserRole = "user" | "deliveryBoy" | "admin";
type UserProvider = "credentials" | "google";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  mobile?: string;
  role: UserRole;
  provider: UserProvider;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

function Nav({ user }: { user?: IUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const isAuthenticated = !!session;

  return (
    <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl shadow-lg flex justify-between items-center h-20 px-4 md:px-8 z-50">
      
      {/* Logo */}
      <Link
        href={"/"}
        className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
      >
        FreshCart
      </Link>

      {/* Search Bar */}
      <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-full max-w-lg shadow-md">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search groceries..."
          className="w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-3 md:gap-6 relative">
        {/* Cart */}
        <Link
          href={"/cart"}
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-110 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-red-500 rounded-full px-1.5">
            0
          </span>
        </Link>

        {/* User */}
        {isAuthenticated && user ? (
          <div className="relative">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full shadow-md hover:scale-110 transition cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            ) : (
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white font-bold text-2xl shadow-md cursor-pointer text-center"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={async () => {
                    await signOut({ callbackUrl: "/login" });
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-white px-4 py-2 rounded-full shadow-md text-green-700 font-semibold hover:bg-green-100 transition"
            onClick={() => router.push("/login")}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
