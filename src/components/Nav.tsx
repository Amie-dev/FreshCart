"use client";

import {
  LogOut,
  Search,
  SearchIcon,
  ShoppingBag,
  ShoppingCartIcon,
} from "lucide-react";
import mongoose from "mongoose";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "./Profile";

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
  const [searchMenu, setSearchMenu] = useState(false);
  const [menuProfile, setMenuProfile] = useState(false);
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

      {/* Desktop Search Bar */}
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
        {/* Mobile Search Toggle */}
        <div
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-110 transition md:hidden"
          onClick={() => setSearchMenu(!searchMenu)}
        >
          <SearchIcon className="text-green-500 w-6 h-6" />
        </div>

        {/* Cart */}
        <Link
          href={"/cart"}
          aria-label="Cart"
          className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-110 transition"
        >
          <ShoppingCartIcon className="text-green-600 w-6 h-6" />
          <span className="absolute -top-1 -right-1 text-[16px] font-bold text-white bg-red-500 w-5 h-5 flex items-center justify-center text-center rounded-full px-1.5">
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
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white font-bold text-2xl shadow-md cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 transition-all overflow-hidden  ease-in-out">
                <div
                  className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setMenuProfile(!menuProfile);
                    setMenuOpen(false);
                  }}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full shadow-md"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white font-bold text-2xl shadow-md ">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>

                <Link
                  href="/myorder"
                  className="px-4 py-2 text-gray-700 flex gap-1 hover:scale-105 hover:bg-gray-100 "
                >
                  <ShoppingBag className="text-green-700" />
                  <span>My Orders</span>
                </Link>
                <button
                  className="flex w-full text-left px-4 hover:scale-105 py-2  text-gray-700 hover:bg-gray-100 cursor-pointer items-center  gap-1"
                  onClick={async () => {
                    await signOut({ callbackUrl: "/login" });
                  }}
                >
                  <LogOut className="text-red-600" />
                  <span >Log Out</span>
                </button>
              </div>
            )}

            {/* Profile Modal */}
            {menuProfile && (
              <Profile user={user} onClose={() => setMenuProfile(false)} />
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

        {/* Mobile Search Bar */}
        {searchMenu && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm md:hidden">
            <div className="mt-5 w-[90%] px-4">
              <form className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full">
                <Search className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search groceries..."
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setSearchMenu(false)}
                  className="ml-2 text-gray-500 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
