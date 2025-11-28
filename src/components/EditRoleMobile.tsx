"use client";

import { ArrowRight, Bike, User, UserCog } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditRoleMobile() {
  const [mobile, setMobile] = useState("");
  const roles = [
    { id: "admin", label: "Admin", icon: UserCog },
    { id: "user", label: "User", icon: User },
    { id: "deliveryBoy", label: "Delivery Boy", icon: Bike },
  ];
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!mobile) {
      toast.error("Please enter your mobile number");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole, mobile }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Updated successfully!");
        router.push("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-4xl text-green-600 font-bold mb-5">Select your role</h2>

      {/* Role cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <motion.div
              key={role.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col items-center justify-center w-[160px] h-[160px] border rounded cursor-pointer transition ${
                isSelected
                  ? "bg-green-100 border-green-600 shadow-lg"
                  : "bg-gray-100 border-gray-300 hover:border-green-400"
              }`}
            >
              <Icon size={48} />
              <span className="mt-3 text-lg font-medium">{role.label}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile input */}
      <p className="mt-10 mb-2 text-lg">Enter your mobile number</p>
      <input
        type="text"
        placeholder="eg: 9876543210"
        value={mobile}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ""); // remove non-digits
          if (value.length <= 10) setMobile(value);
        }}
        className="border p-2 rounded mb-6 w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Submit button */}
      <button
      disabled={mobile.length!==10 || !selectedRole}
        onClick={handleSubmit}
        className={
          `
          ${
            selectedRole && mobile.length==10 ?"bg-green-400 hover:bg-green-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition":"bg-gray-400 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
          }
          `
        }
      >
        Go To Home <ArrowRight />
      </button>
    </div>
  );
}

export default EditRoleMobile;
