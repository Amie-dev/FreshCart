"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();
  const { data: session } = useSession(); // ✅ get session

  const isAuthenticated = !!session;

  return (
    <div className="top-0">
      <div className="flex items-center justify-center gap-10">
        <button
          className={`px-6 py-1 rounded cursor-pointer ${
            isAuthenticated
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-300 hover:bg-green-700"
          }`}
          disabled={isAuthenticated} // ✅ disable if logged in
          onClick={() => {
            if (!isAuthenticated) router.push("/login");
          }}
        >
          LogIn
        </button>

        <button
          className={`px-6 py-1 rounded cursor-pointer ${
            isAuthenticated
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-300 hover:bg-green-700"
          }`}
          disabled={isAuthenticated} // ✅ disable if logged in
          onClick={() => {
            if (!isAuthenticated) router.push("/register");
          }}
        >
          Register
        </button>

        <button
          className={`px-6 py-1 rounded cursor-pointer ${
            !isAuthenticated
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-300 hover:bg-green-700"
          }`}
          disabled={!isAuthenticated}
          onClick={async () => {
            await signOut({ callbackUrl: "/login" });
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Header;
