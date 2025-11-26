"use client"

import { ArrowLeft, EyeIcon, EyeOff, Leaf, Lock, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { toast } from 'react-toastify'



function Login() {
  const router = useRouter();
  // const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false); // NEW

  const formValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;

    try {
      console.log(email,password)
      // Call NextAuth signIn with "credentials" provider
      const result = await signIn("credentials", {
         identifier: email,// Pass email/username
        password, // Pass password
        redirect: false, // Disable automatic redirect (we handle navigation manually)
      });
    
      if (result?.ok) {
        router.push("/"); // Redirect to homepage
        console.log(result); // Debug: log result object
        toast.success("Login successful!"); // Show success toast
      } else {
        console.log(result?.error);
        toast.error(result?.error || "Login failed"); // Show error toast
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.error || "Registration failed. Please try again.");
      } else {
        console.error("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-6 py-10 relative">
      {/* Back button */}
      <div
        className="absolute top-6 left-6 flex items-center gap-2 text-green-500 hover:text-green-700 transition-colors cursor-pointer"
        
      >
        <ArrowLeft className="w-5 h-5" /><span>Back</span>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
       WellCome Back !
      </motion.h1>

      <p className="text-gray-600 mb-8 flex items-center">
        Use FreshCart Now <Leaf className="w-5 h-5 text-green-500 ml-2" />
      </p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        

        {/* Email */}
        <motion.div

        initial={{
opacity:0,
x:40
        }}

        animate={{
opacity:1,
x:0
        }}

        transition={{
duration:1
        }}
        
        className="relative">
          <Mail className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            placeholder="Your Email"
            className="pl-10 py-2 w-full border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </motion.div>

        {/* Password */}
        <motion.div
        
        initial={{
opacity:0,
x:-40
        }}

        animate={{
opacity:1,
x:0
        }}

        transition={{
duration:1
        }}

        className="relative flex items-center">
          <Lock className="absolute left-3 top-3 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            className="pl-10 py-2 w-full border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeIcon
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(true)}
            />
          )}
        </motion.div>

        {/* Submit */}
        <motion.button

initial={{
opacity:0,
y:-10
        }}

        animate={{
opacity:1,
y:0
        }}

        transition={{
duration:1
        }}

          type="submit"
          disabled={!formValid}
          className={`py-2 rounded font-semibold transition-colors 
            ${formValid ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          LogIn
        </motion.button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className=" text-green-700 hover:underline cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </motion.form>

      {/* Divider */}
      <div className="flex items-center my-6 w-full max-w-sm">
        <hr className="flex-grow border-amber-100" />
        <span className="px-2 text-sm  text-green-700">OR</span>
        <hr className="flex-grow border-amber-100" />
      </div>

      {/* Google Sign-in */}
      <motion.button
      initial={{
        opacity:0,
        scale:0.5,
      }}

      animate={{
        opacity:1,
        scale:1
      }}

      transition={{
        duration:0.3,
        delay:0.5
      }}
        type="button"
        disabled={loadingGoogle} // disable when loading
        onClick={async () => {
          setLoadingGoogle(true);
          await signIn("google", { callbackUrl: "/" ,redirect: false});
          setLoadingGoogle(false); // optional, if you want to re-enable after redirect
        }}
        className={`w-full max-w-sm flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-700 font-medium transition-colors
          ${loadingGoogle ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900 hover:bg-gray-100"}
        `}
      >
        <FcGoogle className="text-xl" />
        <span>{loadingGoogle ? "Signing in..." : "Sign up with Google"}</span>
      </motion.button>
    </div>
  )
}

export default Login
